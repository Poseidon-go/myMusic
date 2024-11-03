import { GetAudioElement, GetInputRangeElement } from "../selector";
import { handleEndTime, handleStartTime } from "../utils/timeUltils";

export default function updateCurrentTime() {
    let rangeElement = GetInputRangeElement();
    if (!rangeElement) return;
    const audioElement = GetAudioElement();
    if (!audioElement) return;



    audioElement.addEventListener("timeupdate", () => {
        const songLength = Math.floor(audioElement.duration);
        const currentTime = Math.floor(audioElement.currentTime);
        let currentRange = Math.floor((100 * currentTime) / songLength);

        handleEndTime(songLength);
        handleStartTime(currentTime)


        rangeElement.value = currentRange;
        rangeElement.style.background = `linear-gradient(to right, #fff ${currentRange}%, #6e6e6e ${currentRange}%)`
    })

}