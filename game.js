var clothesMenuHTML = document.getElementById("clothesMenu");

var clothesOptions = {
    shirts: []
};
var listMapping = ["shirts"];

populateClothes();

async function populateClothes() {
    for (var i = 0; i < listMapping.length; i++) {
        var currentListName = listMapping[i];
        var targetList = clothesOptions[currentListName];

        await fetchData(currentListName, targetList);
        targetList.forEach(item => {
            var itemHTML = document.createElement("img");
            itemHTML.src = "/img/" + currentListName + "/" + item.filePath + ".png";
            itemHTML.addEventListener("click", function(){
                console.log("item was clicked:", item.name);
            })
            clothesMenuHTML.appendChild(itemHTML);
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