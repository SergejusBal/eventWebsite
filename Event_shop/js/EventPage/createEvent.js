async function addEvent(ContainderName){    
    const contentContainer = document.getElementById(ContainderName);     
    
    const eventDiv = await createEvent();     

    contentContainer.appendChild(eventDiv);    

};


async function createEvent(){

    const eventDiv = document.createElement("div");  
    eventDiv.style.width = "100%";
    eventDiv.style.display = "flex";
    eventDiv.style.flexDirection = "column";
    eventDiv.style.alignItems="center";   

    let eventDatapoint = await getOneEvent();
            
    let event = await createEventCard(eventDatapoint);
    eventDiv.appendChild(event);       
  
    return eventDiv;
}



async function createEventCard(eventDatapoint){

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

       
    eventCard.appendChild(imageDiv);
    eventCard.appendChild(infoDiv);
    
    return eventCard;

}


async function getOneEvent() {

    const pageUrl = new URL(window.location.href);
    const id = await pageUrl.searchParams.get('id');

    try{   
        let response = await fetch(url + "/event/" + id, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',                     
            },                   
        })

        if (response.status == 500){        
            return;
        }
        if (response.status == 204){            
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