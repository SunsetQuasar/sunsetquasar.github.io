function loadContent() {
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
origJson = [];
entitymatch = "";
entityexclude = "";

function generateList(json) {

    var mods = json.modInfo;

    modsClean = [];
    elements = [];

    var onlyRegex = '^' + entitymatch.replaceAll('*', '.*') + '$',
    excludeRegex = '^' + entityexclude.replaceAll('*', '.*') + '$';

    for (var i = 0; i < mods.length; i++) {
        if (document.getElementById("includeMaps").checked || mods[i].categoryName != "Map") {
            var entities = Object.entries(mods[i].entityList)
            for (var j = 0; j < entities.length; j++) {

                var entityName = entities[j][0];

                if(entitymatch.length > 0) {
                    var result = (entityName.toLowerCase().match(onlyRegex.toLowerCase()));
                    if(result == null || result.length <= 0) continue;
                }
                
                if(entityexclude.length > 0) {
                    var result = (entityName.toLowerCase().match(excludeRegex.toLowerCase()));
                    if(result != null && result.length > 0) continue;
                }

                elements.push({
                    name: entityName,
                    mod: mods[i].modName,
                    latestModVersion: mods[i].latestVersion,
                    modID: mods[i].itemid,
                    modItemType: mods[i].itemtype
                });
            }

            if(document.getElementById("includeTriggers").checked) {
                var triggers = Object.entries(mods[i].triggerList)
                for (var j = 0; j < triggers.length; j++) {

                    var entityName = triggers[j][0].toLowerCase().endsWith("trigger") ? triggers[j][0] : triggers[j][0] + " Trigger";
                    if(entitymatch.length > 0) {
                        var result = (entityName.toLowerCase().match(onlyRegex.toLowerCase()));
                        if(result == null || result.length <= 0) continue;
                    }

                    if(entityexclude.length > 0) {
                        var result = (entityName.toLowerCase().match(excludeRegex.toLowerCase()));
                        if(result != null && result.length > 0) continue;
                    }

                    elements.push({
                        name: entityName,
                        mod: mods[i].modName,
                        latestModVersion: mods[i].latestVersion,
                        modID: mods[i].itemid,
                        modItemType: mods[i].itemtype
                    });
                }
            }
            modsClean.push(mods[i])
        }
    }

    var found = document.getElementById("wasfound");

    var input = document.getElementById("entityNum");

    input.max = elements.length;

    found.innerHTML = "Found " + elements.length + " entities from " + modsClean.length + " mods";
}

function makeHealthBar(num, percent, startlabel, endlabel) {
    startlabel = startlabel == null ? "" : startlabel;
    endlabel = endlabel == null ? "" : endlabel;

    var str = '<div class="healthbar">' + '<span class="healthbar-label">'+ startlabel +'</span>';

    percent /= num;

    for(var i = 0; i < num; i++) {
        var hue = (360 / num * 2) * i;
        var lum = i / num >= percent ? 0.25 : 1;
        str += '<div class="notch" style="background-color: oklch(from var(--button) calc(l * ' + lum + ') c calc(h + ' + hue +  '))"></div>';
    }

    str += '<span class="healthbar-label">'+ endlabel +'</span></div>';

    return str;
}

function main(json) {
    //document.getElementById("loading").style.display = "none";
    document.getElementById("loading").innerHTML = "<img style=\"height: 3rem; margin: 0.5rem;\" src=\"data/cosmicline.png\"></img><h1>CelesteBrainstorm <small style=\"font-weight: lighter; font-size: 10pt;\">by sunsetquasar</small></h1>";

    origJson = json;

    document.getElementById("start").parentElement.style.display = "unset";
    document.getElementById("result-container").style.display = "flex";

    document.querySelectorAll("input[type=checkbox]").forEach(element => {
        element.addEventListener("change", event => {
            generateList(origJson);
        })
    });
    
    document.getElementById("entityMatch").value = "";
    document.getElementById("entityMatch").addEventListener('input', element => {
        entitymatch = element.target.value;
        generateList(origJson);
    });

    document.getElementById("entityExclude").value = "";
    document.getElementById("entityExclude").addEventListener('input', element => {
        entityexclude = element.target.value;
        generateList(origJson);
    });

    generateList(json);

    //var startElement = document.getElementById("start")

    doTimestamps(json.lastUpdated);

    var elem = document.getElementById("start-container")
    elem.style.minWidth = (elem.getBoundingClientRect().width - 1 - 16) + "px";
    elem.style.width = (elem.getBoundingClientRect().width - 1 - 16) + "px";
    elem.style.maxWidth = (elem.getBoundingClientRect().width - 1 - 16) + "px";
}


const difficultyChoices = [
    ["Beginner", "Easy"],
    ["Intermediate", "Medium"],
    ["Advanced", "Hard"],
    ["Expert", "Master"],
    ["Grandmaster", "Demon"],
    ["GM+1", "Astral"],
],

difficultyAdjectives = [
    "Low",
    "Mid",
    "High",
    "Green",
    "Yellow",
    "Red",
    "Pink",
    "Purple",
    "Orange",
    "Black",
    "Teal",
    "Tricky",
    "Auspicious",
    '"I Told You So"',
    "Transparent",
    "Wide",
    "Thin",
    "Tall",
    "Confusing",
    "Jumping",
    "Cracked",
    "Shattered",
    "Plastic",
    "Glassy",
    "Sticky",
    "Slippery",
    "Tautological",
    "Ontological",
    "Blurry",
    "Loud",
    "Quiet",
    "Chill",
    "Chilly",
    "Hot",
    "Lukewarm",
    "Creaky",
    "Floaty",
    "Heavy",
    "Light",
    "Hairy",
    "Bald",
    "Crispy",
    "Soggy",
    "Boring",
    "Exciting",
    "Intangible",
    "Fragile",
    "Dangerous",
    "Yucky",
    "Delicious",
    "Savoury",
    "Sweet",
    "Bitter",
    "Spicy",
    "Sour",
    "Brown",
    "Soft",
    "Soapy",
    "Partial",
    "Insecure",
    "Private",
    "Radial",
    "Molten",
    "Gaseous",
    '"Are you going to finish eating that?"',
    "Little Guy",
    "High-Octane",
    "Female",
    "Male",
    "Non-Binary",
    "Heterosexual",
    "Gay",
    "Bisexual",
    "Pansexual",
    "Lesbian",
    "Transgender",
    "Gender Non-Conforming",
    "Madeline-Obliteraring",
    "French",
    "Polyamorous",
    "Neurodivergent",
    "Famous",
    "Itty-Bitty",
    "Understandable",
    "Mazing",
    "Underwhelming",
    "Weird",
    "Normal",
    "Flat",
    "Fizzy",
    "Painful",
    '"My Head Hurts"',
    "Toothy",
    "Fossilized",
    "Law-Abiding",
    "Criminal",
    "Juicy",
    '"Worth It"',
    "\"You Won't Believe It\"",
    "Believable",
    "Strange",
    "Charming",
    "Queer",
    "Ordinary",
    "Wooden",
    "Rusty",
    "Dirty",
    "Muddy",
    "Wet",
    "Charged",
    "Depleted",
    '"This Fucking Sucks"',
],

styleChoices = [
    "Horizontal",
    "Ascent",
    "Along a wall",
    "Descent",
    "Along a ceiling",
    "Diagonal",
    "Summit-like",
    "Hub",
    "Tower of rooms",
    "Isolated rooms",
    "Zig-zag",
    "Open World"
],

lengthChoices = ["C-Side length", "5 room jaunt", "B-Side length", "A-Side length", "Summit length", "Farewell length", "Milk the entity palette to death", "Final Goodbye"],
routefulChoices = ["Wavedash wallbounce", "Very linear", "Oh, that's touch switches, spicy", "Dadbod routing", "Very routeful", "Where the hell do I go??"];

function updateCharacteristics(r, l, d, s) {
    if (r) {
        var rtf = document.getElementById("char-routeful"),
        str = "";

        str += '<div class="entity-element-button-container"><div class="custom-button" onclick="updateCharacteristics(true, false, false)" style="margin: 0; overflow: hidden; padding-inline:5rem;">Reroll</div></div>';
        str += '<div class="characteristics-container-inner">';

        str += '<h3 style="margin:0">Routeful-ness:</h3>';

        num = routefulChoices.length * 2,
        rand = Math.random() * num;
        str += makeHealthBar(num, rand, "Linear", "Routeful");
        var text = routefulChoices[Math.floor(rand / 2)];
        str += '<p class="healthbar-desc">' + text + '</p>';

        str += '</div>';
        rtf.innerHTML = str;
    }

    if (l) {
        var len = document.getElementById("char-length"),
        str = "";

        str += '<div class="entity-element-button-container"><div class="custom-button" onclick="updateCharacteristics(false, true, false)" style="margin: 0; overflow: hidden; padding-inline:5rem;">Reroll</div></div>';
        str += '<div class="characteristics-container-inner">';

        str += '<h3 style="margin:0">Length:</h3>';

        var num = lengthChoices.length * 2;
        rand = Math.random() * num;
        str += makeHealthBar(num, rand, "Short", "Long");
        var text = lengthChoices[Math.floor(rand / 2)];
        str += '<p class="healthbar-desc">' + text + '</p>';

        str += '</div>';
        len.innerHTML = str;
    }

    if (d) {
        var dif = document.getElementById("char-difficulty"),
        str = "";

        str += '<div class="entity-element-button-container"><div class="custom-button" onclick="updateCharacteristics(false, false, true)" style="margin: 0; overflow: hidden; padding-inline:5rem;">Reroll</div></div>';
        str += '<div class="characteristics-container-inner">';

        str += '<h3 style="margin:0">Difficulty:</h3>';

        var num = difficultyChoices.length * 2,
        rand = Math.random() * num;
        str += makeHealthBar(num, rand, "Easy", "Hard");
        var text = difficultyAdjectives[Math.floor(Math.random() * difficultyAdjectives.length)] + " " + difficultyChoices[Math.floor(rand / 2)][Math.floor(Math.random() * difficultyChoices[Math.floor(rand / 2)].length)];
        str += '<p class="healthbar-desc">' + text + '</p>';

        str += '</div>';
        dif.innerHTML = str;
    }

    if (s) {
        var sty = document.getElementById("char-style"),
        str = "";

        str += '<div class="entity-element-button-container"><div class="custom-button" onclick="updateCharacteristics(false, false, false, true)" style="margin: 0; overflow: hidden; padding-inline:5rem;">Reroll</div></div>';
        str += '<div class="characteristics-container-inner">';

        str += '<h3 style="margin:0">Style:</h3>';

        var num = Math.floor(Math.random() * styleChoices.length);
        var text = styleChoices[num];
        str += '<p>' + text + '</p>';
        str += '<img style="height: 128px; margin: auto; border-radius: 8px; border: 1px solid var(--button-side)" src="data/style' + num + '.png"></img>';

        str += '</div>';
        sty.innerHTML = str;
    }
}

function generateNew() {
    var max = Math.max(parseInt(document.getElementById("entityNum").value), 0);
    shuffle(elements);
    chosenElements = elements.slice(0, max);
    displayEntities(chosenElements);


    var container = document.getElementById("result-container");

    container.innerHTML += `
        <div class="characteristics-container" id="char-routeful">
        </div>

        <div class=\"divider\"></div>
        
        <div class="characteristics-container" id="char-length">
        </div>

        <div class=\"divider\"></div>

        <div class="characteristics-container" id="char-difficulty">
        </div>

        <div class=\"divider\"></div>

        <div class="characteristics-container" id="char-style">
        </div>
    `;

    updateCharacteristics(true, true, true, true);
}

function displayEntities(entities) {

    document.getElementById("result-container").innerHTML = "";

    for (var i = 0; i < entities.length; i++) {

        document.getElementById("result-container").innerHTML += "<div class=\"entity-element\" id=\"entity-" + i + "\"></div><div class=\"divider\"></div>";
        updateEntity(i, entities[i]);
    }
}

function rerollElement(id) {

    //remove currently displayed items to avoid duplicates
    var exclude = [];
    chosenElements.forEach(element => {
        exclude.push(element);
        elements.splice(elements.indexOf(element), 1);
    });
    
    shuffle(elements);
    updateEntity(id, elements[0]);

    exclude.forEach(element => {
        elements.push(element);
    });
}

function updateEntity(id, newEntity) {
    chosenElements[id] = newEntity;

    var entity = newEntity;

    var name = entity.name.split(" / ");
    document.getElementById("entity-" + id).innerHTML = 
        '<div class="entity-element-button-container"><div class="custom-button" onclick="rerollElement(' + id + ')" style="margin: 0; overflow: hidden; padding-inline:5rem;">Reroll</div></div>' +
        '<p class="entity-element-text">' + name[0] + ' | ' +
        '<a href="https://gamebanana.com/' + entity.modItemType.toLowerCase() + "s" + "/" + entity.modID + '">' + entity.mod + " v" + entity.latestModVersion + '</a>' +
        ' | </p>';
}

function doTimestamps(lastUpdated){
        // reformat the dates with JavaScript: that allows us to show local time to the user, since their browser knows their timezone.

    document.querySelectorAll('.timestamp-long').forEach(elt =>
        elt.innerText = Temporal.Instant.from(lastUpdated).toLocaleString('en-US', {
            hour12: true,
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "numeric",
            minute: "2-digit",
            second: "2-digit",
        }
    ));
}

loadContent();