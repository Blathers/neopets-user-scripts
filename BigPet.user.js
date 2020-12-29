// ==UserScript==
// @name         Big Pet
// @version      0.1
// @description  Make the boards a little nicer with big pet images!
// @author       Harvey
// @require      http://code.jquery.com/jquery-latest.js
// @match        http://www.neopets.com/*
// @grant        none
// ==/UserScript==

GM_addStyle ( `
    .postPetInfo {
        margin-right: 50% !important;
        margin-left: 50% !important;
        width:185px;
    }
` );
GM_addStyle ( `
    .postPetInfo h4, .postPetInfo p{
text-align:center!important;
    }
` );
GM_addStyle (`
    .postAuthorPetIcon img {
        margin-left:40px;
    }`);
GM_addStyle (`
    .postAuthor {
margin-left:50px;
    }`);

GM_addStyle (`
    .authorIcon {
margin-top:10px;
    }`);

function getPostAuthorPet()
{
    var results = document.getElementsByClassName("postAuthorPetIcon");
    for(var i = 0; i < results.length; i++){
        var newhtml = results[i].innerHTML.replace("1/1","2/2");
        newhtml = newhtml.replace("width=\"50\"","");
        newhtml = newhtml.replace("height=\"50\"","");
        results[i].innerHTML = newhtml;
        results[i].outerHTML = results[i].outerHTML + "<br>";
    }
}

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

getPostAuthorPet();