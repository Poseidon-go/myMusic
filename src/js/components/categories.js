const categoriesList = [
    "All",
    "Relax",
    "Sad",
    "Party",
    "Romantic",
    "Rap",
    "Battles",
]

function renderCategorie(text) {
    const divElement = document.createElement("div");
    divElement.className = "box";
    divElement.innerHTML = `<span class="text">${text}</span>`

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