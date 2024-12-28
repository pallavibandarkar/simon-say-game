let gameSeq = [];
let userSeq = [];
let highScore = [];

let started = false;
let level = 0;

let btns = ["red","yellow","green","purple"]

let h2 = document.querySelector("h2")
let p = document.querySelector("p")

document.addEventListener("click",()=>{
    if(started == false){
        console.log("Game is started")
        p.innerHTML = ``;
        started = true;
        levelUp()
    }
})

let sounds = {
    red: new Audio('https://raw.githubusercontent.com/pallavibandarkar/simon-say-game/main/Sounds/red.mp3'),        
    yellow: new Audio('https://raw.githubusercontent.com/pallavibandarkar/simon-say-game/main/Sounds/yellow.mp3'),  
    green: new Audio('https://raw.githubusercontent.com/pallavibandarkar/simon-say-game/main/Sounds/green.mp3'),    
    purple: new Audio('https://raw.githubusercontent.com/pallavibandarkar/simon-say-game/main/Sounds/purple.mp3')   
};

function playSound(color) {
    let sound = sounds[color];
    sound.play();
    setTimeout(() => {
        sound.pause();
        sound.currentTime = 0;
    }, 800);
}

function gameflash(btn){
    btn.classList.add("flash")

    setTimeout(()=>{
        btn.classList.remove("flash")
    },250)
    
}
function userflash(btn){
    btn.classList.add("userflash")

    setTimeout(()=>{
        btn.classList.remove("userflash")
    },250)
    
}

function levelUp(){
    userSeq = []
    level++;
    h2.innerText = `Level ${level}`

    let randomNum = Math.floor(Math.random() * 4);
    let ranColor = btns[randomNum]
    let ranBtn = document.querySelector(`.${ranColor}`)
    gameSeq.push(ranColor)
    console.log("Game Sequence:",gameSeq)
    gameflash(ranBtn)
    playSound(ranColor);
}

function checkAns(idx){
    if(userSeq[idx] == gameSeq[idx]){
        if(userSeq.length === gameSeq.length){
            setTimeout(levelUp,1000)
        }
    }else{
        highScore.push(level)
        let maxNum = Math.max(...highScore)
        console.log(maxNum)
        h2.innerHTML = `Game Over! Your Score was <b>${level}</b><br/> Press Any key to start`
        p.innerHTML = `<h2>Your highest score was ${maxNum} 🏆</h2>`;
        document.querySelector("body").style.backgroundColor="red"
        setTimeout(()=>{
            document.querySelector("body").style.backgroundColor="white"
        },500)
        reset()
    }
}

function btnPress(){
    let btn = this
    userflash(btn)
    let btnColor = btn.getAttribute("id")
    userSeq.push(btnColor)
    playSound(btnColor);
    checkAns(userSeq.length-1)
}

let allBtns = document.querySelectorAll(".btn")
for(btn of allBtns){
    btn.addEventListener("click",btnPress)
}

function reset(){
    started = false
    level = 0
    gameSeq = []
    userSeq = []
    
}
