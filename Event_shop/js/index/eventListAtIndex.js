async function showEventsList(){
    document.getElementById("content-container").innerHTML = "";
    
    const contentContainer = document.getElementById("content-container");     
    
    const filterDiv = createEventListFilter();   
    contentContainer.appendChild(filterDiv);

    const eventDiv = await createEventList(0,10); 
    eventDiv.id = "eventDiv";

    contentContainer.appendChild(eventDiv);    

};

async function createEventList(offset, limit){

    const eventList = document.createElement("div");

    eventList.id = "eventList";
    eventList.style.width = "100%";
    eventList.style.display = "flex";
    eventList.style.flexDirection = "column";
    eventList.style.alignItems="center";   

    let eventData = await getEvents(offset, limit);

        if(eventData.length === 0) return;

    eventData.forEach(eventDatapoint => {
        let event = createEventCard(eventDatapoint);
        eventList.appendChild(event);       

    });

    return eventList;
}

  
function createEventListFilter(){

    const controlDiv = document.createElement("div");
    controlDiv.className = "cardDiv"; 
    controlDiv.style.marginTop = "200px";

    const filterDiv = document.createElement("div"); 
    filterDiv.style.marginLeft = "10%";
    filterDiv.style.width = "100%";
    

        const filterLabel = document.createElement("label");
        filterLabel.textContent = "Category filter: "
        filterLabel.style.color = "#ffffff";
        filterLabel.style.fontSize = "26px";
        filterLabel.style.fontWeight = "bold";
        filterLabel.style.marginRight = "1%";

        const filterInput = document.createElement("input");
        filterInput.className = "customImput"; 
        filterInput.id = "categoryFilter";
        filterInput.style.marginRight = "1%";

        const applyFilter = document.createElement("Button");
        applyFilter.textContent = "Apply Filter";
        applyFilter.onclick = async function() {
            document.getElementById("hiddenfilterImput").value = document.getElementById("categoryFilter").value
            showEventsList();
        }; 

        filterDiv.appendChild(filterLabel);
        filterDiv.appendChild(filterInput);
        filterDiv.appendChild(applyFilter);
    
    controlDiv.appendChild(filterDiv); 

    return controlDiv;
}


function createEventCard(eventDatapoint){

    const eventCard= document.createElement("div"); 
    eventCard.className ="cardDiv";

    const imageDiv = document.createElement("div"); 
        const img = document.createElement("img");
        img.src = eventDatapoint.imageUrl;
        
        imageDiv.append(img); 

    const infoDiv = document.createElement("div");
    infoDiv.className = "cardDivInfo";
    infoDiv.style.padding = "10px"

        const nameDiv = document.createElement("div");
        nameDiv.style.textAlign = "Left";        
        nameDiv.style.width = "90%";

            const name = document.createElement("h1");
            name.textContent = eventDatapoint.name; 
            
            nameDiv.appendChild(name);

        infoDiv.appendChild(nameDiv);

        const IDcategoryAndDateDiv = document.createElement("div");
        IDcategoryAndDateDiv.style.display = 'flex';
        IDcategoryAndDateDiv.style.flexDirection = 'row';
        IDcategoryAndDateDiv.style.justifyContent = 'space-between';
        IDcategoryAndDateDiv.style.padding = "20px";
        IDcategoryAndDateDiv.style.width = "90%";

            const id = document.createElement("label");
            id.textContent = "ID: " +eventDatapoint.id;

            const category = document.createElement("label");
            category.textContent = "Category: " + eventDatapoint.category;

            const date = document.createElement("label");
            date.textContent = eventDatapoint.date;

            IDcategoryAndDateDiv.appendChild(id);
            IDcategoryAndDateDiv.appendChild(category);
            IDcategoryAndDateDiv.appendChild(date);
        
        infoDiv.appendChild(IDcategoryAndDateDiv);        

        const descriptionDiv = document.createElement("div");
        descriptionDiv.style.textAlign = "justify";        
        descriptionDiv.style.width = "90%";

            const description = document.createElement("label");   
            description.textContent = eventDatapoint.description;
            descriptionDiv.appendChild(description);

        infoDiv.appendChild(descriptionDiv);

        const priceDiv = document.createElement("div");        
        priceDiv.style.display = "flex";
        priceDiv.style.width = "90%";
        priceDiv.style.flexDirection = "row";
        priceDiv.style.justifyContent = "flex-end";
        priceDiv.style.padding = "10px";    

            const price = document.createElement("label");
            const formattedPrice = eventDatapoint.price.toFixed(2);   
            price.textContent =  "Price: " + formattedPrice + " €";
            price.style.color = "#34d058";
            price.style.fontWeight = "Bold"
            priceDiv.appendChild(price);
            

        infoDiv.appendChild(priceDiv);

        const addToCartDiv = document.createElement("div");        
        addToCartDiv.style.display = "flex";
        addToCartDiv.style.width = "90%";
        addToCartDiv.style.flexDirection = "row";
        addToCartDiv.style.justifyContent = "flex-end";
        addToCartDiv.style.padding = "10px"; 

            const openEventPageButton = document.createElement("Button");
            openEventPageButton.textContent = "Open";
            openEventPageButton.style.marginRight = "20px";
            openEventPageButton.style.width = "120px";
            openEventPageButton.onclick = async function() {
                window.open("eventPage.html?id=" + eventDatapoint.id, "_blank");
            };

            addToCartDiv.appendChild(openEventPageButton);
        
            const addToCartButton = document.createElement("Button");
               
            addToCartButton.textContent = "Add to cart";           
            addToCartButton.onclick = async function() {
                await addToCart(eventDatapoint);
                console.log(eventDatapoint);
            };

            addToCartDiv.appendChild(addToCartButton);
        infoDiv.appendChild(addToCartDiv);

    eventCard.appendChild(imageDiv);
    eventCard.appendChild(infoDiv);
    
    return eventCard;

}


async function addToCart(eventDatapoint) {
      
    let cart = {};
    cart.id = eventDatapoint.id;
    cart.name = eventDatapoint.name;
    cart.price = eventDatapoint.price;

    let jsonStringItemCart = await getCookie("EventCart"); 
    console.log(jsonStringItemCart);

    let tempCart = jsonStringItemCart ? new Map(JSON.parse(jsonStringItemCart)) : new Map(); 

    console.log(tempCart);


  
    if (!tempCart.has(cart.id)) {
        cart.quantity = 1;
        tempCart.set(cart.id, cart);  
    } else {       
        let eventData = tempCart.get(cart.id);
        eventData.quantity++;
        tempCart.set(cart.id, eventData); 
    }

    console.log(tempCart);
    await setCookie("EventCart", JSON.stringify(Array.from(tempCart.entries())), 7);   
}


async function getEvents(offset, limit) {     

    const category = document.getElementById("hiddenfilterImput").value;

    try{
        let response = await fetch(url + '/event/getAll'+"?offset=" + offset +  "&limit=" + limit, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',               
            },  
            body: JSON.stringify({
                "category": category,   
                                
                }),

        })        

        if (response.status == 204){                  
           return [];
        }
        else if (response.status == 200) {
            return await response.json();
        } 

    
    } catch (error) {
        console.error('Error:', error);
    }   
    
}