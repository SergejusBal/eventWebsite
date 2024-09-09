


async function showService(){
    document.getElementById("content-container").innerHTML = "";
    
    const contentContainer = document.getElementById("content-container");     
    
    const filterDiv = createRefundPannel();     

    contentContainer.appendChild(filterDiv);
    getOneEvent();

};


function createRefundPannel(){

    const controlDiv = document.createElement("div");
    controlDiv.className = "cardDiv"; 
    controlDiv.id = "controlpannel";
    controlDiv.style.marginTop = "200px";
    controlDiv.style.display = "flex";
    controlDiv.style.flexDirection = "column";;

    const refundHeader = document.createElement("h1")
    refundHeader.textContent = "Refund Meniu"
    refundHeader.style.color = "#ffffff"

    controlDiv.appendChild(refundHeader);

    const informationDiv = document.createElement("div");
    informationDiv.style.width = "90%";

        const informationText = document.createElement("p");
        informationText.textContent = "To complete your refund, we have provided a unique Refund Key in yuor e - mail. This key is necessary to validate and authorize the refund request. Please follow the instructions carefully to avoid any delays."
        informationText.style.fontSize = "22px";
        informationText.style.color = "#ffffff";
        informationText.style.textAlign = "justify";
        informationText.style.textIndent = "50px";

        informationDiv.appendChild(informationText);


    controlDiv.appendChild(informationDiv);


    const filterDiv = document.createElement("div"); 
    filterDiv.style.marginLeft = "10%";
    filterDiv.style.width = "100%";      

        const filterLabel = document.createElement("label");
        filterLabel.textContent = "Refund key: "
        filterLabel.style.color = "#ffffff";
        filterLabel.style.fontSize = "26px";
        filterLabel.style.fontWeight = "bold";
        filterLabel.style.marginRight = "1%";

        const filterInput = document.createElement("input");
        filterInput.className = "customImput"; 
        filterInput.id = "refundImput";
        filterInput.placeholder = "Enter yuor refund Key";
        filterInput.style.textAlign = "center";
        filterInput.style.marginRight = "1%";

        const applyFilter = document.createElement("Button");
        applyFilter.textContent = "Check Refund";
        applyFilter.onclick = async function() {
            document.getElementById("hiddenRefundInput").value = document.getElementById("refundImput").value
            showHiddenRefundPannel();
        }; 

        filterDiv.appendChild(filterLabel);
        filterDiv.appendChild(filterInput);
        filterDiv.appendChild(applyFilter);
    
    controlDiv.appendChild(filterDiv); 

    const hiddenDiv = document.createElement("div");
    hiddenDiv.style.display = "none";
    hiddenDiv.style.width = "90%";
    hiddenDiv.style.padding = "20px";
    hiddenDiv.style.justifyContent = "space-between";
    hiddenDiv.id = "hiddenDiv";

        const hiddenLabel = document.createElement("label");
        hiddenLabel.textContent = "Refund size is: 0.00 €"
        hiddenLabel.style.color = "#ffffff";
        hiddenLabel.style.fontSize = "26px";
        hiddenLabel.style.fontWeight = "bold";
        hiddenLabel.style.marginRight = "1%";
        hiddenLabel.id = "hiddenlabelForRefund"

        hiddenDiv.appendChild(hiddenLabel);

        const refundButton = document.createElement("Button");
        refundButton.textContent = "Refund";
        refundButton.style.marginTop = "50px";
        refundButton.onclick = async function() {           
            refund();
        };

        hiddenDiv.appendChild(refundButton);
        
    
    controlDiv.appendChild(hiddenDiv);


    return controlDiv;
}


async function showHiddenRefundPannel(){
    
    const hiddenDiv= document.getElementById("hiddenDiv");
    hiddenDiv.style.display = "flex"; 

    let refundAmount = await checkRefundAmount();
    if( refundAmount == null || Number.isNaN(refundAmount)) refundAmount = 0;

    refundAmount = refundAmount / 100;
    document.getElementById("hiddenlabelForRefund").textContent = "Refund size is: " + refundAmount.toFixed(2) + " €"

} 

async function checkRefundAmount() {

    let refundKey = document.getElementById("hiddenRefundInput").value; 

    try{   
        let response = await fetch(url + "/stripe/refund/check/" + refundKey, {
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
            return response.json();
        }  

    }    
    catch(error){
        console.error('Error:', error);
        }            

}


async function refund() {

    let refundKey = document.getElementById("hiddenRefundInput").value; 

    try{   
        let response = await fetch(url + "/stripe/refund/key/" + refundKey, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',                     
            },                   
        })

        let responseData = await response.json();
        if (response.status == 500){        
            return;
        }
        if (response.status == 204){            
            return 0;
        }      
        if (response.status == 200) {       
            document.getElementById("hiddenlabelForRefund").textContent = responseData.response + "!";
        }  

    }    
    catch(error){
        console.error('Error:', error);
        }            

}


