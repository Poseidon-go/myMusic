export default function showMenuMobile() {
    const btnMenuE = document.querySelector("#Music-player__navbar-menu i");
    if (!btnMenuE) return;

    const menuMoblieE = document.querySelector(".Music-player__navbar-menu-mobile");
    if (!menuMoblieE) return;

    let isShowMenu = false;

    btnMenuE.addEventListener("click", () => {
        isShowMenu = !isShowMenu;
        menuMoblieE.style.display = isShowMenu ? "block" : "none";
    })
}