// Waiting till HTML page loads
window.addEventListener('load', pageLoad = () =>{

    // Variable Declaration
    const gameBody = document.getElementById("game")
    const start = document.getElementById("start");
    const end = document.getElementById("end");
    const boundaries = document.getElementsByClassName("boundary");
    const displayMessage = document.getElementById("status");
    let playerName = prompt("Please enter your name: ");
    let game = false;
    let score = 0;

    // Load saved game

    if(localStorage.getItem(playerName.toLowerCase()) !== null){
        let data = JSON.parse(localStorage.getItem(playerName.toLowerCase()));
        score = data.score;
    }   
    
    // Adding score board element

    const scoreBoard = document.createElement("div");
    const scoreDisplay = document.createElement("h2");

    // Adding Save button element

    const save = document.createElement("div");
    save.style.display = "flex";
    save.style.flexDirection = "row";
    save.style.alignItems = "center";
    save.style.justifyContent = "center";
    const saveButton = document.createElement("button");
    saveButton.style.marginLeft = "10px";
    const saveLabel = document.createElement("h3");

    // Adding display text

    saveButton.innerHTML = "Save";
    scoreDisplay.innerHTML = `Your current score: ${score}`;
    saveLabel.innerHTML = "Remember the name that you've entered."

    // Appending elements to page 

    scoreBoard.appendChild(scoreDisplay);
    save.appendChild(saveLabel)
    save.appendChild(saveButton);
    displayMessage.after(save);
    displayMessage.after(scoreBoard);

    // Save game 

    saveButton.addEventListener("click", () => {
        localStorage.setItem(playerName.toLocaleLowerCase(), JSON.stringify({  
            "score": score
        }))
    })
    
    // Game Start Function

    const gameStart = () => {
        game = true //Starts game
        displayMessage.innerHTML = `Good Luck ${playerName}!`;
        Array.from(boundaries).forEach( boundary => {
            boundary.classList.remove("youlose");
        });
    }

    // Adding Listner

    start.onmouseenter = function () {

        // Adding reset function

        start.onclick = function () {
            score = 0
            scoreDisplay.innerHTML = `Your current score: ${score}`; // Display score
        }

        // Game start

        gameStart();
        Array.from(boundaries).forEach( boundary => {
            boundary.addEventListener("mouseover", gameEnd);
        });
        gameBody.addEventListener("mouseleave", gameEnd);  // Game patch 
        end.addEventListener("mouseover", gameWin);
    }
     
    // Game Loose Function

    const gameEnd = () => {
        game = false //reset game
        displayMessage.innerHTML = "You`ve Lost !"; // Display win message
        score -= 10; // Removing from score
        scoreDisplay.innerHTML = `Your current score: ${score}`; // Display score
        Array.from(boundaries).forEach( boundary => {
            boundary.classList.add("youlose");
            boundary.removeEventListener("mouseover", gameEnd);
        });
        gameBody.removeEventListener("mouseleave", gameEnd);
        end.removeEventListener("mouseover", gameWin);
    }
    
    // Game Win Function

    const gameWin = () => {
        game = false //reset game
        displayMessage.innerHTML = "You`ve Won !"; // Display win message 
        score += 5; // Adding to score
        scoreDisplay.innerHTML = `Your current score: ${score}`; //Display score
        Array.from(boundaries).forEach( boundary => {
            boundary.removeEventListener("mouseover", gameEnd);
        });
        gameBody.removeEventListener("mouseleave", gameEnd);
        end.removeEventListener("mouseover", gameWin);
    }

})
