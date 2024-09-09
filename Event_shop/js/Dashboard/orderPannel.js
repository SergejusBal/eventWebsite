

async function showOrderPannel(){ 
    document.getElementById("control-container").innerHTML = "";

    const control_container =  document.getElementById("control-container");
    control_container.className = "control-container";  
     
    const eventListPannel = await createOrderListPannel();
  
    control_container.appendChild(eventListPannel);
  

}


async function createOrderListPannel(){
    const eventListPannel = document.createElement("div");
    eventListPannel.className = "eventListPannel";
    eventListPannel.id = "orderListPannelID";

    const filterDiv =  createOrderListFilter();
    eventListPannel.appendChild(filterDiv);

    const orderListDiv = await createOrderList(0,10);   
    eventListPannel.appendChild(orderListDiv); 

    return eventListPannel;
}

function createOrderListFilter(){

    const controlDiv = document.createElement("div");
    controlDiv.className = "cardDiv";
    controlDiv.style.display = "flex";
    controlDiv.style.alignItems = "flex-end";  

    const filterDiv = document.createElement("div"); 
    filterDiv.style.marginLeft = "auto";
    

        const filterLabel = document.createElement("label");
        filterLabel.textContent = "Payment Status: "
        filterLabel.style.color = "#556790";
        filterLabel.style.fontSize = "20px";
        filterLabel.style.fontWeight = "bold";
        

        const filterInput = document.createElement("input");
        filterInput.className = "customImput";    
        filterInput.id = "filterImput";       
       

        const applyFilter = document.createElement("Button");
        applyFilter.textContent = "Apply Filter";
        applyFilter.onclick = async function() {
            document.getElementById("hiddenfilterImput").value = document.getElementById("filterImput").value
            showOrderPannel();
        };           
        

        filterDiv.appendChild(filterLabel);
        filterDiv.appendChild(filterInput);
        filterDiv.appendChild(applyFilter);

   
    controlDiv.appendChild(filterDiv); 

    return controlDiv;
}


async function createOrderList(offset, limit){

    const eventList = document.createElement("div");
    eventList.id = "eventList";
    eventList.style.width = "100%";
    eventList.style.display = "flex";
    eventList.style.flexDirection = "column";
    eventList.style.alignItems="center";   

   let eventData = await getAllOrders(offset, limit);

        if (!Array.isArray(eventData) || eventData.length === 0) return;

        for (const eventDatapoint of eventData)  { //foreach without landa original: array.forEach((element) => {));
        let event = await createOrderCardForDashBoard(eventDatapoint);
        eventList.appendChild(event);       

    };

    return eventList;

}

async function createOrderCardForDashBoard(eventDatapoint){

    const orderCard= document.createElement("div"); 
    orderCard.className ="cardDiv";

    const infoDiv = document.createElement("div");
    infoDiv.className = "cardDivInfo";   

        const nameDiv = document.createElement("div");
        nameDiv.style.textAlign = "Left";        
        nameDiv.style.width = "90%";

            const name = document.createElement("h1");
            name.textContent = "Order ID : " + eventDatapoint.id; 
            
            nameDiv.appendChild(name);

        infoDiv.appendChild(nameDiv);

        const customerInfo = document.createElement("div");
        customerInfo.className = "orderInfoPannel";  

            const customerName = document.createElement("label");
            customerName.textContent = "Customer name: " +eventDatapoint.customerName;

            const customerEmail = document.createElement("label");
            customerEmail.textContent = "Customer email: " + eventDatapoint.customerEmail;

            const customerAddress = document.createElement("label");
            customerAddress.textContent = "Customer address: " + eventDatapoint.customerAddress;

            const usedPromoCoded = document.createElement("label");
            usedPromoCoded.textContent = "Used discount code: " + eventDatapoint.promoCode;

            const paymentStatus = document.createElement("label");
            paymentStatus.textContent = "Order status: " + eventDatapoint.orderStatus;
            paymentStatus.id = "paymentStatus" + eventDatapoint.id;
            if(eventDatapoint.orderStatus == "Confirmed") paymentStatus.style.color = "#34D058";

            customerInfo.appendChild(customerName);
            customerInfo.appendChild(customerEmail);
            customerInfo.appendChild(customerAddress);
            customerInfo.appendChild(usedPromoCoded);
            customerInfo.appendChild(paymentStatus);
        
        infoDiv.appendChild(customerInfo);  

        const cartDiv = document.createElement("div");
        cartDiv.style.textAlign = "justify";        
        cartDiv.style.width = "100%";
        cartDiv.style.display = "flex";

            const cart =  await createCart(eventDatapoint.orderCartJsonString, eventDatapoint.promoCode);   
            cart.style.width = "100%";
            cartDiv.appendChild(cart);

        infoDiv.appendChild(cartDiv);  

        const buttonDiv = document.createElement("div");        
        buttonDiv.style.display = "flex";
        buttonDiv.style.width = "80%";
        buttonDiv.style.flexDirection = "row";
        buttonDiv.style.justifyContent = "flex-end";
        buttonDiv.style.padding = "30px"; 

        const refundButton = document.createElement("Button");        
        refundButton.textContent = "Refund";
        refundButton.style.backgroundColor = "#8B0000"; 
        refundButton.onclick = async function() {
            if (confirm("Are you sure you want to Refund?")) {
                refund(eventDatapoint.id);
                document.getElementById("paymentStatus" + eventDatapoint.id).textContent = "Order status: Refunded";
                document.getElementById("paymentStatus" + eventDatapoint.id).style.color = "#ff0000";
                alert("Order Refunded!");}
                else{
                    alert("Cancelled!");
                }
            
        };           
        buttonDiv.appendChild(refundButton);

        const deleteButton = document.createElement("Button");        
        deleteButton.textContent = "Delete";
        deleteButton.style.backgroundColor = "#8B0000"; 
        deleteButton.onclick = async function() {
            if (confirm("Are you sure you want to set for deletion?")) {
                modifyPaymentStatus("Marked for deletion", eventDatapoint.id)
                document.getElementById("paymentStatus" + eventDatapoint.id).textContent = "Order status: Marked for deletion";
                document.getElementById("paymentStatus" + eventDatapoint.id).style.color = "#ff0000";
                alert("Order marked for deletion!");}
            else{
                alert("Cancelled!");
            }
            
        };           
        buttonDiv.appendChild(deleteButton);


        const calcelButton = document.createElement("Button");        
        calcelButton.textContent = "Cancel";
        calcelButton.onclick = async function() {
            if (confirm("Are you sure you want to cancel order?")) {
                modifyPaymentStatus("Cancelled", eventDatapoint.id)
                document.getElementById("paymentStatus" + eventDatapoint.id).textContent = "Order status: Cancelled";
                document.getElementById("paymentStatus" + eventDatapoint.id).style.color = "#ff0000";
                alert("Order marked for deletion!");}
            else{
                alert("Cancelled!");
            }

        };           
        buttonDiv.appendChild(calcelButton);
        
        const confirmButton = document.createElement("Button"); 
        confirmButton.textContent = "Confirm"; 
        confirmButton.style.backgroundColor = "#006400"; 

        confirmButton.onclick = async function() {
            if (confirm("Are you sure you want to confirm order?")) {
                modifyPaymentStatus("Confirmed", eventDatapoint.id)
                document.getElementById("paymentStatus" + eventDatapoint.id).textContent = "Order status: Confirmed";
                document.getElementById("paymentStatus" + eventDatapoint.id).style.color = "#34D058";
                alert("Order marked for deletion!");}
            else{
                alert("Cancelled!");
            }
            };            
        buttonDiv.appendChild(confirmButton);

        
        infoDiv.appendChild(buttonDiv);       

    
     orderCard.appendChild(infoDiv);
    
    return orderCard;

}

