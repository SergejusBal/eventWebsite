var url = "http://localhost:8080";
var windowOpened = "EventPanel";
var offset = 10;
var hasLoaded = false;

document.addEventListener('DOMContentLoaded',  async function() {    
    const authorized =  await autologin();       
    if(!authorized){ window.location.href = "index.html";}  
    showEventsPannel();
});

document.getElementById("exit").addEventListener("click", async function(event) {    
    window.location.href = "index.html";
    deleteCookie("JWT");
});

document.getElementById("eventPannel").addEventListener("click", async function(event) {
    document.getElementById("hiddenfilterImput").value = "";  
    windowOpened = "EventPanel";
    offset = 10;  
    showEventsPannel();
   
});

document.getElementById("orderPannel").addEventListener("click", async function(event) { 
    document.getElementById("hiddenfilterImput").value = "";
    windowOpened = "OrderPanel";
    offset = 10;    
    showOrderPannel()
    
});


window.addEventListener('scroll', async function() { 

    if (window.innerHeight + window.scrollY >= document.body.offsetHeight && !hasLoaded) {
        hasLoaded = true; 

        if(windowOpened == "EventPanel"){
            const eventListPannel = document.getElementById("eventListPannelID");
            const eventListDiv = await createEventList(offset, 5);
            offset +=5;            
            if(eventListDiv != null) eventListPannel.appendChild(eventListDiv); 
            hasLoaded = false;             
            } 
        else if(windowOpened == "OrderPanel"){
            const orderListPannel = document.getElementById("orderListPannelID");
            const orderListDiv = await createOrderList(offset, 5);
            offset +=5;            
            if(orderListDiv != null) orderListPannel.appendChild(orderListDiv); 
            hasLoaded = false;             
            }
            }         
    
    });

async function autologin(){
    let jwttoken =  getCookie("JWT");    
    if(!jwttoken) return false;

    try{
        let response = await fetch(url +"/user/autoLogin", {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': jwttoken
            },                                 
        });

        if (response.status == 401){
            return false;
        }
        if (response.status == 200){
            return true;
        }          
        
    }    
    catch(error){
        return false;
    }          
    
}


document.addEventListener('DOMContentLoaded',  async function() {    
    mainContainer = document.getElementById("container");
        const hiddenFilterinput = document.createElement("input");
        hiddenFilterinput.type = 'hidden';
        hiddenFilterinput.value = "";    
        hiddenFilterinput.id = "hiddenfilterImput";  
    mainContainer.appendChild(hiddenFilterinput);
});
