
export function setCurrentSongIndex(index) {
    localStorage.setItem("currentSongIndex", index);
}

export function getCurrentSongIndex() {
    let currentSongIndex = Number(localStorage.getItem("currentSongIndex"))

    return currentSongIndex;
}



