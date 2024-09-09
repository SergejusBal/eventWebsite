var url = "http://localhost:8080";

document.addEventListener('DOMContentLoaded',  async function() {    
    createEventPage();
});

async function createEventPage() {
   await addEvent("content-container");
   await addCommentSection("content-container");
    
}


document.getElementById("userIcon").addEventListener("click", async function(event) {
    window.location.href = 'login.html';
});

document.getElementById("cartIcon").addEventListener("click", async function(event) {
    window.location.href = 'cart.html';
});