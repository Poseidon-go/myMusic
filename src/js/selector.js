// export control Element
export function GetAudioElement() {
    return document.getElementById("playMusic");
}
export function GetInputRangeElement() {
    return document.getElementById("myRange");
}

export function getRepeatElement() {
    return document.getElementById("repeat");
}

export function getShuffleElement() {
    return document.getElementById("shuffle");
}

export function getNextElement() {
    return document.getElementById("next")
}
export function getPrevElement() {
    return document.getElementById("prev")
}

export function getVolumeElement() {
    return document.getElementById("setVolume");
}


// export component
export function getBtnPlay() {
    return document.querySelector(".bx-play");
}

export function getAvatarPlay() {
    return document.querySelector("#Music-control__info img");
}

export function getNameSingle() {
    return document.querySelector("#Music-control__info-single .single")
}
export function getNameSong() {
    return document.querySelector("#Music-control__info-single .song")
}

export function getSearch() {
    return document.getElementById("searchMain");
}

export function getBtnSearch() {
    return document.getElementById("btnSearch");
}

export function getBtnSetting() {
    return document.getElementById("darkMode");
}