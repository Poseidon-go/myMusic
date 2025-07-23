// import "dotenv/config.js";
import updateCurrentTime from "../js/audio/updateCurrentTime";
import { popularUI } from "../js/components/populars";
import handleRoutingsPages from "../router/router";
import { handleEventAudio } from "./audio/handleEventAudio";
import { togglePlayAudio, togglePrevNext, toggleRandomMusic, toggleRepeat } from "./audio/handleToggle";
import adjustVolume from "./audio/handleVolume";
import loadFirstSong from "./audio/loadFirstSong";
import renderCategoriesList from "./components/categories";
import musicList from "./data/data";
import showDarkMode from "./html/showDarkMode";
import showLoginUser from "./html/showLoginUser";
import showMenuMobile from "./html/showMenuMobile";
import { getCurrentSongIndex, setCurrentSongIndex } from "./state/state";
import updateLikes from "./utils/updateLikes";
// main.js

let currentSongIndex = getCurrentSongIndex("index") || 0;

// main
(() => {

    let musicListData = musicList;

    // router
    handleRoutingsPages();

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
    renderCategoriesList();
    updateLikes(musicListData, currentSongIndex);
    // showPopularList
    popularUI(musicListData);

    // html
    showDarkMode();
    showLoginUser();
    showMenuMobile();

    // điều chỉnh âm lượng
    adjustVolume();
})()





