// ==UserScript==
// @name         Void Within Better UI Feedback
// @version      1.0
// @description  Improves the UI color feedback for better readability
// @author       Harvey
// @match        https://www.neopets.com/tvw/rewards/
// @icon         https://www.google.com/s2/favicons?sz=64&domain=neopets.com
// @run-at       document-start
// ==/UserScript==

(function() {
    var stylesheet = `
    .plothub-container.rewards.tvw .plothub-awards .plothub-achievements .plothub-act .plothub-achievement-list .plothub-achievement-item
    {
    background: rgba(69, 69, 70, 0.5) !important;
    }
    .plothub-container.rewards.tvw .plothub-awards .plothub-achievements .plothub-act .plothub-achievement-list .plothub-achievement-item.completed
    {
    background-color: #9513a2 !important;
    }
`;


    const style = document.createElement("style");
    style.type="text/css";
    style.id="harvey_void_ui_fix";
    style.innerHTML=stylesheet;
    document.head.appendChild(style);
})();