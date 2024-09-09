
async function showEventsPannel(){
    document.getElementById("control-container").innerHTML = "";
    
    const control_container =  document.getElementById("control-container");
    control_container.className = "control-container";

    
    const controlPannel =  createEventControlPannel();   

    const eventListPannel = await createEventListPannel();

    control_container.appendChild(controlPannel);
    control_container.appendChild(eventListPannel);

}


function createEventControlPannel(){
    const controlPannel = document.createElement("div");
    controlPannel.className = "controlPannel";
    controlPannel.id = "controlPannel";
    controlPannel.style.display = "none";

    const header = document.createElement("h1");
    header.textContent = "Create Meniu";
    header.id = "header";

    const nameDiv = document.createElement("div");

        const nameLabel = document.createElement("label");
        nameLabel.textContent = "Event name:";
        
        const nameTextArea = document.createElement("input");
        nameTextArea.placeholder = "Enter event name here";
        nameTextArea.id = "eventName";

        nameDiv.appendChild(nameLabel);
        nameDiv.appendChild(nameTextArea);
    
    const descriptionDiv = document.createElement("div");

        const descriptionLabel = document.createElement("label");
        descriptionLabel.textContent = "Event description:";
        
        const descriptionTextArea = document.createElement("textarea");
        descriptionTextArea.placeholder = "Enter event description here";
        descriptionTextArea.id = "eventDescription";
        descriptionTextArea.style.height = "100px";

        descriptionDiv.appendChild(descriptionLabel);
        descriptionDiv.appendChild(descriptionTextArea);

       
    const priceDiv = document.createElement("div");

        const priceLabel = document.createElement("label");
        priceLabel.textContent = "Event price:";

        const priceInput = document.createElement("input");
        priceInput.type = "number"; 
        priceInput.placeholder = "Enter event price here";
        priceInput.id = "eventPrice";

        priceDiv.appendChild(priceLabel);
        priceDiv.appendChild(priceInput);


    const categoryDiv = document.createElement("div");

        const categoryLabel = document.createElement("label");
        categoryLabel.textContent = "Event category:";

        const categoryInput = document.createElement("input");
        categoryInput.placeholder = "Enter event category here";
        categoryInput.id = "eventCategory";

        categoryDiv.appendChild(categoryLabel);
        categoryDiv.appendChild(categoryInput);


    const dateDiv = document.createElement("div");

        const dateLabel = document.createElement("label");
        dateLabel.textContent = "Event date:";

        const dateInput = document.createElement("input");
        dateInput.type = "datetime-local";   
        dateInput.id = "eventDate";     

        dateDiv.appendChild(dateLabel);
        dateDiv.appendChild(dateInput); 

    const imgUploadDiv = document.createElement("div");
    imgUploadDiv.style.flexDirection = 'row';  
    
        const imageInput = document.createElement('input');
        imageInput.type = 'file';
        imageInput.id = 'imageInput';
        imageInput.accept = 'image/*';
        imageInput.style.display = 'none';

        const hiddenInput = document.createElement('input');
        hiddenInput.type = 'hidden';
        hiddenInput.id = 'hiddenInput';

        const hiddenIDInput = document.createElement('input');
        hiddenIDInput.type = 'hidden';
        hiddenIDInput.id = 'hiddenIDInput';
      
        const uploadButton = document.createElement('button');        
        uploadButton.style.marginLeft = "10%";
        uploadButton.textContent = "Upload image";        ;
        uploadButton.style.width = "150px";
        uploadButton.style.height = "40px";
        uploadButton.onclick = async function() {
            uploadButtonClicked();
        };

        const imgLabel = document.createElement("label");
        imgLabel.id = "imgLabel";
        imgLabel.textContent = "No file selected.";
        imgLabel.style.marginTop = "8px";
        imgLabel.style.marginLeft = "20px";
      
        imgUploadDiv.appendChild(hiddenIDInput);
        imgUploadDiv.appendChild(imageInput);
        imgUploadDiv.appendChild(hiddenInput);
        imgUploadDiv.appendChild(uploadButton);
        imgUploadDiv.appendChild(imgLabel);

    const buttonDiv = document.createElement("div"); 
    buttonDiv.style.display = "flex"; 
    buttonDiv.style.flexDirection = 'row';   
    buttonDiv.style.justifyContent = "flex-end";
    buttonDiv.style.gap = "5px";    

        const createEvent = document.createElement('button');
        createEvent.id = "createEvent";
        createEvent.textContent = "Create Event";
        createEvent.style.width = "150px";
        createEvent.style.height = "40px";
        createEvent.style.marginRight = "10%";       
        createEvent.onclick = async function() {
            await createEventCliked();
        };

        const close = document.createElement('button');
        close.textContent = "close";
        close.style.width = "150px";
        close.style.height = "40px"; 
        close.onclick = async function() {
            document.getElementById("controlPannel").style.display = "none";
            clearEventData();
        };
        
    
        buttonDiv.appendChild(close);
        buttonDiv.appendChild(createEvent);

    const messageDiv = document.createElement("div");

        const messageLabel = document.createElement("label");
        messageLabel.textContent = ""; 
        messageLabel.id  = "eventMessage";
      
        messageDiv.appendChild(messageLabel); 

    
    controlPannel.appendChild(header);
    controlPannel.appendChild(nameDiv);
    controlPannel.appendChild(descriptionDiv);
    controlPannel.appendChild(priceDiv);
    controlPannel.appendChild(categoryDiv);    
    controlPannel.appendChild(imgUploadDiv);
    controlPannel.appendChild(dateDiv);
    controlPannel.appendChild(buttonDiv);
    controlPannel.appendChild(messageDiv);

    return controlPannel;
}

