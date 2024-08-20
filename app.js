let gameSeq = [];
let userSeq = [];

let started = false;
let level = 0;
let btns = ["yellow","red","green","purple"];
let h2 = document.querySelector("h2");
document.addEventListener("keypress",function () {
    
    if(started == false)
    {
        console.log("Game is started");
        started = true;
        levelUp();
    }

});
function flashBtn (btn) {
    btn.classList.add("flash");
    setTimeout(function () {
     btn.classList.remove("flash");
    },250);
}
function userFlash (btn) {
    btn.classList.add("userFlash");
    setTimeout(function () {
     btn.classList.remove("userFlash");
    },250);
}

function levelUp (){
    userSeq = [];
    level++;
    h2.innerText =`level ${level}`;
    let ranIdx = Math.floor(Math.random ()*3);
    let ranColor = btns[ranIdx];
    let ranBtn = document.querySelector(`.${ranColor}`);

    gameSeq.push(ranColor);
    console.log(gameSeq);
    flashBtn(ranBtn);
    console.log(ranIdx);
    console.log(ranColor);
    console.log(ranBtn);
    
}
function highScore (userSeq) {
    for(let i = 0; userSeq.length; i++)
    {
        let max = userSeq[0],el;
        if(el>max)
        {
            console.log(`Highest Score was ${el}`);

        }else{
            console.log(`Highest score was ${max}`);
        }
    }
}

function checkAns (idx) {
    
    if(gameSeq[idx] == userSeq[idx])
    {
        if(userSeq.length == gameSeq.length){
            setTimeout(levelUp,1000);
        }
       
    }else{
        h2.innerHTML= `Game over!!,<b>Your score was ${level}<b> <br>Press any to start`;
        document.querySelector("body").style.backgroundColor="red";
        setTimeout(function (){
            document.querySelector("body").style.backgroundColor="white";
        },150);
        reset();
       // highScore(userSeq);

    //     for(let i = 0; userSeq.length; i++)
    //     {
    //         let max = userSeq[0],el;
    //         if(el>max)
    //         {
    //             console.log(`Highest Score was ${el}`);

    //         }else{
    //             console.log(`Highest score was ${max}`);
    //         }
    //     }
    // }
}
}
function btnPress () {
    console.log("Button was pressed");
    console.log(this);
    let btn = this;
    userFlash(btn);
    // flashBtn(btn);
    userColor = btn.getAttribute("id");
    userSeq.push(userColor);
    console.log(userSeq);

    checkAns(userSeq.length-1);
}

let allBtns = document.querySelectorAll(".btn");
for(btn of allBtns)
{
    btn.addEventListener("click",btnPress);
}

function reset (){
    level = 0;
    userSeq=[];
    gameSeq=[];
    started = false;
}