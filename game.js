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

var newX = 0, newY = 0, startX = 0, startY = 0;

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
    var itemHTML = document.createElement("img");
    itemHTML.src = "/img/" + currentListName + "/" + item.filePath + ".png";
    itemHTML.setAttribute("class", "outfitItem");
    itemHTML.addEventListener("mousedown", mouseDown);
    outfitAreaHTML.appendChild(itemHTML);
}

function mouseDown(e) {
    e.preventDefault();
    var itemHTML = e.currentTarget;
    startX = e.clientX;
    startY = e.clientY;

    function mouseMove(e) {
        newX = startX - e.clientX;
        newY = startY - e.clientY;

        startX = e.clientX;
        startY = e.clientY;

        itemHTML.style.top = (itemHTML.offsetTop - newY) + "px";
        itemHTML.style.left = (itemHTML.offsetLeft - newX) + "px";
    }

    function mouseUp(e, itemHTML) {
        document.removeEventListener('mousemove', mouseMove);
        document.removeEventListener('mousemove', mouseUp);
    }

    document.addEventListener('mousemove', mouseMove);
    document.addEventListener('mouseup', mouseUp);
}