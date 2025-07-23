const categoriesList = [
    "all",
    "relax",
    "sad",
    "party",
    "romantic",
    "rap",
    "battles",
]

function renderCategorie(text) {
    const divElement = document.createElement("div");
    divElement.className = "box";
    divElement.dataset.category = text;
    divElement.innerHTML = `<span class="text">${text.toUpperCase()}</span>`

    return divElement;
}

function renderCategoriesList() {
    const categorieListElment = document.getElementById("categories-list");
    if (!categorieListElment) return;


    categoriesList.forEach(categories => {
        const categorieElement = renderCategorie(categories);

        categorieListElment.appendChild(categorieElement);
    })
}

export default renderCategoriesList;