import { getAvatarPlay, getNameSingle, getNameSong } from "../selector";

export default function updateStatusCurrentSong(music) {
    const avatarPlayer = getAvatarPlay();
    const nameSong = getNameSong();
    const nameSingle = getNameSingle();

    avatarPlayer.src = music.img;
    nameSong.innerHTML = music.nameSong;
    nameSingle.innerHTML = music.single;
}
