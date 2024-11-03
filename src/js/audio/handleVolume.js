import { GetAudioElement, getVolumeElement } from "../selector";

export default function adjustVolume() {
    const audioElement = GetAudioElement();
    if (!audioElement) return;

    const volumeElement = getVolumeElement();
    if (!volumeElement) return;

    // volume default
    const volumeValueDefault = 20;
    audioElement.volume = 0.2;

    volumeElement.value = volumeValueDefault;
    volumeElement.style.background = `linear-gradient(to right, #fff ${volumeValueDefault}%, #6e6e6e ${volumeValueDefault}%)`

    volumeElement.addEventListener("input", () => {
        // tính toán giá trị âm thanh
        // 1 <=> 100
        // audio.volume <=> volume.value
        const valueVolume = volumeElement.value;
        const currentVolume = valueVolume / 100;
        audioElement.volume = currentVolume.toFixed(1);

        volumeElement.style.background = `linear-gradient(to right, #fff ${valueVolume}%, #6e6e6e ${valueVolume}%)`
    })
}