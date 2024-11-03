import { GetAudioElement, getBtnPlay, getNextElement, getPrevElement, getRepeatElement, getShuffleElement } from "../selector";
import updateStatusCurrentSong from "../utils/updateUserplayer";

function initializeControls() {
    const audioElement = GetAudioElement();
    if (!audioElement) return;

    const togglePlayPauseElement = getBtnPlay();
    if (!togglePlayPauseElement) return;

    const nextElement = getNextElement();
    if (!nextElement) return;

    const prevElement = getPrevElement();
    if (!prevElement) return;

    const repeatElement = getRepeatElement();
    if (!repeatElement) return;

    const toggleRandomElement = getShuffleElement();
    if (!toggleRandomElement) return;

    return { audioElement, togglePlayPauseElement, nextElement, prevElement, repeatElement, toggleRandomElement };
}

export function togglePlayAudio() {
    const { togglePlayPauseElement, audioElement } = initializeControls();

    togglePlayPauseElement.addEventListener("click", () => {
        if (audioElement.paused) {
            audioElement.play();
        } else {
            audioElement.pause();
        }
    })
}

export function toggleRepeat() {
    const { repeatElement, audioElement } = initializeControls();

    let isRepeat = false;

    function handleRepeat() {
        isRepeat = !isRepeat;

        repeatElement.style.color = isRepeat ? `var(--activeColor)` : `var(--colorText)`;

        audioElement.loop = isRepeat ? true : false;
    }

    repeatElement.addEventListener("click", handleRepeat)
}

export function togglePrevNext(musicList, currentSongIndex) {
    const { audioElement, nextElement, prevElement } = initializeControls();

    nextElement.addEventListener("click", () => {
        if (currentSongIndex < musicList.length - 1) {
            currentSongIndex += 1;
            audioElement.src = musicList[currentSongIndex].path;

            updateStatusCurrentSong(musicList[currentSongIndex]);

            // bật lại bài hát khi click vào nút chuyển bài hát 
            audioElement.play();
        } else return;
    })

    prevElement.addEventListener("click", () => {
        if (currentSongIndex > 0) {
            currentSongIndex -= 1;
            audioElement.src = musicList[currentSongIndex].path;

            updateStatusCurrentSong(musicList[currentSongIndex]);

            // bật lại bài hát khi click vào nút lùi bài hát 
            audioElement.play();
        } else return;
    })
}

export function toggleRandomMusic(musicListData) {
    const { toggleRandomElement, audioElement } = initializeControls();

    const songLength = musicListData.length;
    let isRandomSong = false;

    // Sự kiện khi nhấn vào nút toggleRandomElement
    toggleRandomElement.addEventListener("click", () => {
        isRandomSong = !isRandomSong;
        toggleRandomElement.style.color = isRandomSong ? `var(--activeColor)` : `var(--colorText)`;

        // Nếu chế độ random bật, thêm sự kiện 'ended' vào audioElement
        if (isRandomSong) {
            audioElement.addEventListener("ended", playRandomSong);
        } else {
            audioElement.removeEventListener("ended", playRandomSong);
        }
    });


    // Hàm phát bài hát ngẫu nhiên
    function playRandomSong() {
        let randomIndex = Math.floor(Math.random() * songLength);
        let randomSong = musicListData[randomIndex];

        audioElement.src = randomSong.path;  // Đường dẫn bài hát ngẫu nhiên
        updateStatusCurrentSong(randomSong); // Cập nhật trạng thái bài hát hiện tại
        audioElement.play();
    }
}