async function createCart(orderCartJsonString, promoCode){   

    let tempCart = orderCartJsonString ? new Map(JSON.parse(orderCartJsonString)) : new Map(); 

        const cartlist= document.createElement("div");
        cartlist.style.width = "100%";
        cartlist.style.display = "flex";
        cartlist.style.flexDirection = "column";
        cartlist.style.alignItems="center"; 

        const table = document.createElement('table');
        table.className = "event-table";

        createEventCartTableHeader(table);            

        createEventCartTable(table, tempCart);

        await createEventCartTableRowLastRow(table, orderCartJsonString,promoCode);
           

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

        cell4 = row.insertCell(4);
        cell4.style.width = "7%";
        cell4.style.textAlign = 'right';              
        cell4.textContent = eventData.quantity || '0';


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

async function createEventCartTableRowLastRow(table, orderCartJsonString, promoCode){

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
    cell5.style.textAlign = 'right'
    let totalprice = await getTotalPrice(orderCartJsonString, promoCode);
    cell5.textContent = totalprice.toFixed(2) + " €";  
    cell5.style.fontWeight = 'bold';   
    
    return row;
   
}

async function getTotalPrice(orderCartJsonString, promoCode) {

    let tempCart = orderCartJsonString ? new Map(JSON.parse(orderCartJsonString)) : new Map(); 

    let totalPrice = 0;

    tempCart.forEach((product) => {     
      totalPrice += product.price * product.quantity;       
    });

    let discountValue = await getPromoValue(promoCode);
    
    totalPrice = totalPrice * discountValue;

    return totalPrice;
}



async function getAllOrders(offset, limit){
    const token = getCookie("JWT");   
    
    const paymentStatus = document.getElementById("hiddenfilterImput").value;

    if (!token) {        
        window.location.href = "index.html";
        return;
    }   
    try{
        let response = await fetch(url + "/order/all?offset=" + offset + "&limit=" + limit + "&paymentStatus=" + paymentStatus, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': token
            },                                 
        });

        if (response.status == 401){
            return false;
        }

        if (response.status == 200){
            return response.json();
        }         

        return [];  
        
    }    
    catch(error){
        return false;

    }
    
}

async function modifyPaymentStatus(status,id) {   
    let jwtToken = getCookie("JWT");

    try{   
        let response = await fetch(url + "/order/modify/" + status + "/" + id, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json', 
                'Authorization': jwtToken            
            },
            body: JSON.stringify({        
            }),        
        })

        if (response.status == 500){        
            return;
        }
        if (response.status == 401){            
            return;
        } 
        if (response.status == 400){           
            return;
        }
        if (response.status == 200) {       
            return;
        }  

    }    
    catch(error){
        console.error('Error:', error);
    }    
    
}

async function refund(id) {   
    let jwtToken = getCookie("JWT");

    try{   
        let response = await fetch(url + "/stripe/refund/" + id, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json', 
                'Authorization': jwtToken            
            },                   
        })

        if (response.status == 500){        
            return;
        }
        if (response.status == 401){            
            return;
        } 
        if (response.status == 400){           
            return;
        }
        if (response.status == 200) {       
            return;
        }  

    }    
    catch(error){
        console.error('Error:', error);
    }    
    
}

async function getPromoValue(code) {   

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