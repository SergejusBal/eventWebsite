var url = "http://localhost:8080";

document.addEventListener('DOMContentLoaded',  async function() {    
    mainContainer = document.getElementById("container");
        const hiddenFilterinput = document.createElement("input");
        hiddenFilterinput.type = 'hidden';
        hiddenFilterinput.value = "";    
        hiddenFilterinput.id = "hiddenfilterImput";  
    mainContainer.appendChild(hiddenFilterinput);
});

document.addEventListener('DOMContentLoaded',  async function() {    
      showEventsList();
 });

document.getElementById("userIcon").addEventListener("click", async function(event) {
    window.location.href = 'login.html';
});

document.getElementById("cartIcon").addEventListener("click", async function(event) {
    window.location.href = 'cart.html';
});

var offset = 10;
var hasLoaded = false;
window.addEventListener('scroll', async function() {    

    if ((window.scrollY + window.innerHeight >= document.body.offsetHeight) && !hasLoaded) {
        hasLoaded = true; 
            const eventListPannel = document.getElementById("eventDiv");
            const eventListDiv = await createEventList(offset, 5);
        offset +=5;            
        if(eventListDiv != null) eventListPannel.appendChild(eventListDiv); 
        hasLoaded = false;             
        }  
             
});









