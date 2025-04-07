async function Get(yourUrl) {
    var Httpreq = new XMLHttpRequest(); // a new request
    Httpreq.open("GET", yourUrl, false);
    Httpreq.send(null);
    return Httpreq.responseText;
}

async function test() {
    Get('https://maddie480.ovh/celeste/custom-entity-catalog.json').then(
        (value) => {
            main(json_obj = JSON.parse(value))
        }
    );
}
function main(json) {
    var mods = json.modInfo;
    var modsClean = [];
    elements = [];
    document.getElementById("result").innerHTML = "";
    for (i = 0; i < mods.length; i++) {
        if (mods[i].categoryName != 'Map') {
            var entities = Object.entries(mods[i].entityList)
            for (j = 0; j < entities.length; j++) {
                elements.push(entities[j]);
                document.getElementById("result").innerHTML += "<p>" + entities[j][0] + "</p>"
            }
            modsClean.push(mods[i])
        }
    }
}