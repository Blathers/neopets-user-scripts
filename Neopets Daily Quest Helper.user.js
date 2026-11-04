// ==UserScript==
// @name         Neopets Daily Quest Helper
// @namespace    http://tampermonkey.net/
// @version      1.4
// @description  Add a "Go!" button to aid your daily questing
// @author       Harvey
// @match        https://www.neopets.com/questlog/
// @icon         https://www.google.com/s2/favicons?sz=64&domain=neopets.com
// @grant        none
// ==/UserScript==

GM_addStyle(`
    .button-grid2__2020{
     grid-template:auto / repeat(3, 1fr)!important;
    }`);

GM_addStyle(`
    .btn-single__2020{
     display:inline!important;
    }`);

GM_addStyle(`
    .ql-quest-buttons{
     text-align: center;
    }`);

GM_addStyle(`
    .ql-quest-buttons button{
     margin: 10px !important;
    }`);

function isDailyQuestsTab() {
    var activeTab = document.querySelector(".questlog-tab.tab-active");
    return !!(activeTab && activeTab.classList.contains("tab-2"));
}

function adjustDailyChunks() {
    if (!isDailyQuestsTab()) return;

    var results = document.getElementsByClassName("questlog-quest");
    for (var i = 0; i < results.length; i++) {
        var buttons = results[i].getElementsByClassName("ql-quest-buttons")[0];
        if (!buttons) continue;

        if (buttons.querySelector(".nqdh-go-btn")) continue;

        var helpButton = document.createElement("button");
        helpButton.type = "button";
        helpButton.classList.add("button-default__2020");
        helpButton.classList.add("btn-single__2020");
        helpButton.classList.add("button-yellow__2020");
        helpButton.classList.add("nqdh-go-btn");
        helpButton.innerHTML = "Go!";

        var titleEl = results[i].getElementsByClassName("ql-quest-title")[0];
        var descEl = results[i].getElementsByClassName("ql-quest-description")[0];
        var questText = ((titleEl && titleEl.textContent) || "") + " " +
            ((descEl && descEl.textContent) || "");

        var linkWrapper = document.createElement("a");
        linkWrapper.href = turnQuestTypeToLink(questText);
        linkWrapper.appendChild(helpButton);
        buttons.appendChild(linkWrapper);
    }
}

function turnQuestTypeToLink(questText) {
    var quest = questText.toLowerCase();
    if (quest.includes("wheel")) {
        if (quest.includes("mediocrity")) {
            return "/prehistoric/mediocrity.phtml";
        } else if (quest.includes("excitement")) {
            return "/faerieland/wheel.phtml";
        } else if (quest.includes("misfortune")) {
            return "/halloween/wheel/index.phtml";
        } else if (quest.includes("knowledge")) {
            return "/medieval/knowledge.phtml";
        } else if (quest.includes("extravagance")) {
            return "/desert/extravagance.phtml";
        } else if (quest.includes("monotony")) {
            return "/space/wheelofmonotony.phtml";
        }
    } else if (quest.includes("grumpy")) {
        return "/medieval/grumpyking.phtml";
    } else if (quest.includes("purchase") || quest.includes("buy")) {
        return "/generalstore.phtml";
    } else if (quest.includes("battledome")) {
        return "/dome.phtml";
    } else if (quest.includes("customise") || quest.includes("customize")) {
        return "/customise/";
    } else if (quest.includes("vortex") || quest.includes("fishing")) {
        return "/water/fishing.phtml";
    } else if (quest.includes("wearable") || quest.includes("popular") || quest.includes("trip")) {
        return "/mall.phtml";
    } else if (quest.includes("game") || quest.includes("play ")) {
        return "/games/";
    } 
    else if (quest.includes("Customisation Spotlight")) {
        return "/spotlights/custompet/index.phtml";return "/customisation/";
    } else if (
        quest.includes("feed") ||
        quest.includes("groom") ||
        quest.includes("read") ||
        quest.includes("book")
    ) {
        return "/inventory.phtml";
    }
    return "/inventory.phtml";
}

var adjustTimer = null;
function scheduleAdjust() {
    if (adjustTimer) clearTimeout(adjustTimer);
    adjustTimer = setTimeout(adjustDailyChunks, 100);
}

function observeChanges() {
    var targetNode = document.getElementById("quest-log-app") ||
        document.getElementById("QuestLogContent") ||
        document.querySelector(".questlog-container");

    if (!targetNode) {
        // Page still booting — try again shortly
        setTimeout(observeChanges, 250);
        return;
    }

    var contentObserver = new MutationObserver(scheduleAdjust);
    contentObserver.observe(targetNode, { childList: true, subtree: true });

    scheduleAdjust();
}

observeChanges();

function GM_addStyle(css) {
    const style = document.getElementById("GM_addStyleBy8626") || (function () {
        const style = document.createElement("style");
        style.type = "text/css";
        style.id = "GM_addStyleBy8626";
        document.head.appendChild(style);
        return style;
    })();
    const sheet = style.sheet;
    sheet.insertRule(css, (sheet.rules || sheet.cssRules || []).length);
}
