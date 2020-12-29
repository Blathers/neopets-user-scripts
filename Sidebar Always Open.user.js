// ==UserScript==
// @name         Sidebar Always Open
// @version      0.1
// @description  Keep that sidebar open please!
// @author       Harvey
// @require      http://code.jquery.com/jquery-latest.js
// @match        http://www.neopets.com/*
// @grant        none
// ==/UserScript==
var $ = window.jQuery;

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

openSidebar();
removeLink();