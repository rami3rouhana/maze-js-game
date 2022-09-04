// Waiting till HTML page loads
window.addEventListener('load', pageLoad = () => {

    // Variable Declaration
    const gameBody = document.getElementById("game")
    const start = document.getElementById("start");
    const end = document.getElementById("end");
    const boundaries = document.getElementsByClassName("boundary");
    const displayMessage = document.getElementById("status");
    const timer = document.getElementById("timer");
    const customMode = document.getElementById("custom");
    const trialMode = document.getElementById("trial");
    const impMode = document.getElementById("imp");
    const gameMode = document.getElementById("gameMode");
    const seconds = document.getElementById("mainsecond");
    const milliSeconds = document.getElementById("milliseconds");
    let playerName = prompt("Please enter your name: ");
    let game = false;
    let score = 0;

    // Load saved game

    if (localStorage.getItem(playerName.toLowerCase()) !== null) {
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
    const saveLabel = document.createElement("h3");

    // // Adding game levels

    // const levels = document.createElement("div");
    // levels.style.display = "flex";
    // levels.style.flexDirection = "row";
    // levels.style.alignItems = "center";
    // levels.style.justifyContent = "center";
    // const level1 = document.createElement("button");
    // const level2 = document.createElement("button");
    // const level3 = document.createElement("button");
    // level2.style.margin = "0 10px 0 10px";
    // const levelLabel = document.createElement("h3");
    // levelLabel.style.marginRight = "5px";

    // Adding display text

    saveButton.innerHTML = "Save Game";
    // levelLabel.innerHTML = "Choose your level:"
    // level1.innerHTML = "custom";
    // level2.innerHTML = "trial";
    // level3.innerHTML = "imp";
    scoreDisplay.innerHTML = `Your current score: ${score}`;
    // saveLabel.innerHTML = "Remember the name that you've entered."

    // Appending elements to page 

    scoreBoard.appendChild(scoreDisplay); // Scoreboard
    save.appendChild(saveLabel); // Savebar
    save.appendChild(saveButton); // Savebar
    // levels.append(levelLabel,level1,level2,level3) // Levelbar
    timer.after(save); // Appending to page
    // displayMessage.after(levels); //Appending to page
    displayMessage.after(scoreBoard); // Appending to page

    // Change diffuclty

    const customTime = document.createElement("div");
    customTime.id = "customTime"
    customTime.style.display = "flex";
    customTime.style.flexDirection = "row";
    customTime.style.alignItems = "center";
    customTime.style.justifyContent = "center";
    const customInput = document.createElement("input");
    const customButton = document.createElement("button");

    // Input field

    customInput.type = "number";
    customInput.id = "customInput";
    customInput.min = "1";
    customInput.max = "20";
    customInput.style.width = "40px"

    // Submit button

    customButton.style.marginLeft = "10px";
    customButton.innerHTML = "Set Timer";


    customTime.appendChild(customInput);
    customTime.appendChild(customButton);


    customMode.onclick = function () {

        // Resetting timer

        seconds.innerHTML = '00';
        milliSeconds.innerHTML = '000';

        gameMode.after(customTime); // Adding the input field 

        // Disabling button

        customMode.disabled = true;
        trialMode.disabled = false;
        impMode.disabled = false;

        customButton.onclick = function () {
            customInput.value <= 9 ? seconds.innerHTML = `0${customInput.value}` : seconds.innerHTML = `${customInput.value}`
            milliSeconds.innerHTML = '000';
            customInput.value = "";
        }
    }

    trialMode.onclick = function () {
        document.getElementById("customTime") && document.body.removeChild(customTime);

        // Resetting timer

        seconds.innerHTML = '00';
        milliSeconds.innerHTML = '000';

        // Disabling button

        customMode.disabled = false;
        trialMode.disabled = true;
        impMode.disabled = false;
    }

    impMode.onclick = function () {
        document.getElementById("customTime") && document.body.removeChild(customTime);
        
        // Resetting timer

        seconds.innerHTML = '01';
        milliSeconds.innerHTML = '500';
        
        // Disabling button

        customMode.disabled = false;
        trialMode.disabled = false;
        impMode.disabled = true;
    }
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
        Array.from(boundaries).forEach(boundary => {
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
        Array.from(boundaries).forEach(boundary => {
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
        Array.from(boundaries).forEach(boundary => {
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
        Array.from(boundaries).forEach(boundary => {
            boundary.removeEventListener("mouseover", gameEnd);
        });
        gameBody.removeEventListener("mouseleave", gameEnd);
        end.removeEventListener("mouseover", gameWin);
    }

})
