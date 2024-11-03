import { GetAudioElement, getAvatarPlay, getBtnPlay, GetInputRangeElement } from "../selector";
import { handleEndTime } from "../utils/timeUltils";
import { updateUiButtonPauser, updateUIButtonPlayer } from "../utils/updateUiButton";

export function handleEventAudio(musicListData) {
    let rangeElement = GetInputRangeElement();
    if (!rangeElement) return;

    const audioElement = GetAudioElement();
    if (!audioElement) return;

    const togglePlayPauseElement = getBtnPlay();
    if (!togglePlayPauseElement) return;

    const avatarPlayElement = getAvatarPlay();
    if (!avatarPlayElement) return;

    // sự kiện kích hoạt khi đang chơi nhạc

    audioElement.addEventListener("play", () => {
        updateUIButtonPlayer(togglePlayPauseElement, avatarPlayElement);
    })

    // sự kiện kích hoạt khi bài nhạc đã kết thúc hoặc tạm dừng

    audioElement.addEventListener("pause", () => {
        updateUiButtonPauser(togglePlayPauseElement, avatarPlayElement);
    })


    // sự kiện kích hoạt khi bài nhạc đã kết thúc, trở về trạng thái ban đầu của bài hát 

    audioElement.addEventListener("ended", () => {
        audioElement.currentTime = 0;

        updateUiButtonPauser(togglePlayPauseElement, avatarPlayElement);
    })

    // truy cập để lấy các thuộc tính khi chưa phát bài hát
    audioElement.addEventListener("loadedmetadata", () => {
        const endTime = Math.floor(audioElement.duration);
        rangeElement.value = 0;
        audioElement.currentTime = 200;

        handleEndTime(endTime)
    })
}


