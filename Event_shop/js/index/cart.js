var url = "http://localhost:8080";

document.getElementById("userIcon").addEventListener("click", async function(event) {
    window.location.href = 'login.html';
});

document.getElementById("cartIcon").addEventListener("click", async function(event) {
    window.location.href = 'cart.html';
});

document.addEventListener('DOMContentLoaded',  async function() {    
    showCart();
 });

 function showCart(){
    const contentContainer = document.getElementById("content-container"); 

    const cartDiv = createCartPannel(); 
    contentContainer.appendChild(cartDiv);    
    
    
 }

 function createCartPannel(){

    const cartPannel = document.createElement("div");
    cartPannel.className = "cartDiv";
    

    const header = document.createElement("h1");
    header.textContent = "Check Out";

    const bottomPannelDiv = createBottomPannel();  
    const cartlist = createCart();  

    cartPannel.appendChild(header); 
    cartPannel.appendChild(cartlist);
    cartPannel.appendChild(bottomPannelDiv);

    return cartPannel;

 }

 function createBottomPannel(){

    const bottomPannelDiv = document.createElement("div");   
    bottomPannelDiv.style.marginTop = "50px";
    bottomPannelDiv.style.display = "flex";
    bottomPannelDiv.style.flexDirection = "row";
    bottomPannelDiv.style.width = "80%";
    
    const userinfo = createUserInfoPannel(); 
    userinfo.style.width = "70%"; 
    const buttonPannel = createButtonPannel();
    buttonPannel.style.width = "30%"; 

    bottomPannelDiv.appendChild(userinfo);    
    bottomPannelDiv.appendChild(buttonPannel);

    return bottomPannelDiv;

 }

 function createButtonPannel(){

    const buttonPannelDiv= document.createElement("div");
    buttonPannelDiv.className = "userInfoDiv";

    const promoDiv = document.createElement("div");

        const promoLabel = document.createElement("label");
        promoLabel.textContent = "Enter discount code:";
        
        const promoInput = document.createElement("input");
        promoInput.placeholder = "promo code";
        promoInput.id = "promo";

        const hiddenIDInput = document.createElement("input");
        hiddenIDInput.type = 'hidden';
        hiddenIDInput.textContent = "1";
        hiddenIDInput.id = "hiddenPromo";

        const realPromoInput = document.createElement("input");
        realPromoInput.type = 'hidden';
        realPromoInput.textContent = "1";
        realPromoInput.id = "realPromoInput";

        promoDiv.appendChild(promoLabel);
        promoDiv.appendChild(promoInput);
        promoDiv.appendChild(hiddenIDInput);
        promoDiv.appendChild(realPromoInput);


    buttonPannelDiv.appendChild(promoDiv);

    const buttonDiv = document.createElement("div"); 
    buttonDiv.style.display = "flex"; 
    buttonDiv.style.flexDirection = 'column';   
    buttonDiv.style.justifyContent = "flex-end";
    buttonDiv.style.gap = "10px";    
    buttonDiv.style.alignItems = "flex-end";
    
        const applyPromo = document.createElement('button');
        applyPromo.id = "applyPromo";
        applyPromo.textContent = "Apply discount";
        applyPromo.style.width = "150px";
        applyPromo.style.height = "40px";
        applyPromo.style.marginRight = "10%";

        applyPromo.onclick = async function() {
            let promocode = document.getElementById("promo").value;
            document.getElementById("realPromoInput").value = promocode;   
          //  document.getElementById("realPromoInput").textContent = promocode;            
            document.getElementById("hiddenPromo").textContent =  await getPromoValue();
            document.getElementById("totalPriceCell").textContent = (await getTotalPrice()).toFixed(2) + " €";                
        };

        const checkOut = document.createElement('button');
        checkOut.textContent = "Check Out";
        checkOut.style.width = "150px";
        checkOut.style.height = "40px"; 
        
        checkOut.style.marginTop = "100px"
        checkOut.onclick = async function() {
            await stripeCheckOut();
        };
        
        buttonDiv.appendChild(applyPromo);  
        buttonDiv.appendChild(checkOut);        
            
    buttonPannelDiv.appendChild(buttonDiv);


    return buttonPannelDiv;
 }


 function createUserInfoPannel(){

    const userInfoDiv= document.createElement("div");
    userInfoDiv.className = "userInfoDiv";   

    const nameDiv = document.createElement("div");

        const nameLabel = document.createElement("label");
        nameLabel.textContent = "Enter name:";
        
        const nameTextArea = document.createElement("input");
        nameTextArea.placeholder = "Enter yuor name here";
        nameTextArea.id = "customerName";

        nameDiv.appendChild(nameLabel);
        nameDiv.appendChild(nameTextArea);

    userInfoDiv.appendChild(nameDiv);
    
    
    const emailDiv = document.createElement("div");

        const emailLabel = document.createElement("label");
        emailLabel.textContent = "Enter E-mail:";
        
        const mailTextArea = document.createElement("input");
        mailTextArea.placeholder = "Enter email here";
        mailTextArea.id = "customerMail";

        emailDiv.appendChild(emailLabel);
        emailDiv.appendChild(mailTextArea);
    
    userInfoDiv.appendChild(emailDiv);

       
    const adressDiv = document.createElement("div");

        const addressLabel = document.createElement("label");
        addressLabel.textContent = "Enter Adress:";

        const addressImput = document.createElement("input");      
        addressImput.placeholder = "Enter address here";
        addressImput.id = "customerAddress";

        adressDiv.appendChild(addressLabel);
        adressDiv.appendChild(addressImput);
    
    userInfoDiv.appendChild(adressDiv);    

    
    return userInfoDiv;  

 }


 function createCart(){

    let jsonStringItemCart = getCookie("EventCart"); 
    let tempCart = jsonStringItemCart ? new Map(JSON.parse(jsonStringItemCart)) : new Map(); 


        const cartlist= document.createElement("div");
        cartlist.style.width = "80%";
        cartlist.style.display = "flex";
        cartlist.style.flexDirection = "column";
        cartlist.style.alignItems="center"; 

        const table = document.createElement('table');
        table.className = "event-table";

        createEventCartTableHeader(table);            

        createEventCartTable(table,tempCart);

        createEventCartTableRowLastRow(table);
           

    cartlist.append(table);
    
    
    return cartlist;

 }


