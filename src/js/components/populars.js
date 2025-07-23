import { getSearch } from "../selector";

const BACKGROUNDCOLOR_LIST_RANDOM = [
  "#1abc9c", "#2ecc71", "#3498db", "#9b59b6",
  "#f1c40f", "#e67e22", "#e74c3c", "#95a5a6"
];

function popularUI(musicListData) {
  if (!Array.isArray(musicListData) || musicListData.length === 0) {
    console.warn("Không phải mảng hoặc mảng rỗng:", musicListData);
    return;
  }

  const popularListElement = document.getElementById("popular-list");
  if (!popularListElement) return;

  const searchElement = getSearch();
  if (!searchElement) return;

  function createPopularItem(music) {
    const divElement = document.createElement("div");
    const index = Math.floor(Math.random() * BACKGROUNDCOLOR_LIST_RANDOM.length);
    divElement.id = "popular-list__item";
    divElement.innerHTML = `
      <img src="${music.img}" alt="" width="100%" height="100%">
      <div id="popular-list__item-single">
        <span>${music.nameSong}</span>
        <span>${music.single}</span>
      </div>
    `;
    divElement.style.backgroundColor = BACKGROUNDCOLOR_LIST_RANDOM[index];
    return divElement;
  }

  // Hiển thị toàn bộ danh sách
  function renderPopularList(list) {
    popularListElement.innerHTML = "";
    list.forEach(music => {
      const item = createPopularItem(music);
      popularListElement.appendChild(item);
    });
  }

  renderPopularList(musicListData);

  // Xử lý tìm kiếm
  function initSearch() {
    searchElement.addEventListener("input", () => {
      const keyword = searchElement.value.toLowerCase();
      const filteredList = musicListData.filter(music =>
        music.nameSong.toLowerCase().includes(keyword) ||
        music.single.toLowerCase().includes(keyword)
      );
      console.log(filteredList)
      renderPopularList(filteredList);
    });
  }

  initSearch();

  // lọc từng bài hát
  const allBoxes = document.querySelectorAll('[data-category]');
  allBoxes.forEach(boxes => {
    boxes.addEventListener("click", () => {
      if (boxes.dataset.category === "all") {
        renderPopularList(musicListData);
      } else {
        musicListData.forEach(music => {
          const filtered = musicListData.filter(music => music.category === boxes.dataset.category);
          renderPopularList(filtered);
        })
      }
    })
  })
}

export { popularUI };
