async function addCommentSection(ContainderName){     
    const contentContainer = document.getElementById(ContainderName);     
    
    const commentDiv = await createCommenPannel();      

    contentContainer.appendChild(commentDiv);    

};

async function createCommenPannel(){

    const commentPannelDiv = document.createElement("div");  
    commentPannelDiv.className = "commentPannelDiv";
            
    let commentHeaderDiv = await createCommentHeader();
    let commentBodyDiv = await createBodyHeader();
    let commentFooterDiv = await createFooterHeader();
    
    commentPannelDiv.appendChild(commentHeaderDiv);   
    commentPannelDiv.appendChild(commentBodyDiv);      
    commentPannelDiv.appendChild(commentFooterDiv);  
  
    return commentPannelDiv;
}


async function createCommentHeader(){

    const commentHeaderDiv = document.createElement("div"); 
    commentHeaderDiv.className = "commentHeader";

    const header = document.createElement("h1"); 
    header.textContent = "Please rate our event!";

    const rating = await createRatingDiv();   


    commentHeaderDiv.appendChild(header);
    commentHeaderDiv.appendChild(rating);

    return commentHeaderDiv;
}

async function createRatingDiv(){
    const ratingDiv = document.createElement("div");
    ratingDiv.style.display = "flex";
    ratingDiv.style.justifyContent = "center"; 
    ratingDiv.style.alignItems = "center";

    const starDiv = document.createElement("div"); 
    starDiv.id = "stardiv";   

    const number = [1,2,3,4,5];
        for (const rating of number)  { 
            const button = document.createElement("button");
            button.style.height = "20px"; 
            button.style.width = "20px";
            button.onclick = async function() {
                await rate(rating);
                document.getElementById("stardiv").style.display = "none";
                let eventRating = await getRating();
                document.getElementById("ratingLabel").style.display = "flex";
                document.getElementById("ratingLabel").textContent = "Rating: " + eventRating.toFixed(2);
            };
            starDiv.appendChild(button);
        }
        
    const ratingLabel = document.createElement("label"); 
    ratingLabel.id = "ratingLabel";
    ratingLabel.style.display = "none";

    ratingDiv.appendChild(starDiv);
    ratingDiv.appendChild(ratingLabel);
    
    return ratingDiv;
}


async function createBodyHeader(){

    const commentBodyDiv = document.createElement("div"); 
    commentBodyDiv.className = "commentBody"; 
    commentBodyDiv.id = "commentBodyID"

    const comments = await getComments();

    if (!Array.isArray(comments) || comments.length === 0) return commentBodyDiv;
    let counter = 0;
    for (const commentData of comments)  { 
        let commentDiv = await createComment(commentData, counter);
        commentBodyDiv.appendChild(commentDiv);
        counter++;
    }

    return commentBodyDiv;

}

async function createComment(commentData,counter){
    const commentDiv = document.createElement("div"); 
    commentDiv.className = "comment";
   
    if(counter % 2 == 0) commentDiv.style.marginLeft = "10%";


    const nameDateDiv = document.createElement("div");
    nameDateDiv.style.display = 'flex';
    nameDateDiv.style.flexDirection = 'row';
    nameDateDiv.style.justifyContent = 'space-between'; 
    nameDateDiv.style.borderBottom = "1px solid grey";
         

        const name = document.createElement("label");
        name.textContent =  commentData.name;

        const date = document.createElement("label");
        let commentDate = commentData.date;       
        date.textContent = commentDate.replace("T", " ");
        

        nameDateDiv.appendChild(name);
        nameDateDiv.appendChild(date);    
    
        commentDiv.appendChild(nameDateDiv);        

    const commentTextDiv = document.createElement("div");
    commentTextDiv.style.textAlign = "justify"; 
    commentTextDiv.style.padding = "10px";
        
            const commentText = document.createElement("label");   
            commentText.textContent = commentData.comment;          
            
            commentTextDiv.appendChild(commentText);

    commentDiv.appendChild(commentTextDiv);

    return commentDiv;
}

