//var url = "http://35.228.181.251:8080";
var url = "http://localhost:8080";


function createPopUp(containerID){
    const main_containter = document.getElementById(containerID);

    const popWindow = document.createElement('div');
    popWindow.className = "mainDiv";
    popWindow.id = "popWindow";

        const popUp = document.createElement('div');
        popUp.className = "popup";

            const buttonDiv = document.createElement('div');            
            buttonDiv.style.width = "100%";
            buttonDiv.style.alignSelf = "flex-end";

            const closeButton = document.createElement('button');
            closeButton.textContent = "Close";          
            
            closeButton.style.alignSelf = "center";           
            closeButton.onclick = async function() {                                      
                closeWindow("popWindow");
            }; 
            const submitButton = document.createElement('button');
            submitButton.textContent = "Submit";           
            submitButton.style.marginTop = "15px";      
            submitButton.style.alignSelf = "center";      
            submitButton.onclick = async function() {                                                      
                registerEmail();
            };   

            buttonDiv.appendChild(submitButton);
            buttonDiv.appendChild(closeButton);

            const textDiv = document.createElement('div');
            textDiv.style.width = "90%";            

            const header = document.createElement('h1');
            header.textContent = "Stay in the Loop!";
            const labeltext = document.createElement("label");
            labeltext.textContent = "   Sign up with your email to get the latest news, exclusive offers, and special promotions delivered straight to your inbox. Be the first to know about new products, upcoming sales, and exciting events!";
            const labelRegisterEmail = document.createElement("label");
            labelRegisterEmail.textContent = "Enter yuor e-mail:"


            const inputBox = document.createElement("input");
            inputBox.id = "emailId";
            
            textDiv.appendChild(header);
            textDiv.appendChild(labeltext);
            textDiv.appendChild(labelRegisterEmail);
            textDiv.appendChild(inputBox);


        popUp.appendChild(textDiv);
        popUp.appendChild(buttonDiv);
        popWindow.appendChild(popUp);

    main_containter.appendChild(popWindow);

}

document.addEventListener('DOMContentLoaded',  async function() {   
    let popup = getCookie("popActive");
    if(popup !== "false" || popup == null )  createPopUp("container");

});



function closeWindow(windowId){
    const main_containter = document.getElementById(windowId);
    main_containter.style.display = "none";
    setCookie("popActive", "false", 9999);
}

async function registerEmail(){
    let email = document.getElementById("emailId").value;
    let response = await resgisterEmailAPI(email);
    if(response){
    closeWindow("popWindow");
    setCookie("popActive", "false", 1);
    }
}

async function resgisterEmailAPI(email){
    try{   
        let response = await fetch(url + '/mail/register/' + email, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            body: ""

            }                  
        })

        if (response.status == 500){            
            return false;
        } 
        if (response.status == 400){            
            return false;
        }
        if (response.status == 200) {           
            return true;
        }  

    }    
    catch(error){
        console.error('Error:', error);
    }   

}
