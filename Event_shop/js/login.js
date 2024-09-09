var url = "http://localhost:8080";

document.getElementById("login").addEventListener("click", async function(event) {
    event.preventDefault();
    let user = getUserData();
    let reponse = await login(user);
    if(reponse)     window.location.href = "dashboard.html";
    else  clearUserData();


});


document.getElementById("Register").addEventListener("click", async function(event) {
    event.preventDefault();
    let user = getUserData();

    if(!validateEmail(user.name)){
        document.getElementById("response").innerHTML  = "Invalid mail format";
        return;
    } 
    if(!validatePassword(user.password)){
        document.getElementById("response").innerHTML  = "Invalid password format";
        return;
    } 

    await register(user);
    clearUserData();
});



document.addEventListener('DOMContentLoaded',  async function() {    
    const authorized =  await autologin();       
    if(authorized){   
    window.location.href = "dashboard.html"; 
    }  
    
}
);


async function login(user) {     

    try{   
        let response = await fetch(url + '/user/login', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'                                        
            },
            body: JSON.stringify({
            "name": user.name,           
            "password":user.password                  
            }),        
        })


        if (response.status == 500){
            document.getElementById("response").innerHTML  = "Database connection failed";
            return;
        }
        if (response.status == 401){
            document.getElementById("response").innerHTML  = "Invalid username or password";
            return;
        } 
        if (response.status == 400){
            document.getElementById("response").innerHTML  = "Invalid data";
            return;
        }
        if (response.status == 200) {            
            setCookie("JWT", await response.text(),7);             
            return true;
        }  

    }    
    catch(error){
        console.error('Error:', error);
    }    
    
}

async function register(user) {     

    try{   
        let response = await fetch(url + '/user/register', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'                                        
            },
            body: JSON.stringify({
            "name": user.name,           
            "password":user.password                  
            }),        
        })

        if (response.status == 500){
            document.getElementById("response").innerHTML  = "Database connection failed";
            return;
        }
        if (response.status == 409){
            document.getElementById("response").innerHTML  = "User already exists";
            return;
        } 
        if (response.status == 400){
            document.getElementById("response").innerHTML  = "Invalid data";
            return;
        }
        if (response.status == 200) { 
            document.getElementById("response").innerHTML  = "User registration was successful";
            return;
        } 

    }    
    catch(error){
        console.error('Error:', error);
    }    
    
}


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

function validateEmail(email) {    
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;  
    return regex.test(email);
}

function validatePassword(password){
    return password.length > 3;
}


function getUserData(){
    let user = {};
    user.name = document.getElementById("username").value;
    user.password = document.getElementById("password").value;
    return user;
}

function clearUserData(){
    document.getElementById("username").value = "";
    document.getElementById("password").value = "";
}