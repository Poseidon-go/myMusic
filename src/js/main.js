// import "dotenv/config.js";
import updateCurrentTime from "../js/audio/updateCurrentTime";
import initSearch from "../js/components/populars";
import { handleEventAudio } from "./audio/handleEventAudio";
import { togglePlayAudio, togglePrevNext, toggleRandomMusic, toggleRepeat } from "./audio/handleToggle";
import adjustVolume from "./audio/handleVolume";
import loadFirstSong from "./audio/loadFirstSong";
import renderCategoriesList from "./components/categories";
import musicList from "./data/data";
import showDarkMode from "./html/showDarkMode";
import showLoginUser from "./html/showLoginUser";
import showMenuMobile from "./html/showMenuMobile";
// main.js


// main
(() => {
    let musicListData = musicList;
    let currentSongIndex = 0;

    // const auths = auth;
    // console.log(auths);


    // load bài đầu tiên
    loadFirstSong(musicListData, currentSongIndex);

    // handleEvent
    handleEventAudio(musicListData);

    // handle toggle
    // bật tắt nhạc  
    togglePlayAudio();

    // lặp lại bài nhạc
    toggleRepeat();

    // ngẫu nhiên bài hát
    toggleRandomMusic(musicListData);

    // chuyển bài
    togglePrevNext(musicListData, currentSongIndex);

    // renderUI
    updateCurrentTime();
    initSearch(musicListData);
    renderCategoriesList();

    // html
    showDarkMode();
    showLoginUser();
    showMenuMobile();

    // điều chỉnh âm lượng
    adjustVolume();
})()





