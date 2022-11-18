// ==UserScript==
// @name         Neopets Beta Animation Toggler
// @version      1.1
// @description  Ability to turn on or off the neopets animation on the beta site
// @author       Harvey
// @match        https://www.neopets.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=neopets.com
// @grant       GM.setValue
// @grant       GM.getValue
// ==/UserScript==

    const animationOnOff = "animationOnOff";
GM_addStyle ( `
    #animationCheckArea{
    font-size:13px;
    background:white;
    font-family:verdana;
    padding:10px;
    border-radius:5px;
    }
` );
GM_addStyle(`
    .footer-links__2020{
    max-width:450px!important;
    }`);
    const setAnimationOnOff = async ()=>{
         var value = await getAnimationOnOffSetting();

        var footerDiv = document.getElementsByClassName("footer-link__2020")[0];
        var checkBox = document.createElement("input");
        var checkDiv = document.createElement("div");
        var checkText = document.createElement("span");
        checkDiv.setAttribute("id", "animationCheckArea");
        checkDiv.appendChild(checkBox);
        checkDiv.appendChild(checkText);
        checkBox.setAttribute("type", "checkbox");
        checkBox.addEventListener("click", changeToggle, false);
        if(value){
            checkBox.setAttribute("checked", "true");
        }else{
        GM_addStyle ( `
    .nav-top-pattern__2020 {
animation: none !important;
}
` );
        }
        checkText.textContent="Animation";
        if (footerDiv){
        footerDiv.parentNode.insertBefore(checkDiv, footerDiv);
        }

    }

   //Confirmation for clearing the data
   const changeToggle = async (value) =>{
       var currvalue = await getAnimationOnOffSetting();
       await toggleAnimationOnOff(!currvalue);
   }

    const getAnimationOnOffSetting = async ()=>{
       const value = await GM.getValue(animationOnOff);
       return value;
   }

    const toggleAnimationOnOff = async (value)=>{
               await GM.setValue(animationOnOff, value);
    }



function GM_addStyle(css) {
  const style = document.getElementById("GM_addStyle") || (function() {
    const style = document.createElement('style');
    style.type = 'text/css';
    style.id = "GM_addStyle";
    document.head.appendChild(style);
    return style;
  })();
  const sheet = style.sheet;
  sheet.insertRule(css, (sheet.rules || sheet.cssRules || []).length);
}

setAnimationOnOff();