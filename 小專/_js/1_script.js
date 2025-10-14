// --------
// Login
// --------

function login(username) {
    localStorage.setItem('user', JSON.stringify({ name: username, token: 'fake-' + Date.now() }));
}

// 回傳布林值
function isLogin() {
    return !!localStorage.getItem('user');
}

function getUsername() {
    const u = localStorage.getItem('user');
    return u ? JSON.parse(u).name : '';
}

function logout() {
    localStorage.removeItem('user');
    localStorage.removeItem('cart');
    localStorage.removeItem('favorites');
}

// 綁定登入按鈕事件

// 驗證用
const btnLogin = document.getElementById("btnLogIn");
// 綁定
if (btnLogin) {
    $('#btnLogIn').on('click', function () {
        // 抓username
        // trim -> 去除字串前後空白
        const username = document.getElementById('username').value.trim();
        if (username) {
            login(username);
            alert('登入成功!');
            window.location.href = '小專主頁.html';
        }
        else {
            alert('請輸入帳號');
        }
    })
}

// 顯示登入狀態
// function updateNavLogin() {
//     const btnLogin = document.getElementById('btnLogin');
//     if (isLogin()) {
//         btnLogin.textContent = '登出';
//         btnLogin.href = '#';
//         btnLogin.onclick = () => {
//             logout();            // 清除 localStorage
//             updateNavLogin();    // 立即更新導覽列文字
//             alert('已登出');
//         };

// document.getElementById('btnLogin').remove();
// // loginArea.innerHTML += `<button id="btnLogout">登出</button>`;
// const loginArea = document.getElementById('loginArea');
// loginArea.appendChild(btnLogout);
// const btnLogout = document.getElementById("btnLogout");
// btnLogout.onclick = () => {
//     logout();
//     window.location.href = '小專主頁.html';
// }   
//     }

//     else {
//         btnLogin.textContent = '登入';
//         btnLogin.href = '1_登入頁.html';
//         btnLogin.onclick = null;
//     }
// }
// updateNavLogin();


function updateNavLogin() {
    if (isLogin()) {
        btnLogin.textContent = '登出';
        btnLogin.href = '#';
        btnLogin.onclick = (e) => {
            // e.preventDefault();
            logout();
            updateNavLogin();
            alert('已登出');
        };
    } else {
        btnLogin.textContent = '登入';
        btnLogin.href = '1_登入頁.html';
        btnLogin.onclick = null;
    }
}

updateNavLogin();
// if(isLogin()){
//     const btnLogin = document.getElementById('btnLogIn');
//     if(btnLogin) btnLogin.remove();

//     const loginArea = document.getElementById('loginArea');
//     const btnLogout = document.createElement('button');
//     btnLogout.id = 'btnLogout';
//     btnLogout.textContent = '登出';
//     btnLogout.onclick = () => {
//         logout();
//         window.location.href = '小專主頁.html';
//     };
//     loginArea.appendChild(btnLogout);
// }


// --------------
// 購物車
// --------------
function loadCart() {
    return JSON.parse(localStorage.getItem('cart') || '');
}

function saveCart(cart) {
    localStorage.setItem('cart', JSON.stringify(cart));
}

function addToCart(item) {
    if (!islogin()) {
        alert("請先登入!");
        return;
    }
    const cart = loadCart();
    const found = cart.find(function (i) {
        return i.id === item.id;
    });

    if (found) {
        found.qty += 1;
    }
    else cart.push({ ...item, qty: 1 });
    saveCart(cart);
    alert("已加入購物車");
    // 箭頭函式寫法 -> cart.find(i => i.id === item.id)
}


// ------------
// 最愛
// ------------
function loadFav() {
    return JSON.parse(localStorage.getItem('fav'));
}

function saveFav(favs) {
    localStorage.setItem('fav', JSON.stringify(fav));
}

// 回傳布林值
function isFav(item) {
    const fav = loadFav();
    return fav.some(function (i) {
        return i.id === item.id;
    })
}

function toggleFav(item) {
    if (!isLogin) {
        alert("請先登入!");
        return;
    }

    let fav = loadFav(); // 陣列
    const index = fav.findIndex(i => i.id === item.id); // true -> index, false -> -1
    if (index === -1) {
        fav.push(item);
        alert(item.name + '加入最愛');
    }
    else {
        fav.splice(index, 1);
        alert(item.name + '從最愛移除');
    }
    saveFav();
}


// 商品頁初始化
// ---------------

const btnAddCart = document.getElementById('btnAddCart');
const btnFav = document.getElementById('btnFav');

// 商品資料
const product = {
    id: 'p001',
    name: 'Twista火棍',
    price: 1200
}

// 輸入商品頁資訊
const productName = document.getElementById('productName');
const productPrice = document.getElementById('productPrice');

if (productName) {
    productName.textContent = product.name;
}
if (productPrice) {
    productPrice.textContent = '價格:' + product.priceㄤ
}

// 綁定購物車按鈕
if (btnAddCart) {
    btnAddCart.addEventListener('click', () => addToCart(product));
}

// 最愛按鈕樣式切換
if (btnFav) {
    function updateFavBtn() {
        if (isFavorited(product)) {
            btnFav.classList.add('fav');
            btnFav.textContent = '❤已收藏'
        }
        else {
            btnFav.classList.remove('fav');
            btnFav.textContent = '加入最愛';
        }
    }

    updateFavBtn(); // 頁面一開始就執行，確保一開始就顯示正確的

    // 綁定最愛按鈕事件
    btnFav.addEventListener('click', () => {
        toggleFav(product);
        updateFavBtn();
    })
}