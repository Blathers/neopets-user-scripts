// ==UserScript==
// @name         Neopets Classic Inventory Header
// @version      1.0
// @description  Creates a classic look to your inventory
// @author       Harvey
// @match        https://www.neopets.com/inventory.phtml
// @icon         https://www.google.com/s2/favicons?sz=64&domain=neopets.com
// @grant        none
// ==/UserScript==

addStyle (`
    .inv-menulinks {
    height:85px;
    width:550px!important;
    background:url(https://i.imgur.com/EWyJD8I.png) no-repeat center!important;
    margin:auto!important;
    }`);
addStyle(`
    .inv-menulinks li
    {
    width: 50px;
    margin:-10px!important;
    padding-top:5px;
    }`);

addStyle(`
    .inv-menulinks li img
    {
    width: 50px;
    height: 50px;
    }`);
addStyle(`
    .inv-menulinks li:nth-child(8)
    {
    padding-left:70px;
    padding-bottom:2px;
    }
`);
addStyle(`
.inv-menulinks li img:hover
{
margin-top:-10px;
}
`);
addStyle(`
.middleLink{
position:absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
`);
addStyle(`
.middleLink img{
  width:40px;
  height:40px;}
`);
addStyle(`
.bottomLink{
margin-top:50px;
}
`);
addStyle(`
.topLink img:hover{
margin-top:-10px;
}`);
addStyle(`
.bottomLink img:hover{
margin-top:10px;
}`);
createImages();

function createImages()
{
    //Inventory Button
    let potion = document.createElement("img");
    potion.src = "https://i.imgur.com/IZwT8p8.png";

    let gift = document.createElement("img");
    gift.src = "https://i.imgur.com/k7OJclv.png";

    let shirt = document.createElement("img");
    shirt.src = "https://i.imgur.com/ETxA2Fg.png";

    let chest = document.createElement("img");
    chest.src = "https://i.imgur.com/gwWexwt.png";

    let sword = document.createElement("img");
    sword.src = "https://i.imgur.com/CnIOZDt.png";

    let shed = document.createElement("img");
    shed.src = "https://i.imgur.com/6nlMB6x.png";

    let display = document.createElement("img");
    display.src = "https://i.imgur.com/yhHDtVW.png";

    let stamp = document.createElement("img");
    stamp.src = "https://i.imgur.com/8PMUQfi.png";

    let card = document.createElement("img");
    card.src = "https://i.imgur.com/J4I53P5.png";

    let album = document.createElement("img");
    album.src = "https://i.imgur.com/A2EhywO.png";

    let topLink = document.createElement("a");
    let statue = document.createElement("img");
    topLink.setAttribute('href', 'https://www.neopets.com/objects.phtml');
    topLink.setAttribute('class', 'middleLink topLink');
    statue.src = "https://i.imgur.com/UkkJ2q2.png";
    topLink.append(statue);

    let bottomLink = document.createElement("a");
    let shop = document.createElement("img");
    bottomLink.setAttribute('href', 'https://www.neopets.com/market.phtml?type=your');
    bottomLink.setAttribute('class', 'middleLink bottomLink');
    shop.src = "https://i.imgur.com/GqTmyQU.png";
    bottomLink.append(shop);

    let lis = document.getElementsByClassName("inv-menulinks")[0].querySelectorAll('li a');
    for (let i=0; i < lis.length; i++)
    {
        lis[i].innerText = "";
    }

    lis[0].append(potion);
    lis[1].append(gift);
    lis[3].append(shirt);
    lis[4].append(chest);
    lis[6].append(sword);

    let menuBar = document.getElementsByClassName("inv-menubar")[0];
    menuBar.append(topLink);
    menuBar.append(bottomLink);

    lis[7].append(shed);
    lis[8].append(display);
    lis[9].append(stamp);
    lis[10].append(card);
    lis[11].append(album);


}


function addStyle(css) {
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