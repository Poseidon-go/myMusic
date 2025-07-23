import { getBtnSetting } from "../selector";

export default function showDarkMode() {
    const settingsElement = getBtnSetting();
    if (!settingsElement) return;

    const moonIcon = document.getElementById('darkModeToggle');
    if (!moonIcon) return;


    const darkMode = document.getElementById("settings__dark-mode");
    if (!darkMode) return;


    let isSettting = false;
    let isDarkMode = false;

    settingsElement.addEventListener("click", () => {
        isSettting = !isSettting;
        darkMode.style.display = isSettting ? "flex" : "none";
    })


    moonIcon.addEventListener('click', function () {
        isDarkMode = !isDarkMode;

        isDarkMode ? moonIcon.classList.remove("bxs-moon") : moonIcon.classList.remove("bxs-sun");
        isDarkMode ? moonIcon.classList.add("bxs-sun") : moonIcon.classList.add("bxs-moon");
    });
}