function createEventCartTableRow(eventData, number, tableBody){

    const row = tableBody.insertRow();
    row.id = "productRow" + eventData.id;
    tableBody.className = "event-table";
   
        cell0 = row.insertCell(0);
        cell0.style.width = "3%";        
        cell0.textContent = number || '0';

        cell1 = row.insertCell(1);
        cell1.style.width = "61%"; 
        cell1.textContent = eventData.name || 'No name available';

        let cell2 = row.insertCell(2);
        cell2.style.width = "9%";
        cell2.style.textAlign = 'right';
        let taxAmount = eventData.price * 0.21;
        cell2.textContent = taxAmount.toFixed(2) || '0';

        let cell3 = row.insertCell(3);
        cell3.style.textAlign = 'right';
        cell3.style.width = "9%";
        let priceAmount = eventData.price * 0.79;
        cell3.textContent = priceAmount.toFixed(2) || '0';

  
        let cell4 = row.insertCell(4);
        cell4.style.width = "7%";        
        const cell4Div = document.createElement("div"); 
        cell4Div.style.display = "flex";
        cell4Div.style.justifyContent = "space-between";        

            const buttonDecreace = document.createElement("button");
            buttonDecreace.onclick = async function() {
                await modifyCartDecrease(eventData.id);
                let newQuantity = await getQuantity(eventData.id) ;
                let totalprice = newQuantity * eventData.price;
                document.getElementById("quantityCell" + eventData.id).textContent = newQuantity; 
                document.getElementById("totalPriceCell" + eventData.id).textContent = totalprice.toFixed(2) || '0';  
                document.getElementById("totalPriceCell").textContent = (await getTotalPrice()).toFixed(2) + " €";               
            };

            cell4Div.appendChild(buttonDecreace);
            
            const label = document.createElement("label");
            label.textContent = eventData.quantity;
            label.id = "quantityCell" + eventData.id;
            cell4Div.appendChild(label);

            const buttonIncrease = document.createElement("button");
            buttonIncrease.onclick = async function() {
                await modifyCartIncrease(eventData.id);
                let newQuantity = await getQuantity(eventData.id) ;
                let totalprice = newQuantity * eventData.price;
                document.getElementById("quantityCell" + eventData.id).textContent = newQuantity; 
                document.getElementById("totalPriceCell" + eventData.id).textContent = totalprice.toFixed(2) || '0';
                document.getElementById("totalPriceCell").textContent = (await getTotalPrice()).toFixed(2)+ " €";               
            };

            cell4Div.appendChild(buttonIncrease);

        cell4.appendChild(cell4Div);

        cell5 = row.insertCell(5);
        cell5.style.width = "11%";
        cell5.style.textAlign = 'right';
        cell5.id = "totalPriceCell" + eventData.id; 
        let totalprice = eventData.quantity * eventData.price;
        cell5.textContent = totalprice.toFixed(2) || '0';

    return row;

}

