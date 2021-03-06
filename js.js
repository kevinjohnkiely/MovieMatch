/* This is my first attempt at coding vanilla Javascript, designing a basic movie app that accepts username and password,
and allows the logged in user to view their account section of page whereby they can add their favourite movies from the list on page.
No logout utility is added as that is beyond the scope of this very basic app! */

// Hide account and movies part of page by default (and account button on navbar)
document.getElementById('account').style.display="none";
document.getElementById('accBtn').style.display="none";
document.getElementById('movies').style.display="none";

// Create User blueprint class

class User {
    constructor(id, un, pw) {
        this.id = id;
        this.un = un;
        this.pw = pw;
    }

    getUsername () {
        return this.un;
    }

    getPassword () {
        return this.pw;
    }
}

// Create user objects

let kevin = new User(0, "kevink", "123");
let joyce = new User(1, "joycetu", "321");

// Create array to hold favourite movies (Kevins hardcoded to ensure Joyce may find a match!)
let kevinFaves = ["The Cider House Rules", "Despicable Me", "Bird Box", "The Beach", "Call Me By Your Name"];
let joyceFaves = [];

// add to users usernames to storage arrays for later login checks
const userNames = [kevin.getUsername(), joyce.getUsername()];
const passwords = [kevin.getPassword(), joyce.getPassword()];

let userTxt, userPass;

document.getElementById("checklogin").addEventListener('click', function(){
    userTxt = document.getElementById("username").value;
    userPass = document.getElementById("password").value;
    if(userTxt === "" || userPass === ""){
        alert("Please complete both username and password fields!");
    }
    else {
        checkLogin(userTxt, userPass);
    }
    
});

// Function to check login
checkLogin = (userN, passW) => {
   
    if(userNames.includes(userN)) {
        console.log("username exists at index no." + userNames.indexOf(userN));
        if(passwords[userNames.indexOf(userN)] === passW) {
            console.log("total match");
            document.getElementById('account').style.display="block";
            document.getElementById('accBtn').style.display="block";
            document.getElementById('movies').style.display="block";
            document.getElementById('usernameHolder').textContent = userN;
            document.getElementById('passwordHolder').textContent = passW;
            document.getElementById("username").value = "";
            document.getElementById("password").value = "";
        } else {
            alert("Password is incorrect");
        }

    } else {
        document.getElementById("username").value = "";
        document.getElementById("password").value = "";
        alert("Login details incorrect, please try again!");
    }

}
// Code to display favourites as they are being added

addFave = (ev) => {
    let node = document.createElement("LI");                 
    let textnode = document.createTextNode(ev);
    node.appendChild(textnode);                              
    document.getElementById("movieLikes").appendChild(node);
    
}

findMatch = () => {

    let matchCounter = 0;
    
    for(let i = 0; i<kevinFaves.length; i ++) {
        for (let j = 0; j<joyceFaves.length; j++){
            if (kevinFaves[i] === joyceFaves[j]) {
                matchCounter ++;
                
            }
        }
    }
    return matchCounter;
}

const btnArray = document.querySelectorAll(".btn-primary");
const buttons = Array.from(btnArray);
buttons.forEach(el => {
    el.addEventListener('click', function(event){

        // disable the button after selecting the film to like
        this.style.display = "none";
        if(userTxt === "kevink") {

            if(kevinFaves.length == 5){
                alert("You have added 5 favorites, you cannot add anymore!");
            } else {
                let choice = event.target.parentNode.firstChild.nextSibling.innerText;
                kevinFaves.push(choice);
                addFave(choice);
                // findMatch();
            }
            
        } else if (userTxt === "joycetu") {
            if(joyceFaves.length == 5){
                
                alert("You have added 5 favorites, you cannot add anymore!");
                
            } else {
                let choice = event.target.parentNode.firstChild.nextSibling.innerText;
                joyceFaves.push(choice);
                addFave(choice);
                alert(`You have ${findMatch()} matches with Kevin!`);
            }
            
        }
        
    });
});



