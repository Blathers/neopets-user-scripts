// ==UserScript==
// @name         Restock History
// @version      1.0
// @description  Track your neopets restocks
// @author       You
// @match        https://www.neopets.com/haggle.phtml
// @match        https://www.neopets.com/market.phtml?type=sales
// @icon         https://www.google.com/s2/favicons?sz=64&domain=neopets.com
// @grant       GM.setValue
// @grant       GM.getValue
// @grant       GM_registerMenuCommand
// @grant       GM_openInTab
// @grant       GM_log
// ==/UserScript==


(async () => {

   const dataStorage = "restockTrackerData";
   const idSave = "idSaveData";
   const maxSaves = 30;
   const foreverProfit = "foreverProfitData";

    GM_registerMenuCommand('Developer Refresh', async function() {
        await checkForHaggleWin();
    }, 'r');

   //Check if we've successfully haggled an item
   const checkForHaggleWin = async ()=> {
       const addedText = "has been added to your inventory";

       var container = document.getElementById("container__2020");
       var successful = container.innerHTML.includes(addedText);

       if (successful){ //Haggle was a success!

           var pItems = container.getElementsByTagName("p");

           var itemImageDiv = container.getElementsByClassName("haggle-item")[0];
           const styles = window.getComputedStyle(itemImageDiv);
           var itemImageUrl = styles.backgroundImage.slice(5, -2);

           var itemPriceP = pItems[1]; //P item that contains item price
           var itemPrice = itemPriceP.getElementsByTagName("b")[1];

           var itemNameP = pItems[2]; //P item that contains item name
           var itemName = itemNameP.getElementsByTagName("b")[0];

           const itemData = await getSavedItems();

           var buyPrice = Number(itemPrice.innerHTML);

           const item = {
               id: await getUpdateNextUnusedId(),
               name: itemName.innerHTML,
               buyprice: buyPrice,
               image: itemImageUrl,
               sold: false,
               sellprice: 0,
               timestamp: new Date().getTime(),
               soldtime: null
           }

           itemData.unshift(item); //Add item to list


           GM.setValue(dataStorage, JSON.stringify(itemData));

           await updateForeverProfit(-buyPrice)
       }
   }

   const getUpdateNextUnusedId = async () =>{
       const id = await GM.getValue(idSave);
       var newId;
       if (isNaN(id))
       {
           newId = 0;
       }
       else{
           newId = id + 1;
       }


       GM.setValue(idSave, newId);

       return newId;

   }

   //Display saved items
   const displaySavedItems = async () =>{
       var savedItems = await getSavedItems();

       //Display css
       const css = `
       <style>
       #restockDiv{
       text-align:center;margin-left:178px;}
    #restock{
    margin-top:10px;
    margin-left:auto;
    margin-right:auto;
    text-align:center;
    border-collapse: collapse;
    font-size: 0.9em;
    font-family: sans-serif;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);
    }
    #restock thead tr
    {
    background-color: #009879;
    color: #ffffff;
    text-align: left;
    }
    #restock th,
#restock td {
    padding: 12px 15px;
}
#restock tbody tr {
    border-bottom: 1px solid #dddddd;
}

#restock tbody tr:nth-of-type(even) {
    background-color: #f3f3f3;
}

#restock tbody tr:last-of-type {
    border-bottom: 2px solid #009879;
}
#restock tbody tr.active-row {
    font-weight: bold;
    color: #009879;
}
.profit{
background-color:#18cc6f;
}
.loss{
background-color:#e8563c;
}
#soldprice{
width:100px;
}
.totalProfitText{
text-align:right;
}
.history p{
display:inline;
}


.button-24 {
  background: #ff918f;
  border: 1px solid #FF4742;
  border-radius: 6px;
  box-shadow: rgba(0, 0, 0, 0.1) 1px 2px 4px;
  box-sizing: border-box;
  color: #FFFFFF;
  cursor: pointer;
  display: inline-block;
  font-family: nunito,roboto,proxima-nova,"proxima nova",sans-serif;
  font-size: 16px;
  font-weight: 800;
  line-height: 16px;
  outline: 0;
  padding: 5px 7px;
  text-align: center;
  text-rendering: geometricprecision;
  text-transform: none;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  vertical-align: middle;
}

.button-24:hover,
.button-24:active {
  background-color: initial;
  background-position: 0 0;
  color: #FF4742;
}

.button-24:active {
  opacity: .5;
}

    </style>
       `;

       //Create the table headers

       var header = document.createElement("h2");
       header.textContent = "Restock History";

       var buttonDiv = document.createElement("div");
       buttonDiv.setAttribute("id", "restockButtonDiv");

       var clearButton = document.createElement("button");
       clearButton.textContent="Clear Restock History";
       clearButton.addEventListener("click", confirmClear, false);
       buttonDiv.appendChild(clearButton);

       var tableDoc = document.createElement("table");
       tableDoc.setAttribute("id", "restock");

       var trDoc = document.createElement("tr");

       var deleteHeader = document.createElement("th");
       deleteHeader.textContent = "Del?";
       trDoc.appendChild(deleteHeader);

       var itemHeader = document.createElement("th");
       itemHeader.textContent="Item";
       trDoc.appendChild(itemHeader);

       var purchasePriceHeader = document.createElement("th");
       purchasePriceHeader.textContent="Purchase Price";
       trDoc.appendChild(purchasePriceHeader);

       var pDateHeader = document.createElement("th");
       pDateHeader.textContent="Purchase Date/Time";
       trDoc.appendChild(pDateHeader);

       var soldPriceHeader = document.createElement("th");
       soldPriceHeader.textContent="Sold Price";
       trDoc.appendChild(soldPriceHeader);

       var sDateHeader = document.createElement("th");
       sDateHeader.textContent="Sold Date/Time";
       trDoc.appendChild(sDateHeader);

       var profitHeader = document.createElement("th");
       profitHeader.textContent="Profit";
       trDoc.appendChild(profitHeader);


       //Create total profit bar

       var topTr = document.createElement("tr");
       var totalProfitTextTd = document.createElement("th");
       totalProfitTextTd.setAttribute("colspan", "4");
       totalProfitTextTd.setAttribute("class", "totalProfitText");

       var helpImg = document.createElement("img");
       helpImg.setAttribute("src", "//images.neopets.com/help/question_mark.png");
       helpImg.setAttribute("width", "8");
       helpImg.setAttribute("title", "Total profit takes into account buy and sell prices. It does not clear when you remove history.");

       var tpText = document.createElement("b");
       tpText.textContent = "Total Profit:";

       totalProfitTextTd.appendChild(helpImg);
       totalProfitTextTd.appendChild(tpText);

       var totalProfitAmntTd = document.createElement("td");
       totalProfitAmntTd.setAttribute("colspan", "2");
       var prof = await getForeverProfit();
       totalProfitAmntTd.textContent = prof.toLocaleString("en-US") + " NP";

       if (prof > 0){
                totalProfitAmntTd.setAttribute("class", "totalProfitText profit");
       }else if (prof < 0){

                totalProfitAmntTd.setAttribute("class", "totalProfitText loss");
       }
       else
       {
                totalProfitAmntTd.setAttribute("class", "totalProfitText");
       }

       topTr.appendChild(totalProfitTextTd);
       topTr.appendChild(totalProfitAmntTd);

       tableDoc.appendChild(topTr);
       tableDoc.appendChild(trDoc);

       var history = document.createElement("div");
       history.setAttribute("class", "history");
       var historyInfo = document.createElement("p");
       historyInfo.textContent = savedItems.length + "/" + maxSaves + " items logged ";

       history.appendChild(historyInfo);
       var historyHelpImg = document.createElement("img");
       historyHelpImg.setAttribute("src", "//images.neopets.com/help/question_mark.png");
       historyHelpImg.setAttribute("width", "8");
       historyHelpImg.setAttribute("title", "When you've reached your max history, items will start disappearing from your history log. Please remove items manually or clear out your history routinely.");

       history.appendChild(historyHelpImg);

       buttonDiv.appendChild(history);

       //remove saved items if maxSaves changed
       if (savedItems.length > maxSaves)
       {
           savedItems.shift();
           await GM.setValue(dataStorage, JSON.stringify(savedItems));

       }


       //For each restocked item create a row
       for (var i in savedItems){

           var buydate = new Date(savedItems[i].timestamp).toLocaleString();
           var selldate = new Date(savedItems[i].soldtime).toLocaleString();

           var innerTrDoc = document.createElement("tr");

           var delTd = document.createElement("td");
           var delButton = document.createElement("button");
           delButton.setAttribute("class", "button-24");
           delButton.setAttribute("role", "button");
           delButton.textContent = "x";
           delButton.itemIdParam = savedItems[i].id;
           delButton.addEventListener("click", deleteEntry, false);
           delTd.appendChild(delButton);
           innerTrDoc.appendChild(delTd);

           var itemTd = document.createElement("td");
           var itemImg = document.createElement("img");
           itemImg.setAttribute("src", savedItems[i].image);
           var itemP = document.createElement("p");
           itemP.textContent = savedItems[i].name;
           itemTd.appendChild(itemImg);
           itemTd.appendChild(itemP);
           innerTrDoc.appendChild(itemTd);

           var pPriceTd = document.createElement("td");
           pPriceTd.textContent = savedItems[i].buyprice.toLocaleString("en-US") + " NP";
           innerTrDoc.appendChild(pPriceTd);

           var pDateTd = document.createElement("td");
           pDateTd.textContent = buydate;
           innerTrDoc.appendChild(pDateTd);

           var sPriceTd = document.createElement("td");
           var sDateTd = document.createElement("td");
           var profitTd = document.createElement("td");
           if (savedItems[i].sold){
               sPriceTd.textContent = savedItems[i].sellprice.toLocaleString("en-US") + " NP";
               sDateTd.textContent = selldate;

               var profit = savedItems[i].sellprice - savedItems[i].buyprice;
               profitTd.textContent = profit.toLocaleString("en-US") + " NP";

               if (profit> 0)
               {
                profitTd.setAttribute("class", "profit");
               }
               else if (profit < 0)
               {
                profitTd.setAttribute("class", "loss");
               }
           }
           else
           {
               var sPriceInput = document.createElement("input");
               sPriceInput.value = 0;
               sPriceInput.setAttribute("id", "soldprice");

               sPriceTd.appendChild(sPriceInput);

               var soldButton = document.createElement("button");
               soldButton.textContent = "Sold";
               soldButton.itemIdParam = savedItems[i].id;
               soldButton.priceInputParam = sPriceInput;
               soldButton.addEventListener("click", setSold, false);
               sDateTd.appendChild(soldButton);

               profitTd.textContent= (-1*savedItems[i].buyprice).toLocaleString("en-US") + " NP";
           }


           innerTrDoc.appendChild(sPriceTd);
           innerTrDoc.appendChild(sDateTd);
           innerTrDoc.appendChild(profitTd);


           tableDoc.appendChild(innerTrDoc);
       }

       var insertNode = document.createElement("div");
       insertNode.setAttribute("id", "restockDiv");
       insertNode.innerHTML = css;
       insertNode.appendChild(header);
       insertNode.appendChild(buttonDiv);
       insertNode.appendChild(tableDoc);

       var getContentDiv = document.getElementById("content");
       getContentDiv.appendChild(insertNode);


   }

   //Set sold
   const setSold = async (evt)=>{
       var id = evt.currentTarget.itemIdParam;

       var items = await getSavedItems();

       var sellPrice = evt.currentTarget.priceInputParam.value;
       sellPrice = sellPrice.replace(",", "");
       sellPrice = sellPrice.replace("NP", "");
       sellPrice = sellPrice.replace(" ","");
       sellPrice = Number(sellPrice);

       if (!isNaN(sellPrice)){

           var item = items.find(x => x.id == id);
           if (item) {
               item.sold = true;
               item.sellprice = sellPrice;

               item.soldtime = new Date().getTime();

               await updateForeverProfit(item.sellprice)

               if (items.length > maxSaves)
               {
                 items.shift();
               }

               await GM.setValue(dataStorage, JSON.stringify(items));
           }



           await refreshHistory();
       }
       else
       {
           alert("Please enter a number only in the Sold Price input box");
       }
   }

   //Delete entry
   const deleteEntry = async (evt)=>{

       var id = evt.currentTarget.itemIdParam;

       var items = await getSavedItems();
       var item = items.find(x => x.id == id);
           if (item) {
               var continueDelete = true;
               if (item.sold == false)
               {
                   var confirm = window.confirm("Are you sure you want to delete this entry before selling it?");
                   continueDelete = confirm;
               }
               if (continueDelete){
               const index = items.indexOf(item);
               items.splice(index, 1); //remove item from array

               //Resave values
               await GM.setValue(dataStorage, JSON.stringify(items));

                   refreshHistory();

               }
           }
   }

   const refreshHistory = async()=>{

       var restockDiv = document.getElementById("restockDiv");
       restockDiv.remove();

       await displaySavedItems();
   }

   //Choose what to run based on location
   const actBasedOnLocation = async ()=>{
       var onMarketPlace = (document.URL == "https://www.neopets.com/market.phtml?type=sales");
       if (onMarketPlace){
           await displaySavedItems();
       }
       else
       {
           await checkForHaggleWin();
       }
   }

   //Gets the saved items
   const getSavedItems = async ()=>{
       const items = await GM.getValue(dataStorage, "[]");
       return JSON.parse(items);
   }

   //Get forever save amount
   const getForeverProfit = async()=>{
       var currForeverProfit = await GM.getValue(foreverProfit);
       if (!currForeverProfit){
           return 0;
       }
       else
       {
           return currForeverProfit;
       }
   }

   const updateForeverProfit = async(profit)=>
   {
       var currForeverProfit = await getForeverProfit();
       var newForeverProfit = currForeverProfit + profit;
       await GM.setValue(foreverProfit, newForeverProfit);

   }


   //Clears out all of the items saved
   const clearItems = () => {
       GM.setValue(dataStorage, "[]");
       GM.setValue(idSave, 0);
   }

   //Confirmation for clearing the data
   const confirmClear = () =>{
       var confirm = window.confirm("Are you sure you want to clear out all your restock history?");

       if (confirm){
           clearItems();
           refreshHistory();
       }
       return confirm;
   }


   await actBasedOnLocation();


})().then();