function createEventCartTable(table,tempCart){

    let number = 1;
    tempCart.forEach((eventData) => {
        const eventCartTableRow = createEventCartTableRow(eventData, number, table);
        table.appendChild(eventCartTableRow);
        number++;
    }); 

}

function createEventCartTableHeader(table){

    const tableBody = document.createElement('tbody');
    const thRow = tableBody.insertRow();

        const headers = [" ", "Name", "Tax (€)", "Price (€)", "Amount", "Total (€)"];
        headers.forEach(headerText => {
            const th = document.createElement('th');
            th.textContent = headerText; 
            thRow.appendChild(th);
        });

        table.append(tableBody);

}

async function createEventCartTableRowLastRow(table){

    const emptyRow = table.insertRow();
    const empty = ["","","","","",""];
    empty.forEach(empty => {
        const td = document.createElement('td');
        td.textContent = empty; 
        td.style.height = "30px"
        emptyRow.appendChild(td);
    });

    const row = table.insertRow();
    row.insertCell(0);
    row.insertCell(1);
    row.insertCell(2);
    row.insertCell(3);

    cell4 = row.insertCell(4);
    cell4.textContent = "Total:";
    cell4.style.textAlign = 'right'
    cell4.style.fontWeight = 'bold';

    cell5 = row.insertCell(5);
    cell5.id = "totalPriceCell"
    cell5.style.textAlign = 'right'
    let totalprice = await getTotalPrice();   

    cell5.textContent = totalprice.toFixed(2) + " €";  
    cell5.style.fontWeight = 'bold';   
    
    return row;
   
}

async function modifyCartIncrease(id) { 

    let jsonStringItemCart = await getCookie("EventCart");   

    let tempCart = jsonStringItemCart ? new Map(JSON.parse(jsonStringItemCart)) : new Map(); 
    
    
    if (tempCart.has(id)) {
        let eventData = tempCart.get(id);
        eventData.quantity++;
        tempCart.set(id, eventData); 
    } 
    
    await setCookie("EventCart", JSON.stringify(Array.from(tempCart.entries())), 7);
   
}

