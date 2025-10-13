// --------
// Login
// --------

function login(username) {
    localStorage.setItem('user', JSON.stringify({ name: username, token: 'fake-' + Date.now() }));
}

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
            e.preventDefault();
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