async function createEventListPannel(){
    const eventListPannel = document.createElement("div");
    eventListPannel.className = "eventListPannel";
    eventListPannel.id = "eventListPannelID";

    const filterDiv = createEventListFilter();
    const eventListDiv = await createEventList(0,10);

    eventListPannel.appendChild(filterDiv);
    eventListPannel.appendChild(eventListDiv); 

    return eventListPannel;
}

function createEventListFilter(){

    const controlDiv = document.createElement("div");
    controlDiv.className = "cardDiv";
    

    const createButton = document.createElement("Button");
    createButton.textContent = "Create Event";
    createButton.onclick = async function() {
        document.getElementById("controlPannel").style.display = "flex";
        document.getElementById("header").textContent = "Create Meniu";
        document.getElementById("createEvent").textContent = "Create Event";
        clearEventData();
    };

    const filterDiv = document.createElement("div"); 

        const filterLabel = document.createElement("label");
        filterLabel.textContent = "Category filter: "
        filterLabel.style.color = "#556790";
        filterLabel.style.fontSize = "20px";
        filterLabel.style.fontWeight = "bold";
        

        const filterInput = document.createElement("input");
        filterInput.className = "customImput";        
        filterInput.id = "categoryFilter";

        const applyFilter = document.createElement("Button");
        applyFilter.textContent = "Apply Filter";        
        applyFilter.onclick = async function() {
            document.getElementById("hiddenfilterImput").value = document.getElementById("categoryFilter").value
            showEventsPannel();
        };           

        filterDiv.appendChild(filterLabel);
        filterDiv.appendChild(filterInput);
        filterDiv.appendChild(applyFilter);

    controlDiv.appendChild(createButton);
    controlDiv.appendChild(filterDiv); 

    return controlDiv;
}

async function createEventList(offset, limit){

    const eventList = document.createElement("div");
    eventList.id = "eventList";
    eventList.style.width = "100%";
    eventList.style.display = "flex";
    eventList.style.flexDirection = "column";
    eventList.style.alignItems="center";   

    let eventData = await getEvens(offset, limit);

        
    if (!Array.isArray(eventData) || eventData.length === 0) return;

    eventData.forEach(eventDatapoint => {
        let event = createEventCardForDashBoard(eventDatapoint);
        eventList.appendChild(event);       

    });

    return eventList;

}

function createEventCardForDashBoard(eventDatapoint){

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
        IDcategoryAndDateDiv.className = "cardDiv";

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

        const editButtonDiv = document.createElement("div");        
        editButtonDiv.style.display = "flex";
        editButtonDiv.style.width = "90%";
        editButtonDiv.style.flexDirection = "row";
        editButtonDiv.style.justifyContent = "flex-end";
        editButtonDiv.style.padding = "10px"; 
        
            const editButton = document.createElement("Button");
               
            editButton.textContent = "Edit Button";

            editButtonDiv.appendChild(editButton);
            editButton.onclick = async function() {
                document.getElementById("controlPannel").style.display = "flex";
                document.getElementById("header").textContent = "Edit Meniu";
                document.getElementById("createEvent").textContent = "Edit Event";
                document.getElementById("hiddenIDInput").value = eventDatapoint.id;
                fillEventDataTable(eventDatapoint);
            };

        infoDiv.appendChild(editButtonDiv);

    eventCard.appendChild(imageDiv);
    eventCard.appendChild(infoDiv);
    
    return eventCard;

}


async function uploadButtonClicked(){
    const apiKey = 'bcbd1c0361b512b67b6c337ca3c6d433';
    await selectImage();

    const imageInput = document.getElementById('imageInput'); 
    console.log("test");
    const imageFile = imageInput.files[0];

    if (!imageFile) {
        console.error('No file selected');
        return;
    }

      const formData = new FormData();
      formData.append('image', imageFile);
      
      const reader = new FileReader();

      reader.onloadend = async function() {      

        const response = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
          method: 'POST',
          body: formData
        });

        const data = await response.json();

        if (data.success) {         
          document.getElementById("hiddenInput").value = data.data.url;
          console.log(data.data.url);
          document.getElementById("imgLabel").textContent = "Image uploaded.";        
        } else {
          console.error('Error uploading image:', data);
        }
      };

      reader.readAsDataURL(imageFile); 

}


