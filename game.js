var list = [];

fetch("data.json")
    .then(response => response.json())
    .then(jsonData => jsonData.forEach(item => list.push(item)))

console.log(list);