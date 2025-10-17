// ------------
// login
// ------------

// 模擬帳號
const USER1 = {
    username: 'wrz',
    password: '12341234'
}

// 帳密正確 -> user存進localStorage裡面 -> 登入成功
function login(username, password) {
    if (username == USER1.username && password == USER1.password) {
        localStorage.setItem('user', JSON.stringify({ name: username, token: 'fake-' + Date.now() }))
        alert(username + "，歡迎!");
        window.location.href = './小專主頁.html';
    }
    else {
        alert("帳號或密碼錯誤");
    }
}

// 檢驗是否登入(localStorage是否有值)
// 回傳布林值
function isLogin() {
    return !!localStorage.getItem('user');
}

// 從localStorage取得user資料並回傳陣列(物件?)
// 若沒有 -> 回傳空字串
function getUsername() {
    const u = localStorage.getItem('user');
    return u ? JSON.parse(u).name : '';
}

// 登出 -> 刪除user, cart, fav
function logout() {
    localStorage.removeItem('user');
    localStorage.removeItem('cart');
    localStorage.removeItem('fav');
}

// 綁定登入按鈕(登入頁)
const btnLogin = document.getElementById("btnLogin");

if (btnLogin) {
    btnLogin.addEventListener('click', function () {
        // 抓input username中值，存進變數username
        // trim -> 去除字串前後空白 -> 最後沒用
        const username = document.getElementById('username').value;
        const pass = document.getElementById('pass').value;
        // 找到username -> 拿去login()存localStorage -> alert suc
        if (username) {
            login(username, pass);
        }
        else {
            alert("請輸入帳號");
        }
    })
}

// 顯示登入狀態
// 大難題，先跳過

// login 主頁
// Login 登入頁

function updateNavLogin() {
    const btnlogin = document.getElementById('btnlogin');
    if (isLogin()) {
        btnlogin.textContent = "登出";
        btnlogin.href = "./小專主頁.html";
        btnlogin.addEventListener('click', () => {
            logout();
            updateNavLogin();
            alert('已登出');
        });
    }
}
updateNavLogin();


//--------------
// 購物車
//--------------

// 讀取localStorage中cart內容，並回傳(陣列)
// 若沒有 -> 回傳空字串
function loadCart() {
    return JSON.parse(localStorage.getItem('cart')) || [];
}

// cart內容存進localStorage
function saveCart(cart) {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// 商品(item)加入購物車
// 驗證是否登入 -> 尋找該商品是否已在購物車 -> 是，qty+=1
//                                       -> 否，push且新增qty屬性
function addToCart(item) {
    if (!isLogin()) {
        alert("請先登入!");
        return;
    }
    const cart = loadCart();
    const selectOption = document.getElementById('productChoose').querySelector('.option.selected');
    const option = selectOption.textContent;
    const qtyInput = parseInt(document.getElementById('qtyInput').querySelector('#quantity').value);
    // 尋找該商品是否已在購物車
    // 回傳找到的物件
    // 若沒有 -> 回傳0
    const found = cart.find(i => i.id == item.id && i.option == option);
    // console.log(typeof(found));
    if (found) {
        found.qty += qtyInput;
    }
    else {
        cart.push({ ...item, option: option, qty: qtyInput });
    }
    // 新cart存回localStorage
    saveCart(cart);
    alert(`${product.name}  ${option}  ${qtyInput}件 已加入購物車`);
}

// 綁定加入購物車事件
const btnAddCart = document.getElementById('btnAddCart');
if (btnAddCart) {
    btnAddCart.addEventListener('click', () => addToCart(product));
    // console.log("111");
}

// ------------
// 我的最愛
// ------------

// 讀取localStorage中fav內容，並回傳(陣列)
// 若沒有 -> 回傳空字串
function loadFav() {
    return JSON.parse(localStorage.getItem('fav')) || [];
}

// fav內容存回localStorage
function saveFav(fav) {
    localStorage.setItem('fav', JSON.stringify(fav));
}

// 檢查item是否已在fav中
// 回傳布林值
function isFav(item) {
    const fav = loadFav();
    return fav.some(i => i.id == item.id);
}

// 商品(item)加入最愛
// 驗證是否登入 -> 尋找該商品是否已在最愛 -> 是，移除
//                                     -> 否，加入
function addToFav(item) {
    if (!isLogin()) {
        alert("請先登入");
        return;
    }

    const fav = loadFav();
    // 尋找是否有相同商品，若有 -> 將編號存入index
    // 若沒有 -> -1
    const index = fav.findIndex(i => i.id == item.id);
    if (index == -1) {
        fav.push(item);
        alert(item.name + '加入最愛');
    }
    else {
        fav.splice(index, 1);
        alert(item.name + '從最愛移除');
    }
    saveFav(fav);
}

// 商品頁資料填入
const productName = document.getElementById('productName');
const productPrice = document.getElementById('productPrice');
// const image = document.getElementById('image');

// 商品資料
// const product = {
//     id: 'p001',
//     name: 'Twista火棍',
//     price: 1200
// }

// productName, productPrice填入頁面顯示
if (productName) {
    productName.textContent = product.name;
}
if (productPrice) {
    productPrice.textContent = '$' + product.price;
}

// 更新收藏紐狀態]


// 最愛按鈕樣式切換
// 檢查按鈕存在，才執行
const btnAddFav = document.getElementById('btnAddFav');
if (btnAddFav) {

    function updateFavBtn() {
        if (isFav(product)) {
            btnAddFav.classList.add('fav');
            btnAddFav.textContent = '❤已收藏'
        }
        else {
            btnAddFav.classList.remove('fav');
            btnAddFav.textContent = '♡加入最愛';
        }
    }
    // 頁面一開始就執行，確保一開始就顯示正確的
    updateFavBtn();

    btnAddFav.addEventListener('click', () => {
        addToFav(product);
        updateFavBtn();
    });
}




document.querySelectorAll('.card').forEach(card => {
    const product = {
        id: card.dataset.id,
        name: card.dataset.name,
        price: card.dataset.price,
        img: card.dataset.img
    }

    const btnAddFav = card.querySelector('.btnAddFav');
    if (!btnAddFav) return;
    function updateFavBtn() {
        if (isFav(product)) {
            btnAddFav.classList.add('fav');
            btnAddFav.textContent = '❤已收藏'
        }
        else {
            btnAddFav.classList.remove('fav');
            btnAddFav.textContent = '♡加入最愛';
        }
    }
    updateFavBtn();

    btnAddFav.addEventListener('click', () => {
        addToFav(product);
        updateFavBtn();
    })
})