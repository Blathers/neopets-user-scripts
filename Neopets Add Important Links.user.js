// ==UserScript==
// @name         Neopets Add Important Links
// @version      1.1
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

function addLinks(onBoards)
{
    var beginning = "";
    if (onBoards){
    beginning = "https://www.neopets.com/";
    }
    var addedLinks = "";
    var quickref = getLinkHtml("quickref.phtml", "nav-petcentral-icon__2020", "Quickref");
    var quickstock = getLinkHtml("quickstock.phtml", "nav-userlookup-icon__2020", "Quickstock");
    var custom = getLinkHtml("customise.phtml", "nav-userlookup-icon__2020", "Customization");
    var sdb = getLinkHtml("safetydeposit.phtml", "nav-inventory-icon__2020", "Safety Deposit Box");
    addedLinks = addedLinks + quickref; //Quickref link
    addedLinks = addedLinks + quickstock; //Quickstock link
    addedLinks = addedLinks + custom; //Customization link
    addedLinks = addedLinks + sdb; //Safety deposit box link

    var addInvLink = "<a href=\"" +beginning +"inventory.phtml\"><div class=\"navsub-np-meter__2020\" style=\"display: inline-block;margin-right:5px; margin-bottom: 0px;text-align:center;\"><div class=\"navsub-np-icon__2020\" style=\"background:none!important;\"><img src=\"https://images.neopets.com/themes/h5/hauntedwoods/images/inventory-icon.svg\" width=\"25\"></div><span class=\"np-text__2020\">Inventory</span></div></a>"

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

function checkIfOnHomePage(){
    var onBoards = (document.URL.includes("https://www.neopets.com/neoboards/"));
    addLinks(onBoards);
}

checkIfOnHomePage();
