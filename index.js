const gameBox = document.querySelector(".game__container");
const bestScoreobj = document.querySelector(".best__score");
const scoreobj = document.querySelector(".score");
const skipBtn = document.querySelector(".pass__btn");
const reStart = document.querySelector(".restart__btn");
const timeobj = document.querySelector(".time");
const gameover = document.querySelector(".gameover");

let best = 0;
let score = 0;
let skipTimes = 3;
let time = 60;
let numbersOfCells = 1;
let multiOfCellNum = 0;
let colorindex = 0;
let newCells;
let gameRunning = true
let timerID;

const colors = ["rgb(9, 66, 77)",
                "rgb(29, 58, 43)",
                "rgb(95, 50, 13)",
                "rgb(87, 8, 51)",
                "rgb(34, 80, 7)",
                "rgb(104, 13, 10)",
                "rgb(43, 60, 63)",
                "rgb(6, 26, 78)",
                "rgb(19, 53, 15)",
                "rgb(10, 51, 58)",
                "rgb(66, 47, 28)",
                "rgb(20, 68, 62)",
                "rgb(39, 21, 56)",
                "rgb(40, 58, 17)",
                "rgb(75, 9, 31)",
                "rgb(15, 25, 36)",
                "rgb(15, 41, 19)"];
const colorsTint = ["rgba(9, 66, 77,.93)",
                "rgba(29, 58, 43,.93)",
                "rgba(95, 50, 13,.93)",
                "rgba(87, 8, 51,.93)",
                "rgba(34, 80, 7,.93)",
                "rgba(104, 13, 10,.93)",
                "rgba(43, 60, 63,.93)",
                "rgba(6, 26, 78,.93)",
                "rgba(19, 53, 15,.93)",
                "rgba(10, 51, 58,.93)",
                "rgba(66, 47, 28,.93)",
                "rgba(20, 68, 62,.93)",
                "rgba(39, 21, 56,.93)",
                "rgba(40, 58, 17,.93)",
                "rgba(75, 9, 31,.93)",
                "rgba(15, 25, 36,.93)",
                "rgba(15, 41, 19,.93)"];
                

reStart.addEventListener("click", reStartGame);
gameover.addEventListener("click", start)
skipBtn.addEventListener("click", skip);



startGame();
function startGame() {
    
    if (gameRunning) {
        let cells = createCells(numbersOfCells);
    
    console.log(cells);
    let rend = getRandom();
    
    cells.forEach((e,i)=> {
        e.style.backgroundColor = colors[colorindex];
        gameBox.style.gridTemplateColumns = `repeat(${numbersOfCells},1fr)`
        if (i==rend) {
            e.style.backgroundColor = colorsTint[colorindex];
            e.addEventListener("click", nextLevel)
            
        }
        gameBox.appendChild(e)
    })
        if (colorindex == colors.length - 1)
            colorindex = 0;
        numbersOfCells += 1;
        colorindex += 1
        newCells = cells;
    }
    
}
 
function createCells(numofcells) {
    let cells = [];
    if (numofcells == 1) {
        numofcells = 2;
    } else {
        numofcells = numofcells * numofcells;
        multiOfCellNum = numofcells;
    }
    for (let i = 0; i < numofcells; i++){
        let cell = document.createElement("div");
        cell.setAttribute("class", "cell");
        cells.push(cell);
    }
    return cells;
 }

function getRandom() { 
    return Math.floor(Math.random() * multiOfCellNum);
}
function nextLevel() { 
    score += 5;
    scoreobj.textContent = score;
    newCells.forEach(e => {
        e.remove();
    })
    startGame();
}
function reStartGame() { 
        gameRunning = true;
        newCells.forEach(e => {
            e.remove();
        })
        clearTimeout(timerID);
        time = 60;
        numbersOfCells = 1;
        multiOfCellNum = 0;
        colorindex = 0;
    newCells = 0;
    score = 0;
    skipTimes = 3;
    scoreobj.textContent = score;
    skipBtn.textContent = `Skip(${skipTimes})`
    
    gameover.style.display = "none";
    gameTime();
    startGame();
}

function gameTime() {
    if (time == 0) {
        gameRunning = false;
        gameover.style.display = "flex";
        gameover.textContent ="Game Over!"
        clearTimeout(timerID);
        time = 10;
        if (best < score) {
            best = score;
            bestScoreobj.textContent=best
        }
    } else {
        
        time -=1;
        timeobj.textContent = time;
        timerID=setTimeout(gameTime, 1000);
    }
    
}
function start() {
    if (gameover.textContent == "Start Game!") {
        gameTime()
        gameover.style.display = "none";
    }
    
}

function skip() {
    if (skipTimes == 0) {
        return
    }
    skipTimes -= 1;
    skipBtn.textContent = `Skip(${skipTimes})`
    score -= 5;
    nextLevel();
}

