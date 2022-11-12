// ==UserScript==
// @name         Fixed Position SSW
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Always keep the SSW and bookmark in fixed location
// @author       Harvey
// @match        http://www.neopets.com/*
// @match        https://www.neopets.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=neopets.com
// @grant        GM.setValue
// ==/UserScript==

GM_addStyle ( `
    .navsub-left__2020{
    margin-top:10px !important;
    }
` );

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