async function createFooterHeader(){

    const commentFooterDiv = document.createElement("div"); 
    commentFooterDiv.className = "commnetFooter";

    const nameDiv = document.createElement("div");

        const nameLabel = document.createElement("label");
        nameLabel.style.width = "80%"
        nameLabel.textContent = "Name:";

        const nameImput = document.createElement("input");       
        nameImput.placeholder = "Enter your name";       
        nameImput.id = "commentName";
        nameImput.style.width = "80%";
        nameImput.style.height = "25px"


        nameDiv.appendChild(nameLabel);
        nameDiv.appendChild(nameImput);


    const commentDiv = document.createElement("div");

        const commentLabel = document.createElement("label");
        commentLabel.style.width = "80%"
        commentLabel.textContent = "Comment:";

        const commentImput = document.createElement("textarea");            
        commentImput.style.width = "80%";  
        commentImput.style.height = "100px"
        commentImput.style.resize = "none";
        commentImput.id = "commentInput";

        commentDiv.appendChild(commentLabel);
        commentDiv.appendChild(commentImput);

    const buttonDiv = document.createElement("div"); 
    buttonDiv.style.display = "flex"; 
    buttonDiv.style.flexDirection = 'row';   
    buttonDiv.style.justifyContent = "flex-end";
    buttonDiv.style.gap = "5px"; 
    buttonDiv.style.marginTop = "20px";   

        const createCommentButton = document.createElement('button');
        createCommentButton.id = "createComment";
        createCommentButton.textContent = "Comment";
        createCommentButton.style.width = "150px";
        createCommentButton.style.height = "40px";
        createCommentButton.style.marginRight = "10%";       
        createCommentButton.onclick = async function() {
           await sendComment();
           const errorMessageLabel  = document.getElementById("commentErrorMessage");
           errorMessageLabel.style.display = "flex";

           if(errorMessageLabel.value == "Comment was successfully added"){
           const commentData = fillCommentData();
           const commentBodyDiv = document.getElementById("commentBodyID");
           const commentdiv = await createComment(commentData, 1);
           commentBodyDiv.appendChild(commentdiv);
           }
           clearCommentData();
        };
    
    buttonDiv.appendChild(createCommentButton);

    const messageDiv = document.createElement("div");


        const message = document.createElement("label");
        message.style.width = "80%";
        message.id = "commentErrorMessage"; 
        message.style.display = "none"; 

        messageDiv.appendChild(message); 
   
    commentFooterDiv.appendChild(nameDiv);
    commentFooterDiv.appendChild(commentDiv);
    commentFooterDiv.appendChild(buttonDiv);
    commentFooterDiv.appendChild(messageDiv);

    return commentFooterDiv;

}

async function rate(rating) {

    const pageUrl = new URL(window.location.href);
    const id = await pageUrl.searchParams.get('id');

    try{   
        let response = await fetch(url + "/comment/rate/" + rating + "/" + id, {
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

async function getRating() {

    const pageUrl = new URL(window.location.href);
    const id = await pageUrl.searchParams.get('id');

    try{   
        let response = await fetch(url + "/comment/getRating/" + id,  {
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

async function getComments() {

    const pageUrl = new URL(window.location.href);
    const id = await pageUrl.searchParams.get('id');

    try{   
        let response = await fetch(url + "/comment/" + id,  {
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
            return [];
        } 
     
        if (response.status == 200) {       
            return await response.json();
        }  

    }    
    catch(error){
        console.error('Error:', error);
        }     
}


async function sendComment() {    
    
    const pageUrl = new URL(window.location.href);
    const id = await pageUrl.searchParams.get('id');
    let comment = fillCommentData();

    try{   
        let response = await fetch(url + '/comment/new', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',                          
            },
            body: JSON.stringify({
            "eventID": id,           
            "name": comment.name,
            "comment":comment.comment,  
            }),        
        })

     

        if (response.status == 500){
            document.getElementById("commentErrorMessage").innerHTML = "Database connection failed";
            return;
        }
        if (response.status == 403){
            document.getElementById("commentErrorMessage").innerHTML = "Comments are not allowed yet!";
            return;
        }        
        if (response.status == 200) {
            document.getElementById("commentErrorMessage").innerHTML = "Comment was successfully added";
            return;
        }  

    }    
    catch(error){
        console.error('Error:', error);
    }    
    
}

function fillCommentData() {
    let comment = {};
    comment.name = document.getElementById("commentName").value;
    comment.comment = document.getElementById("commentInput").value;
    comment.date = new Date().toISOString();
    return comment;
}

 function clearCommentData() {
    document.getElementById("commentName").value = "";
    document.getElementById("commentInput").value = "";
    
}