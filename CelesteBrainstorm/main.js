function loadContent() {
    document.getElementById("result").innerHTML = "<h1>loading...</h1>"
    fetch('https://maddie480.ovh/celeste/custom-entity-catalog.json').then(
        (result) => result.json().then(
            (json) => main(json)
        )
    )
}
function main(json) {
    var mods = json.modInfo;
    var modsClean = [];
    elements = [];
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

    document.getElementById("result").innerHTML = "<h2>Found " + elements.length + " entities from " + modsClean.length + " mods</h2>";

    for (var i = 0; i < 10; i++) {
        var entity = elements[Math.floor(Math.random() * elements.length)]
        document.getElementById("result").innerHTML += "<p>" + entity.name + " | <a href=\"https://gamebanana.com/" + entity.modItemType.toLowerCase() + "s" + "/" + entity.modID + "\">" + entity.mod + " v" + entity.latestModVersion + "</a></p>";
    }
}

loadContent();