export function updateUiButtonPauser(togglePlayPauseElement, avatarPlayElement) {
    if (!togglePlayPauseElement || !avatarPlayElement) {
        console.error("togglePlayPauseElement or avatarPlayElement is null");
        return;
    }


    togglePlayPauseElement.classList.remove("bx-pause");
    togglePlayPauseElement.classList.add("bx-play");

    avatarPlayElement.classList.remove("rotateAvatar");
}

export function updateUIButtonPlayer(togglePlayPauseElement, avatarPlayElement) {
    if (!togglePlayPauseElement || !avatarPlayElement) {
        console.error("togglePlayPauseElement or avatarPlayElement is null");
        return;
    }

    togglePlayPauseElement.classList.remove("bx-play");
    togglePlayPauseElement.classList.add("bx-pause");

    avatarPlayElement.classList.add("rotateAvatar");

}