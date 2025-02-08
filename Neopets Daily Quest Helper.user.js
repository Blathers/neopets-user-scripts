// ==UserScript==
// @name         Neopets Daily Quest Helper
// @namespace    http://tampermonkey.net/
// @version      1.2
// @description  Add a "Go!" button to aid your daily questing
// @author       Harvey
// @match        https://www.neopets.com/questlog/
// @icon         https://www.google.com/s2/favicons?sz=64&domain=neopets.com
// @grant        none
// ==/UserScript==

GM_addStyle (`
    .button-grid2__2020{
     grid-template:auto / repeat(3, 1fr)!important;
    }`);

GM_addStyle (`
    .btn-single__2020{
     display:inline!important;
    }`);

GM_addStyle (`
    .ql-quest-buttons{
     text-align: center;
    }`);
GM_addStyle (`
    .ql-quest-buttons button{
     margin: 10px !important;
    }`);
function adjustDailyChunks()
{
    var results = document.getElementsByClassName("questlog-quest");
    for (var i = 0; i < results.length; i++)
    {
        var buttons = results[i].getElementsByClassName("ql-quest-buttons")[0];
        var helpButton = document.createElement("button");
        helpButton.classList.add("button-default__2020");
        helpButton.classList.add("btn-single__2020");
        helpButton.classList.add("button-yellow__2020");
        helpButton.innerHTML = "Go!";

        var questText = results[i].getElementsByClassName("ql-quest-description")[0].innerHTML;

        var linkWrapper = document.createElement("a");
        linkWrapper.href = turnQuestTypeToLink(questText);

        console.log("Quest text" + turnQuestTypeToLink(questText));

        linkWrapper.appendChild(helpButton);

        buttons.appendChild(linkWrapper);


    }
}

function turnQuestTypeToLink(questText)
{
    var quest = questText.toLowerCase();
    if (quest.includes("wheel"))
    {
        if(quest.includes("mediocrity"))
        {
            return "/prehistoric/mediocrity.phtml";
        }
        else if (quest.includes("excitement"))
        {
            return ("/faerieland/wheel.phtml");
        }
        else if (quest.includes("misfortune"))
        {
            return ("/halloween/wheel/index.phtml");
        }
        else if (quest.includes("knowledge"))
        {
            return ("/medieval/knowledge.phtml");
        }
    }
    else if (quest.includes("purchase"))
    {
        return ("/generalstore.phtml");
    }
    else if (quest.includes("game"))
    {
        return ("/games/h5game.phtml?game_id=1392");
    }
    else if (quest.includes("customise"))
    {
        return("/customise.phtml");
    }

    return "/inventory.phtml";
}

adjustDailyChunks();


function GM_addStyle(css) {
  const style = document.getElementById("GM_addStyleBy8626") || (function() {
    const style = document.createElement('style');
    style.type = 'text/css';
    style.id = "GM_addStyleBy8626";
    document.head.appendChild(style);
    return style;
  })();
  const sheet = style.sheet;
  sheet.insertRule(css, (sheet.rules || sheet.cssRules || []).length);
}