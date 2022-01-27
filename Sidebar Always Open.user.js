// ==UserScript==
// @name         Sidebar Always Open
// @version      0.8
// @description  Keep that sidebar open please!
// @author       Harvey
// @match        http://www.neopets.com/*
// @match        https://www.neopets.com/*
// @grant        GM.getValue
// @grant        GM.setValue

// @require      http://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js
// ==/UserScript==
var $ = window.jQuery;

GM_addStyle ( `
    .hp-carousel-container {
        margin-left:100px;
    }
` );

$(document).ready(function () {

    var results = document.getElementsByClassName("nav-pet-menu-icon__2020");
    results[0].addEventListener('click', function () {
        toggleSidebar();
    });

});

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

var isToggledOpen = true;

async function toggleSidebar()
{
    GM.setValue("sidebar_always_open_toggle_value", !isToggledOpen);
    openorcloseonload();

}


async function openorcloseonload()
{
    var toggled = await GM.getValue("sidebar_always_open_toggle_value", -1);

    if (toggled == -1)
    {
        GM.setValue("sidebar_always_open_toggle_value", true);
        toggled = true;
    }

    if (toggled)
    {
        openSidebar();
    }
    else
    {
        closeSidebar();
    }
    isToggledOpen = toggled;
}

function closeSidebar()
{
    EditAttributeValue("navprofiledropdown__2020", "style", "display: none!important;");
    moveShopWiz(false);

}

function openSidebar()
{
    var results = document.getElementById("navprofiledropdown__2020");
    EditAttributeValue("navprofiledropdown__2020", "style", "display: block!important;");
    EditAttributeValue("nav-dropdown-shade__2020", "style", "display: none!important;");
    moveShopWiz(true);
}

function toggleNavDropdown__2020(dropdown)
{
	var elements = document.getElementsByClassName('nav-dropdown__2020');
	var shade = document.getElementById('navdropdownshade__2020');
	var menuicon = document.getElementById('navmenu-icon__2020');

	$('.nav-top__2020').removeClass('dropdownshade-below__2020');
	$('.nav-bottom__2020').removeClass('dropdownshade-above__2020');

	if (shade.style.display === "block") { // if a dropdown is open
		shade.style.display = "none"; // turn off the shade layer
		if(typeof(menuicon) != 'undefined' && menuicon != null ){
			menuicon.classList.remove('navmenu-icon-x');
		}

		// close any open dropdowns
		for (var i = 0; i < elements.length; i++){
            if (elements[i].id != "navprofiledropdown__2020")
            {
			elements[i].style.display = "none";
            }
		}

		$('.nav-top__2020').find('.nav-dropdown-arrow__2020').removeClass('nav-dropdown-arrow-rotate'); // nav arrow rotation

	} else if (shade.style.display === "none") { // if all dropdowns are closed
		shade.style.display = "block"; // turn on the shade layer
		dropdown.style.display = "block"; // turn on the correct dropdown based on the parameter passed into the function
		// parameter should always be an ID, not a class
	} else {
		return false;
	}


	// Logged out navigation only code
	if(typeof(menuicon) != 'undefined' && menuicon != null){

		if (dropdown === "navdropdownout__2020" && shade.style.display === "block"){
			menuicon.classList.add('navmenu-icon-x');
		} else if (dropdown === "navdropdownout__2020" && shade.style.display === "none"){
			menuicon.classList.remove('navmenu-icon-x');
		}

	}
}

addJS_Node (toggleNavDropdown__2020);
function addJS_Node (text, s_URL, funcToRun, runOnLoad) {
    var D = document;
    var scriptNode = D.createElement ('script');
    if (runOnLoad) {
        scriptNode.addEventListener ("load", runOnLoad, false);
    }
    scriptNode.type = "text/javascript";
    if (text) scriptNode.textContent = text;
    if (s_URL) scriptNode.src = s_URL;
    if (funcToRun) scriptNode.textContent = '(' + funcToRun.toString() + ')()';

    var targ = D.getElementsByTagName ('head')[0] || D.body || D.documentElement;
    targ.appendChild (scriptNode);
}

function removeLink()
{
    var results = document.getElementsByClassName("nav-pet-menu-icon__2020");
    if (results[0] != null)
    {

        results[0].outerHTML = results[0].outerHTML.replace("onclick=\"toggleNavDropdown__2020(navprofiledropdown__2020)","");

    }
}

function moveShopWiz(open)
{
    if (open)
    {

        GM_addStyle ( `
         .navsub-left__2020 {
         left:290px!important;
         }
        ` );

    }
    else{


        GM_addStyle ( `
         .navsub-left__2020 {
         left:10px!important;
         }
        ` );

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

removeLink();
openorcloseonload();