// ==UserScript==
// @name         Sidebar Always Open
// @version      0.3
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
			dropdown.style.display = "none";
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

		if (dropdown === navdropdownout__2020 && shade.style.display === "block"){
			menuicon.classList.add('navmenu-icon-x');
		} else if (dropdown === navdropdownout__2020 && shade.style.display === "none"){
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