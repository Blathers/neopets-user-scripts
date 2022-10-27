// ==UserScript==
// @name         Neopets Add Important Links
// @version      0.3
// @description  Adds some missing links to the sidebar
// @author       Harvey
// @match        http://www.neopets.com/*
// @match        https://www.neopets.com/*
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
    var quickref = getLinkHtml("https://www.neopets.com/quickref.phtml", "nav-petcentral-icon__2020", "Quickref");
    var quickstock = getLinkHtml("https://www.neopets.com/quickstock.phtml", "nav-userlookup-icon__2020", "Quickstock");
    var custom = getLinkHtml("https://www.neopets.com/customise/", "nav-userlookup-icon__2020", "Customization");
    var sdb = getLinkHtml("https://www.neopets.com/safetydeposit.phtml", "nav-inventory-icon__2020", "Safety Deposit Box");
    addedLinks = addedLinks + quickref;
    addedLinks = addedLinks + quickstock;
    addedLinks = addedLinks + custom;
    addedLinks = addedLinks + sdb;

    var addInvLink = "<a href=\"/inventory.phtml\"><div class=\"navsub-np-meter__2020\" style=\"display: inline-block; margin-bottom: 0px;text-align:center;\"><div class=\"navsub-np-icon__2020\" style=\"background:none!important;\"><img src=\"https://images.neopets.com/themes/h5/hauntedwoods/images/inventory-icon.svg\" width=\"25\"></div><span id=\"npanchor\" class=\"np-text__2020\">Inventory</span></div></a>"

    var clock = document.getElementsByClassName("nav-profile-dropdown-clock__2020")[0];

    if (clock != null)
    {
        var firstSet = document.getElementById("navprofiledropdown__2020");
        var newEl = document.createElement('ul');
        newEl.innerHTML = addedLinks;
        clock.parentNode.insertBefore(newEl, clock.nextSibling.nextSibling);

        var bankLink = document.getElementsByClassName("navsub-right__2020")[0];


        var invEl = document.createElement('span');
        invEl.innerHTML = addInvLink;

        bankLink.insertBefore(invEl, bankLink.children[0]);
    }
}

addLinks();