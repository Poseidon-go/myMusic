import { getSearch } from "../selector";
const BACKGROUNDCOLOR_LIST_RANDOM = [
  "#1abc9c",
  "#2ecc71",
  "#3498db",
  "#9b59b6",
  "#f1c40f",
  "#e67e22",
  "#e74c3c",
  "#95a5a6"
];

function initSearch(musicListData) {
  const searchElement = getSearch();
  if (!searchElement) return; // Bỏ qua nếu không có searchElement

  searchElement.addEventListener("input", searchTerm);

  function searchTerm() {
    let valueSearch = searchElement.value.toLowerCase();
    let musicListDataSearched = musicListData.filter(music =>
      music.nameSong.toLowerCase().includes(valueSearch)
    );
    renderPopularsList(musicListDataSearched);
  }

  function popularItem2(music) {
    const divElement = document.createElement("div");
    const index = Math.floor(Math.random() * BACKGROUNDCOLOR_LIST_RANDOM.length);
    divElement.id = "popular-list__item";
    divElement.innerHTML = `
      <img src=${music.img} alt="" width="100%" height="100%">
      <div id="popular-list__item-single">
        <span>${music.nameSong}</span>
        <span>${music.single}</span>
      </div>
    `;
    divElement.style.backgroundColor = `${BACKGROUNDCOLOR_LIST_RANDOM[index]}`;
    return divElement;
  }

  function renderPopularsList(musicListData) {
    const popularListElement = document.getElementById("popular-list");
    if (!popularListElement) return;

    popularListElement.innerHTML = ""; // Xóa các phần tử cũ  

    musicListData.forEach(music => {
      const divElement = popularItem2(music);
      popularListElement.appendChild(divElement);
    });
  }
}

export default initSearch;
