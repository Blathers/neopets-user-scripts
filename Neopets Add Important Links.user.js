// ==UserScript==
// @name         Neopets Add Important Links
// @version      0.2
// @description  Adds some missing links to the sidebar
// @author       Harvey
// @match        http://www.neopets.com/*
// @grant        none
// ==/UserScript==

var $ = window.jQuery;

//returns true if white
//returns false if black
function getLinkHtml(link,icon,text)
{
    var linkadd ="<a href=\"" +link + "\"><li class=\"nav-link-leave-beta__2020\" data-url=\"/" + link + "\"><div class=\"" + icon +"\"></div>" + text +"</li></a>";
    return linkadd;
}

function addLinks()
{
    var addedLinks = "";
    var quickref = getLinkHtml("http://www.neopets.com/quickref.phtml", "nav-petcentral-icon__2020", "Quickref");
    var quickstock = getLinkHtml("http://www.neopets.com/quickstock.phtml", "nav-userlookup-icon__2020", "Quickstock");
    var sdb = getLinkHtml("http://www.neopets.com/safetydeposit.phtml", "nav-inventory-icon__2020", "Safety Deposit Box");
    addedLinks = addedLinks + quickref;
    addedLinks = addedLinks + quickstock;
    addedLinks = addedLinks + sdb;

    var clock = document.getElementsByClassName("nav-profile-dropdown-clock__2020")[0];

    var firstSet = document.getElementById("navprofiledropdown__2020");
    var newEl = document.createElement('ul');
    newEl.innerHTML = addedLinks;
    clock.parentNode.insertBefore(newEl, clock.nextSibling.nextSibling);

}

addLinks();