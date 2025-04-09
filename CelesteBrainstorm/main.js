function loadContent() {
    document.getElementById("result").innerHTML = "<h1>loading...</h1>"
    fetch('https://maddie480.ovh/celeste/custom-entity-catalog.json').then(
        (result) => result.json().then(
            (json) => main(json)
        )
    )
}
function shuffle(array) {
    let currentIndex = array.length;

    // While there remain elements to shuffle...
    while (currentIndex != 0) {

        // Pick a remaining element...
        let randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
    }
}

modsClean = [];
elements = [];
chosenElements = [];

function main(json) {
    var mods = json.modInfo;
    document.getElementById("result").innerHTML = "";
    for (var i = 0; i < mods.length; i++) {
        if (mods[i].categoryName != 'Map') {
            var entities = Object.entries(mods[i].entityList)
            for (var j = 0; j < entities.length; j++) {
                elements.push({
                    name: entities[j][0],
                    mod: mods[i].modName,
                    latestModVersion: mods[i].latestVersion,
                    modID: mods[i].itemid,
                    modItemType: mods[i].itemtype
                });
            }
            modsClean.push(mods[i])
        }
    }

    var startElement = document.getElementById("start")

    startElement.innerHTML = "<h2>Found " + elements.length + " entities from " + modsClean.length + " mods</h2>";
    startElement.innerHTML += "<label for=\"entityNum\">Number of entities to generate:</label><input type=\"number\" id=\"entityNum\" name=\"entityNum\" min=\"1\" max=\"" + elements.length + "\" value=\"5\"/>";
    startElement.innerHTML += "<div style=\"padding: 16px\"><button type=\"button\" onclick=\"generateNew()\">Generate</button></div>"
}

function generateNew() {
    var max = parseInt(document.getElementById("entityNum").value);
    shuffle(elements);
    chosenElements = elements.slice(0, max);
    displayEntities(chosenElements);
}

function displayEntities(entities) {

    document.getElementById("result").innerHTML = "";

    for (var i = 0; i < entities.length; i++) {
        var entity = entities[i];

        var name = entity.name.split(" / ");
        document.getElementById("result").innerHTML +=
            "<p>" + name[0] + " | " +
            "<a href=\"https://gamebanana.com/" + entity.modItemType.toLowerCase() + "s" + "/" + entity.modID + "\">" + entity.mod + " v" + entity.latestModVersion + "</a>" +
            " | <button type=\"button\" onclick=\"rerollElement(" + i + ")\">Reroll</button></p>";
    }
}

function rerollElement(id) {
    shuffle(elements);
    chosenElements[id] = elements[0];
    displayEntities(chosenElements);
}

loadContent();