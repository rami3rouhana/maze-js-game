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

    // Adding game levels

    const levels = document.createElement("div");
    levels.style.display = "flex";
    levels.style.flexDirection = "row";
    levels.style.alignItems = "center";
    levels.style.justifyContent = "center";
    const level1 = document.createElement("button");
    const level2 = document.createElement("button");
    const level3 = document.createElement("button");
    level2.style.margin = "0 10px 0 10px"

    // Adding display text

    saveButton.innerHTML = "Save";
    level1.innerHTML = "Easy";
    level2.innerHTML = "Medium";
    level3.innerHTML = "Hard";
    scoreDisplay.innerHTML = `Your current score: ${score}`;
    saveLabel.innerHTML = "Remember the name that you've entered."

    // Appending elements to page 

    scoreBoard.appendChild(scoreDisplay); // Scoreboard
    save.appendChild(saveLabel); // Savebar
    save.appendChild(saveButton); // Savebar
    levels.append(level1,level2,level3) // Levelbar
    displayMessage.after(save); // Appending to page
    displayMessage.after(levels); //Appending to page
    displayMessage.after(scoreBoard); // Appending to page

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