async function modifyCartDecrease(id) {     

    let jsonStringItemCart = await getCookie("EventCart"); 
    let tempCart = jsonStringItemCart ? new Map(JSON.parse(jsonStringItemCart)) : new Map(); 

    if(!tempCart.has(id)) return;

    if(tempCart.has(id) && tempCart.get(id).quantity == 0){
        tempCart.delete(id);
        document.getElementById("productRow" + id).style.display = "none";
    } 
    
    if (tempCart.has(id)) {
        let eventData = tempCart.get(id);
        eventData.quantity--;
        tempCart.set(id, eventData); 
    } 
    
    await setCookie("EventCart", JSON.stringify(Array.from(tempCart.entries())), 7);
   
}

async function getQuantity(id) { 

    let jsonStringItemCart = await getCookie("EventCart"); 
    let tempCart = jsonStringItemCart ? new Map(JSON.parse(jsonStringItemCart)) : new Map(); 

    if(!tempCart.has(id)) return 0;
    let product = tempCart.get(id);    

    return product.quantity;

}

async function getTotalPrice() {

    let promoModifier = document.getElementById("hiddenPromo") ? document.getElementById("hiddenPromo").textContent : "1" ;

    let jsonStringItemCart = await getCookie("EventCart"); 
    let tempCart = jsonStringItemCart ? new Map(JSON.parse(jsonStringItemCart)) : new Map(); 

    totalPrice = 0;

    tempCart.forEach((product) => {     
      totalPrice += product.price * product.quantity;       
    });
    

    return totalPrice*promoModifier;
}



async function getPromoValue() {

    let code = document.getElementById("realPromoInput").value;

    try{   
        let response = await fetch(`${url}/promo/check?code=${code}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'                                        
            }
        })

        if (response.status == 500){
          //  document.getElementById("response").innerHTML  = "Database connection failed";
            return 1;
        } 

        if (response.status == 200) {    
            return response.text();
        }  

    }    
    catch(error){       
        console.error('Error:', error);
        return 1;
    }  

}


async function stripeCheckOut(){

    let orderID = await createOrder();
    if(orderID == 0) return;

    
    // Replace with your public key
    const stripe = Stripe('pk_test_51PlENQHWGvvl25KmMUuPtb9iFyXtRJt8Xf1ttsKjNS4ryOkdvZz2FNrwr0KCNBKTQvBiCeOER6LxNUbY8KVQklkW00fZHeGmb4');
    const response = await fetch(url+"/stripe/pay", {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({          
        orderID: orderID
    })
    });

    const session = await response.json();    

    const sessionId = session.id;
    // setCookie("paymentCode", session.paymentCode,1);
    // setCookie("paymentID", session.paymentID,1);
    deleteCookie("EventCart");    
    // Redirect to Stripe Checkout
    const { error } = await stripe.redirectToCheckout({ sessionId });

    if (error) {
    console.error("Stripe Checkout error:", error.message);
    }
   
}





async function createOrder() {     

    let order = fillOrderData();

    if(!order.orderFilled) return 0;

    try{   
        let response = await fetch(url + '/order/new', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',

            },
            body: JSON.stringify({
            "customerName": order.customerName, 
            "customerEmail": order.customerEmail,
            "customerAddress": order.customerAddress,
            "orderCartJsonString": await getCookie("EventCart"),
            "promoCode": order.promoCode,                     
            }),        
        })

        if (response.status == 500){
          //  document.getElementById("response").innerHTML = await response.text();
            return 0;
        }              

        if (response.status == 400){
          //  document.getElementById("response").innerHTML = await response.text();
            return 0;
        }
        if (response.status == 200) {           
            return await response.json();
        }  

    }    
    catch(error){
        console.error('Error:', error);
    }    
    
}


function fillOrderData(){
    let order = {};
    order.customerName = document.getElementById("customerName").value;
    order.customerEmail = document.getElementById("customerMail").value;
    order.customerAddress = document.getElementById("customerAddress").value;
    order.promoCode = document.getElementById("realPromoInput").value; 

    if(!order.customerName || !order.customerEmail || !order.customerAddress || !(getCookie("EventCart"))) order.orderFilled = false;
    else order.orderFilled = true;

    return order;

}


