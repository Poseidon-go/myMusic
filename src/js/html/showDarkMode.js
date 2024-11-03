import { getBtnSetting } from "../selector";

export default function showDarkMode() {
    const settingsElement = getBtnSetting();
    if (!settingsElement) return;

    const darkMode = document.getElementById("settings__dark-mode");
    if (!darkMode) return;


    let isSettting = false;

    settingsElement.addEventListener("click", () => {
        isSettting = !isSettting;
        darkMode.style.display = isSettting ? "flex" : "none";

    })
}





