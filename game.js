// Waiting till HTML page loads
window.addEventListener('load', pageLoad = () =>{
    // Variable Declaration
    const start = document.getElementById("start");
    const end = document.getElementById("end");
    const boundaries = document.getElementsByClassName("boundary");
    let game = false
    
    // Game Start
    const gameStart = () => {
        game = true
        Array.from(boundaries).forEach( boundary => {
            boundary.classList.remove("youlose");
        });
    }


})
