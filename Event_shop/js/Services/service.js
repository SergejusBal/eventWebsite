var url = "http://localhost:8080";

document.addEventListener('DOMContentLoaded',  async function() {    
    mainContainer = document.getElementById("container");
        const hiddenFilterinput = document.createElement("input");
        hiddenFilterinput.type = 'hidden';
        hiddenFilterinput.value = "";    
        hiddenFilterinput.id = "hiddenRefundInput";  
    mainContainer.appendChild(hiddenFilterinput);
});

document.addEventListener('DOMContentLoaded',  async function() {    
    showService();
});


document.getElementById("userIcon").addEventListener("click", async function(event) {
    window.location.href = 'login.html';
});

document.getElementById("cartIcon").addEventListener("click", async function(event) {
    window.location.href = 'cart.html';
});