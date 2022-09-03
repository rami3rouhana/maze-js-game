// Waiting till HTML page loads
window.addEventListener('load', pageLoad = () =>{

    // Variable Declaration
    const gameBody = document.getElementById("game")
    const start = document.getElementById("start");
    const end = document.getElementById("end");
    const boundaries = document.getElementsByClassName("boundary");
    const displayMessage = document.getElementById("status");
    let game = false;
    let score = 0;

    // Adding score board element

    const scoreBoard = document.createElement("div");
    const scoreDisplay = document.createElement("h2");

    // Adding reset button element

    // const reset = document.createElement("div");
    // reset.style.display = "flex";
    // reset.style.flexDirection = "column";
    // reset.style.alignItems = "center";
    // reset.style.paddingBottom = "10px"
    // const resetButton = document.createElement("button");

    // Adding display text

    // resetButton.innerHTML = "Reset";
    scoreDisplay.innerHTML = `Your current score: ${score}`;

    // Appending elements to page 

    scoreBoard.appendChild(scoreDisplay);
    // reset.appendChild(resetButton);
    // displayMessage.after(reset);
    displayMessage.after(scoreBoard);

    // Reset game 
    // resetButton.addEventListener("")
    
    // Game Start Function

    const gameStart = () => {
        game = true
        Array.from(boundaries).forEach( boundary => {
            boundary.classList.remove("youlose");
        });
    }

    // Adding Listner

    start.onmouseenter = function () {
        // Adding reset function
        start.click = function () {
            score = 0
            scoreDisplay.innerHTML = `Your current score: ${score}`; // Display score
        }
        gameStart();
        Array.from(boundaries).forEach( boundary => {
            boundary.addEventListener("mouseover", gameEnd);
        });
        gameBody.addEventListener("mouseleave", gameEnd);  // Game patch 
        end.addEventListener("mouseover", gameWin);
    }
     
    // Game Loose Function

    const gameEnd = () => {
        game = false
        displayMessage.innerHTML = "You Lost !"; // Display win message
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
        game = false
        displayMessage.innerHTML = "You Won !"; // Display win message 
        score += 5; // Adding to score
        scoreDisplay.innerHTML = `Your current score: ${score}`; //Display score
        Array.from(boundaries).forEach( boundary => {
            boundary.removeEventListener("mouseover", gameEnd);
        });
        gameBody.removeEventListener("mouseleave", gameEnd);
        end.removeEventListener("mouseover", gameWin);
    }

})
