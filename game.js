// Waiting till HTML page loads
window.addEventListener('load', pageLoad = () => {

    // Variable Declaration
    const gameBody = document.getElementById("game")
    const start = document.getElementById("start");
    const end = document.getElementById("end");
    const boundaries = document.getElementsByClassName("boundary");
    const displayMessage = document.getElementById("status");
    const customMode = document.getElementById("custom");
    const trialMode = document.getElementById("trial");
    const impMode = document.getElementById("imp");
    const gameMode = document.getElementById("gameMode");
    const timer = document.getElementById('liveTimer');
    const displayTimerScreen = document.getElementById("timer");
    let playerName;
    let game = false;
    let impossible = false;
    let score = 0;
    let gameModeOn = "trial";
    let myTimeout;
    let timerCountDown;
    let countDown;
    let [milliseconds, seconds] = [0, 0];
    let int = null;
    let [bestMsec, bestSec] = [0, 0];
    let [lastMsec, lastSec] = [0, 0];
    let allPlayers;
    let singlePlayer;

    // Prompt name

    do{
        playerName = prompt("Please enter your name: ");
    }while(playerName == null || playerName == "" );

    // Leader board
    const table = document.getElementById("leaderBoard");

    // Getting all players

    players = JSON.parse(localStorage.getItem("players"));
    if (!players){
        players = {}
    }
    allPlayers = Object.values(players)

    // Adding info to table

    allPlayers.map( (singlePlayer, index) => {
        let main = document.createElement("tr");
        userPlayer = JSON.parse(localStorage.getItem(singlePlayer));
        let player = document.createElement("td");
        player.innerHTML = allPlayers[index];
        player.style.textAlign = "center";
        let playerScore = document.createElement("td");
        playerScore.innerHTML = userPlayer.score;
        playerScore.style.textAlign = "center"
        let playerBest = document.createElement("td");;
        playerBest.innerHTML = `${userPlayer.bestTime[1]}:${userPlayer.bestTime[0]}`;
        playerBest.style.textAlign = "center";
        let playerImp = document.createElement("td");
        
        // Checking if impossible challenge done

        if(userPlayer.impossible){
            playerImp.innerHTML = "Done";
        }
        else{
            playerImp.innerHTML = "N/A";
        }
        playerImp.style.textAlign = "center";
        main.appendChild(player);
        main.appendChild(playerScore);
        main.appendChild(playerBest);
        main.appendChild(playerImp);
        table.appendChild(main);
    })

    // Timer display

    const displayTimer = () => {
    milliseconds += 10;

    if (milliseconds == 1000) {
        milliseconds = 0;
        seconds++;
    }
    if (seconds < 10) {
        "0" + seconds
    }
    else (seconds)
    milliseconds < 10 ? "00" + milliseconds : milliseconds < 100 ? "0" + milliseconds : milliseconds;
    timer.innerHTML = ` ${seconds} : ${milliseconds}`;
    }

    // Start timer

    const startTimer = () => {
    if (int !== null) {
        clearInterval(int);
    }
    int = setInterval(displayTimer, 10);
    }

    // Start countdown

    const startCountDown = () => {
    let countDownDate = new Date().getTime() + 1000 * timerCountDown;
    let timeleft
    game = false
    countDown = setInterval( () => {
        let now = new Date().getTime();
        timeleft = countDownDate - now;
        [milliseconds, seconds] = [parseInt(timeleft % (1000 * 60).toString().substring(0,3)), Math.floor((timeleft % (1000 * 60)) / 1000)]
        liveTimer.innerHTML = `${seconds}:${milliseconds}`
        if (timeleft <= 0) {
            stopCountDown();
            gameEnd();
            liveTimer.innerHTML = `00:000`
        } 
        }, 10)
    }

    // Stop countdown

    const stopCountDown = () => {
        [mil, sec] = [milliseconds, seconds];
        clearInterval(countDown);
        timer.innerHTML = ` ${sec} : ${mil}`;
        return [mil, sec]
        }
    

    // Stop timer

    const stopTimer = () => {

    [mil, sec] = [milliseconds, seconds];
    clearInterval(int);
    timer.innerHTML = ` ${sec} : ${mil}`;
    return [mil, sec]

    }

    // Reset timer

    const resetTimer = () => {
        clearInterval(int);
        [milliseconds, seconds] = [0, 0];
        timer.innerHTML = '00 : 000 ';
      }


    // Load saved game

    if (localStorage.getItem(playerName.toLowerCase()) !== null) {

        let data = JSON.parse(localStorage.getItem(playerName.toLowerCase()));
        score = data.score;  
        [bestMsec, bestSec] = [data.bestTime[0],data.bestTime[1]];
        [lastMsec, lastSec] = [data.lastTime[0],data.lastTime[1]];

        // Check if impossible challenge is done

        if(data.impossible){
            impossible = true;
        }
    }

    // Adding score board element

    const scoreBoard = document.createElement("div");
    const scoreDisplay = document.createElement("h2");
    const bestTimeDisplay = document.createElement("h2");
    const lastTimeDisplay = document.createElement("h2");

    // Adding Save button element

    const save = document.createElement("div");
    save.style.display = "flex";
    save.style.flexDirection = "row";
    save.style.alignItems = "center";
    save.style.justifyContent = "center";
    const saveButton = document.createElement("button");
    saveButton.style.marginBottom = "10px";
    // const saveLabel = document.createElement("h3");

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

    // Time Management

    let bestTime = ` ${bestSec} : ${bestMsec < 10 ? "00" + bestMsec : bestMsec < 100 ? "0" + bestMsec : bestMsec}`

    let lasTime = `${lastSec} : ${lastMsec < 10 ? "00" + lastMsec : lastMsec < 100 ? "0" + lastMsec : lastMsec}`

    // Display time

    bestTimeDisplay.innerHTML = `Your best time : ${bestTime}`;
    scoreDisplay.innerHTML = `Your current score: ${score}`;
    lastTimeDisplay.innerHTML = `Your last time : ${lasTime} `;

    // saveLabel.innerHTML = "Remember the name that you've entered."

    // Appending elements to page 

    scoreBoard.appendChild(scoreDisplay); // Scoreboard
    scoreBoard.appendChild(bestTimeDisplay);
    scoreBoard.appendChild(lastTimeDisplay);
    // save.appendChild(saveLabel); // Savebar
    save.appendChild(saveButton); // Savebar
    // levels.append(levelLabel,level1,level2,level3) // Levelbar
    document.getElementById("timer").after(save); // Appending to page
    // displayMessage.after(levels); //Appending to page
    displayMessage.after(scoreBoard); // Appending to page

    // Adding custom challenge

    const customTime = document.createElement("div");
    customTime.id = "customTime"
    customTime.style.display = "flex";
    customTime.style.flexDirection = "row";
    customTime.style.alignItems = "center";
    customTime.style.justifyContent = "center";
    const customInput = document.createElement("input");
    const customButton = document.createElement("button");

    // Adding custom challenge attributes

    customInput.type = "number";
    customInput.id = "customInput";
    customInput.min = "1";
    customInput.max = "5";
    customInput.style.width = "40px"

    // Adding custom challenge submit button

    customButton.style.marginLeft = "10px";
    customButton.innerHTML = "Set Timer";


    customTime.appendChild(customInput);
    customTime.appendChild(customButton);


    // Impossible Mode

    impMode.onclick = () => {

        // Remove input field

        document.getElementById("customTime") && document.body.removeChild(customTime);
        document.body.removeChild(document.getElementById("timer"))
        gameModeOn = 'imp';

        // Disabling buttons

        customMode.disabled = false;
        trialMode.disabled = false;
        impMode.disabled = true;
        
    }

    // Custom Mode function

    customMode.onclick = () => {

        // Adding the input field 

        gameMode.after(customTime); 
        if (!document.getElementById("timer")){
            customTime.after(displayTimerScreen);
        }

        gameModeOn = 'custom';

        // Disabling buttons

        customMode.disabled = true;
        trialMode.disabled = false;
        impMode.disabled = false;

        // Adding custom challenge button functionality

        customButton.onclick = () => {
            if (customInput.value <= 5){
            game = true;
            timerCountDown = customInput.value;
            customInput.value <= 9 ? liveTimer.innerHTML = `0${customInput.value}:000` : liveTimer.innerHTML = `${customInput.value}:000`
            customInput.value = "";}
        }
    }

    // Trial

    trialMode.onclick = () => {

        // Remove input field
        
        document.getElementById("customTime") && document.body.removeChild(customTime);

        if (!document.getElementById("timer")){
            gameMode.after(displayTimerScreen);
        }

        gameModeOn = "trial";


        // Disabling button

        customMode.disabled = false;
        trialMode.disabled = true;
        impMode.disabled = false;
    }

    // Save player progress 

    saveButton.addEventListener("click", () => {

        players = JSON.parse(localStorage.getItem("players"));
        if (!players){
            players = {}
        }
        allPlayers = Object.values(players)
        debugger
        if (allPlayers.includes(playerName)){
            localStorage.setItem(playerName.toLocaleLowerCase(), JSON.stringify({
                score,
                "bestTime": [bestMsec, bestSec],
                "lastTime": [lastMsec, lastSec],
                impossible
            }));
        }
        else{
            let id = Date.now();
            localStorage.setItem(playerName.toLocaleLowerCase(), JSON.stringify({
                score,
                "bestTime": [bestMsec, bestSec],
                "lastTime": [lastMsec, lastSec],
                impossible
            }));
            players[id] = playerName;
            localStorage.setItem("players", JSON.stringify(players));
        }
    })

    // Game Start Function

    const gameStart = () => {
        game = true ;   //Starts game

        resetTimer();

        if(gameModeOn === 'imp'){
            myTimeout = setTimeout(gameEnd, 1300); // Set impossible challenge time without timer
        }
        else if (gameModeOn === 'custom' & game ){
            startCountDown();
        }
        else {
        startTimer();
        }   
        
        // Adding name display

        displayMessage.innerHTML = `Good Luck ${playerName}!`;

        // Removing listners from borders

        Array.from(boundaries).forEach(boundary => {
            boundary.classList.remove("youlose");
        });
    }

    // Adding Listner

    start.onmouseenter = () => {

        // Adding reset function

        start.onclick = () => {
            score = 0
            scoreDisplay.innerHTML = `Your current score: ${score}`; // Display score
        }

        // Game start
        if (gameModeOn === "custom" & game){
            gameStart();

            // Adding listners to borders

            Array.from(boundaries).forEach(boundary => {
                boundary.addEventListener("mouseover", gameEnd);
            });

            gameBody.addEventListener("mouseleave", gameEnd);  // Game patch 

            // Adding listners to win

            end.addEventListener("mouseover", gameWin);
        }
        else if (gameModeOn === "custom"){
            alert("Please set the timer");
        }
        else {
            gameStart();

            // Adding listners to borders

            Array.from(boundaries).forEach(boundary => {
                boundary.addEventListener("mouseover", gameEnd);
            });
            gameBody.addEventListener("mouseleave", gameEnd);  // Game patch 
            end.addEventListener("mouseover", gameWin);
        }


    }

    // Game Lose Function

    const gameEnd = () => {
        game = false //reset game
        stopTimer();
        stopCountDown();
        displayMessage.innerHTML = "You`ve Lost !"; // Display win message
        score -= 10; // Removing from score
        scoreDisplay.innerHTML = `Your current score: ${score}`; // Display score

        // Remove listners from borders

        Array.from(boundaries).forEach(boundary => {
            boundary.classList.add("youlose");
            boundary.removeEventListener("mouseover", gameEnd);
        });
        gameBody.removeEventListener("mouseleave", gameEnd);
        end.removeEventListener("mouseover", gameWin);
    }

    // Game Win Function

    const gameWin = () => {

        //reset game

        game = false 
        let [lastMsecNow, lastSecNow] = [0,0];

        // Adding mpossible win

        if(gameModeOn === 'imp'){
            impossible = true;
            clearTimeout(myTimeout);
            let winTime = 1300 - myTimeout;
            winTime = winTime.toString();
            [lastMsecNow, lastSecNow] = [ parseInt(winTime.substr(-3)), parseInt(winTime.substr(0,1)) ]
            [lastMsec, lastSec] = [lastMsecNow, lastSecNow];
        }

        // Adding custom win

        else if (gameModeOn === 'custom'){
            [lastMsecNow, lastSecNow] = stopCountDown();
            [lastMsec, lastSec] = [ (1000 - lastMsecNow) , (parseInt(timerCountDown) - lastSecNow) ] 
        }

        // Adding trial win

        else{
            [lastMsecNow, lastSecNow] = stopTimer(); // Retrieve last time
            [lastMsec, lastSec] = [lastMsecNow, lastSecNow];
        }   

        // Display win

        lasTime = `${lastSec} : ${lastMsec < 10 ? "00" + lastMsec : lastMsec < 100 ? "0" + lastMsec : lastMsec}`
        lastTimeDisplay.innerHTML = `Your last time : ${lasTime}`

        // Get the best time

        if ((lastSec < bestSec || (lastSec === bestSec & lastMsec < bestMsec)) || (bestSec === 0 & bestMsec === 0)) {
            bestSec = lastSec;
            bestMsec = lastMsec;
            bestTime = `${lastSec} : ${lastMsec < 10 ? "00" + lastMsec : lastMsec < 100 ? "0" + lastMsec : lastMsec}`
            bestTimeDisplay.innerHTML = `Your best time : ${bestTime}`
        } 

        displayMessage.innerHTML = "You`ve Won !"; // Display win message 
        score += 5; // Adding to score
        scoreDisplay.innerHTML = `Your current score: ${score}`; // Display score

        // Remove listners

        Array.from(boundaries).forEach(boundary => {
            boundary.removeEventListener("mouseover", gameEnd);
        });
        gameBody.removeEventListener("mouseleave", gameEnd);
        end.removeEventListener("mouseover", gameWin);
    }

})
