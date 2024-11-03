import { GetAudioElement } from "../selector";
import updateStatusCurrentSong from "../utils/updateUserplayer";
function loadFirstSong(musicListData, currentSongIndex) {
    const audioElement = GetAudioElement();
    if (!audioElement) return;

    const music = musicListData[currentSongIndex];
    const song = musicListData[currentSongIndex].path;

    audioElement.src = song;
    updateStatusCurrentSong(music);
}

export default loadFirstSong;