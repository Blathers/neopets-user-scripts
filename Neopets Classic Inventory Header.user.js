// ==UserScript==
// @name         Neopets Classic Inventory Header
// @version      1.1
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
    max-width: 50px;
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
    .inv-menulinks.mobile li:nth-child(6)
    {
    padding-left:70px;
    padding-bottom:2px;
    }
`);
addStyle(`
    .inv-menulinks.mobile li:nth-child(8)
    {
    padding-left:0px;
    padding-bottom:0px;
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
  top: 70px;
  left: 50%;
  transform: translate(-50%, -50%);
}
`);
addStyle(`
@media all and (max-width: 575px) {

.middleLink{
  left: 285px;
}
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
addStyle(`
.inv-log, .inv-safety
{
display:initial!important;
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
    document.getElementsByClassName("inv-quickstock-icon")[0].setAttribute('src', potion.src);
    lis[1].append(gift);
    document.getElementsByClassName("inv-transferlog-icon")[0].setAttribute('src', gift.src);
    lis[3].append(shirt);
    document.getElementsByClassName("inv-transferlog-icon")[1].setAttribute('src', shirt.src);
    lis[4].append(chest);
    document.getElementsByClassName("inv-transferlog-icon")[2].setAttribute('src', chest.src);
    lis[6].append(sword);
    document.getElementsByClassName("inv-transferlog-icon")[3].setAttribute('src', sword.src);

    let menuBar = document.getElementsByClassName("inv-menubar")[0];
    menuBar.append(topLink);
    menuBar.append(bottomLink);

    lis[7].append(shed);
    document.getElementsByClassName("inv-transferlog-icon")[4].setAttribute('src', shed.src);
    lis[8].append(display);
    document.getElementsByClassName("inv-transferlog-icon")[5].setAttribute('src', display.src);
    lis[9].append(stamp);
    document.getElementsByClassName("inv-transferlog-icon")[6].setAttribute('src', stamp.src);
    lis[10].append(card);
    document.getElementsByClassName("inv-transferlog-icon")[7].setAttribute('src', card.src);
    lis[11].append(album);
    document.getElementsByClassName("inv-transferlog-icon")[8].setAttribute('src', album.src);


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