// ==UserScript==
// @name         Sidebar Always Open
// @version      0.2
// @description  Keep that sidebar open please!
// @author       Harvey
// @match        http://www.neopets.com/*
// @grant        none
// ==/UserScript==
var $ = window.jQuery;

GM_addStyle ( `
    .hp-carousel-container {
        margin-left:100px;
    }
` );

function increaseTrack()
{
    var results = document.getElementsByClassName("slick-track");
    for(var i = 0; i < results.length; i++){
        var newhtml = results[i].innerHTML.replace("width: 5100px;","width: 5200px;");
        results[i].innerHTML = newhtml;
    }
}
function EditAttributeValue(elemId, attribute, newvalue)
{
    $("#"+elemId).attr(attribute,newvalue);
}

function openSidebar()
{
    var results = document.getElementById("navprofiledropdown__2020");
    EditAttributeValue("navprofiledropdown__2020", "style", "display: block!important;");
    EditAttributeValue("nav-dropdown-shade__2020", "style", "display: none!important;");
}

function removeLink()
{
    var results = document.getElementsByClassName("nav-pet-menu-icon__2020");
    for(var i = 0; i < results.length; i++){
        results[i].outerHTML = results[i].outerHTML.replace("onclick=\"toggleNavDropdown__2020(navprofiledropdown__2020)","");
        results[i].outerHTML = "<a href=\"http://www.neopets.com/quickref.phtml\">" + results[i].outerHTML + "</a>";
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

openSidebar();
removeLink();