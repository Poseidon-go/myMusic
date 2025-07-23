import { getCurrentSongIndex, setCurrentSongIndex } from "../state/state";

export default function updateLikes(musicListData, currentSongIndex) {
    const toggleHeart = document.getElementById("toggleHeart");
    if (!toggleHeart) return;

    let isToggleHeart = false;
    let likeCount = 0;

    if (likeCount < 0) return;

    function handleLikeIncrease() {
        toggleHeart.style.color = `var(--colorAvatar)`
        likeCount += 1;

        // cài đặt giá trị có thích bài hát hiện tại 
        localStorage.setItem("likeCount", likeCount)
    }


    function decreaseLikeCount() {
        toggleHeart.style.color = `var(--colorText)`;
        likeCount -= 1;

        // cài đặt giá trị không thích bài hát hiện tại 
        localStorage.setItem("likeCount", likeCount)
    }


    toggleHeart.addEventListener("click", () => {
        isToggleHeart = !isToggleHeart;

        isToggleHeart ? handleLikeIncrease() : decreaseLikeCount();

        const currentSong = musicListData[currentSongIndex];
    })
}