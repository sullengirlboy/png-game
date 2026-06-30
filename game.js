var clothesMenuHTML = document.getElementById("clothesMenu");
var outfitAreaHTML = document.getElementById("outfitArea");

var shirtsMenuHTML = document.getElementById("shirtsMenu");
var pantsMenuHTML = document.getElementById("pantsMenu");
var shirtsBtn = document.getElementById("shirtsBtn");
var pantsBtn = document.getElementById("pantsBtn");

var clothesOptions = {
    shirts: [],
    pants: []
};
var listMapping = ["shirts", "pants"];

shirtsBtn.addEventListener("click", () => showSection("shirtsMenu"));
pantsBtn.addEventListener("click", () => showSection("pantsMenu"));

populateClothes();

async function populateClothes() {
    for (var i = 0; i < listMapping.length; i++) {
        let currentListName = listMapping[i];
        var targetList = clothesOptions[currentListName];

        await fetchData(currentListName, targetList);
        targetList.forEach(item => {
            var itemHTML = document.createElement("img");
            itemHTML.src = "/img/" + currentListName + "/" + item.filePath + ".png";
            itemHTML.addEventListener("click", () => addItem(item, currentListName));
            var itemSectionHTML = document.getElementById(currentListName + "Menu")
            itemSectionHTML.appendChild(itemHTML);
        })
    }
}

async function fetchData(fileName, destinationArray) {
    return fetch(fileName + ".json")
    .then(response => response.json())
    .then(jsonData => {
        jsonData.forEach(singleItem => {
            destinationArray.push(singleItem);
        });
        console.log(`loaded ${fileName}:`, destinationArray);
    })
    .catch(error => console.error(`error loading ${fileName}.json:`, error));
}

function showSection(chosenSection) {
    var element = document.getElementById(chosenSection);
    var allSections = Array.from(clothesMenuHTML.children);
    allSections.shift();

    allSections.forEach(section => {
        section.style.opacity = "0";
        section.style.visibility = "hidden";
        section.style.pointerEvents = "none";
        
        setTimeout(() => {
            if (section.style.opacity === "0") {
                section.style.display = "none";
            }
        }, 300);
    });

    element.style.display = 'flex';
    setTimeout(() => {
        element.style.opacity = "1";
        element.style.visibility = "visible";
        element.style.pointerEvents = "auto";
    }, 10);
}

function addItem(item, currentListName) {
    console.log("item was clicked:", item.name);
    var itemHTML = document.createElement("img")
    itemHTML.src = "/img/" + currentListName + "/" + item.filePath + ".png";
    // itemHTML.addEventListener("click", () => addItem(item));
    outfitAreaHTML.appendChild(itemHTML);
}