function selectImage() {
    return new Promise((resolve, reject) => {
        const imageInput = document.getElementById('imageInput');

        // Listen for the change event, which will fire when the user selects a file
        imageInput.onchange = () => {
            if (imageInput.files.length > 0) {
                resolve();  // Resolve the promise when a file is selected
            } else {
                reject();  // Reject the promise if no file is selected
            }
        };

        // Trigger the file input click
        imageInput.click();
    });
}

async function createEventCliked(){

    let eventData = fillEventData();
    if(eventData.id){
        await sendEventtoDataBaseToUpdate(eventData);
    }
    else {
        await sendEventtoDataBase(eventData);
    }
    clearEventData();
}

function fillEventData(){
    let event = {};
    
    event.name = document.getElementById("eventName").value;
    event.description = document.getElementById("eventDescription").value;
    event.price = document.getElementById("eventPrice").value;
    event.category = document.getElementById("eventCategory").value;
    event.imageUrl = document.getElementById("hiddenInput").value;
    event.date = (document.getElementById("eventDate").value + ":00").replace("T"," ");
    event.id = document.getElementById("hiddenIDInput").value ? document.getElementById("hiddenIDInput").value : 0;
    return event;

}

function fillEventDataTable(eventDatapoint){
    document.getElementById("eventName").value = eventDatapoint.name;
    document.getElementById("eventDescription").value = eventDatapoint.description;
    document.getElementById("eventPrice").value = eventDatapoint.price;
    document.getElementById("eventCategory").value = eventDatapoint.category;
    document.getElementById("hiddenInput").value = eventDatapoint.imageUrl;
    document.getElementById("eventDate").value = eventDatapoint.date;    
    document.getElementById("imgLabel").innerHTML = "Image uploaded.";

}

function clearEventData(){    
    document.getElementById("eventName").value = "";
    document.getElementById("eventDescription").value = "";
    document.getElementById("eventPrice").value = "";
    document.getElementById("eventCategory").value = "";
    document.getElementById("hiddenInput").value = "";
    document.getElementById("eventDate").value = "";
    document.getElementById('imageInput').value = ""; 
    document.getElementById("imgLabel").innerHTML = "No file selected."; 
    document.getElementById("hiddenIDInput").value = "";
}


async function sendEventtoDataBase(eventData) {   
    let jwtToken = getCookie("JWT");

    try{   
        let response = await fetch(url + '/event/new', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json', 
                'Authorization': jwtToken            
            },
            body: JSON.stringify({
            "name":eventData.name,           
            "description":eventData.description,
            "price":eventData.price,
            "category":eventData.category,
            "date":eventData.date,
            "imageUrl": eventData.imageUrl ? eventData.imageUrl : "https://i.ibb.co/qWNMttz/test-361512-640.webp"
            }),        
        })

        if (response.status == 500){
            document.getElementById("eventMessage").innerHTML = "Database connection failed";
            return;
        }
        if (response.status == 401){
            document.getElementById("eventMessage").innerHTML = "No authorization";
            return;
        } 
        if (response.status == 400){
            document.getElementById("eventMessage").innerHTML = "Invalid data";
            return;
        }
        if (response.status == 200) {
            document.getElementById("eventMessage").innerHTML = "Event was successfully added";
            return;
        }  

    }    
    catch(error){
        console.error('Error:', error);
    }    
    
}

async function sendEventtoDataBaseToUpdate(eventData) {   
    let jwtToken = getCookie("JWT");

    try{   
        let response = await fetch(url + '/event/new/' + eventData.id, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json', 
                'Authorization': jwtToken            
            },
            body: JSON.stringify({
            "name":eventData.name,           
            "description":eventData.description,
            "price":eventData.price,
            "category":eventData.category,
            "date":eventData.date,
            "imageUrl": eventData.imageUrl ? eventData.imageUrl : "https://i.ibb.co/qWNMttz/test-361512-640.webp"
            }),        
        })

        if (response.status == 500){
            document.getElementById("eventMessage").innerHTML = "Database connection failed";
            return;
        }
        if (response.status == 401){
            document.getElementById("eventMessage").innerHTML = "No authorization";
            return;
        } 
        if (response.status == 400){
            document.getElementById("eventMessage").innerHTML = "Invalid data";
            return;
        }
        if (response.status == 200) {
            document.getElementById("eventMessage").innerHTML = "Event was successfully added";
            return;
        }  

    }    
    catch(error){
        console.error('Error:', error);
    }    
    
}

async function getEvens(offset, limit) {    
    
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

