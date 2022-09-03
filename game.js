// Waiting till HTML page loads
window.addEventListener('load', pageLoad = () =>{
    // Variable Declaration
    const start = document.getElementById("start");
    const end = document.getElementById("end");
    const boundaries = document.getElementsByClassName("boundary");
    let game = false
    
    // Game Start Function
    const gameStart = () => {
        game = true
        Array.from(boundaries).forEach( boundary => {
            boundary.classList.remove("youlose");
        });
    }

    // Adding Listner
    start.onclick = function (){
        gameStart();
        Array.from(boundaries).forEach( boundary => {
            boundary.addEventListener("mouseleave", gameEnd);
        });
        end.addEventListener("mouseover", gameWin)
    }
     
    // Game Loose Function
    const gameEnd = () => {
        game = false
        Array.from(boundaries).forEach( boundary => {
            boundary.classList.add("youlose");
        });
        end.removeEventListener("mouseleave", gameWin)
    }
    

})
