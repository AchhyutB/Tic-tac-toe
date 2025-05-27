let boxes=document.querySelectorAll(".box");
let resetBtn=document.querySelector("#reset-btn");
let newGameBtn=document.querySelector("#new-btn");
let msgContainer=document.querySelector(".msg-container");
let msg=document.querySelector("#msg");




let turnO = true 




const winPatterns= [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];


const resetGame=()=>{
turnO = true;
enableBoxes();
msg.innerText="";
msgContainer.classList.add("hide");
winLine.style.width = "0";
winLine.style.transform = "rotate(0deg)";
};



boxes.forEach((box)=>{
    box.addEventListener("click",()=>{
        console.log("button was clicked");
        if(turnO){ 
            box.innerText="O";
            box.classList.add("o");
            turnO=false;
        } else {     
            box.innerText="X";
            box.classList.add("x");
        turnO=true;
        }
        box.disabled=true;


        checkWinner();
    });
});




const disableBoxes = ()=>{
    for(let box of boxes){
        box.disabled = true;
    }
};




const enableBoxes = ()=>{
    for(let box of boxes){
        box.disabled = false; 
        box.innerText="";
    }
};



const winLine = document.querySelector("#win-line");

const showWinLine = (pattern) => {
    const lineStyles = {
        "0,1,2": { top: "16.5%", left: "0%", width: "100%", rotate: "0deg" },
        "3,4,5": { top: "49.5%", left: "0%", width: "100%", rotate: "0deg" },
        "6,7,8": { top: "82.5%", left: "0%", width: "100%", rotate: "0deg" },
        "0,3,6": { top: "0%", left: "16.5%", width: "100%", rotate: "90deg" },
        "1,4,7": { top: "0%", left: "49.5%", width: "100%", rotate: "90deg" },
        "2,5,8": { top: "0%", left: "82.5%", width: "100%", rotate: "90deg" },
        "0,4,8": { top: "0%", left: "0%", width: "141%", rotate: "45deg" },
        "2,4,6": { top: "0%", left: "0%", width: "141%", rotate: "-45deg" },
    };

    const key = pattern.join(",");
    const style = lineStyles[key];

    if (style) {
        winLine.style.top = style.top;
        winLine.style.left = style.left;
        winLine.style.transform = `rotate(${style.rotate})`;
        winLine.style.width = style.width;
    }
};




const showWinner = (winner,pattern) => {
    msg.innerText=`Congratulations,Winner is ${winner}`;
    msgContainer.classList.remove("hide");
    disableBoxes();
    showWinLine(pattern);
};





const checkWinner = () => {
    for (let pattern of winPatterns) {
        let [i, j, k] = pattern;
        let pos1Val = boxes[i].innerText;
        let pos2Val = boxes[j].innerText;
        let pos3Val = boxes[k].innerText;

        if (pos1Val !== "" && pos1Val === pos2Val && pos2Val === pos3Val) {
            showWinner(pos1Val,pattern);
            return;
        }
    }
};





newGameBtn.addEventListener("click",resetGame);
resetBtn.addEventListener("click",resetGame);