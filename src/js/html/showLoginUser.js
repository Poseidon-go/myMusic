export default function showLoginUser() {
    const loginE = document.querySelector("#user_avatar img");
    if (!loginE) return;
    const btnLoginE = document.querySelector("#user_avatar-login")
    if (!btnLoginE) return;

    let isLogin = false;

    loginE.addEventListener("click", () => {
        isLogin = !isLogin;


        btnLoginE.style.display = isLogin ? "flex" : "none";
    })
}