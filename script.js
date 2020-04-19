
// Load polySynth from Tone.js
const polySynth = new Tone.PolySynth(Tone.Synth).toDestination();

const selectContainer = document.querySelector('.selection-container');
const startBtn = document.querySelector('.btn');
const timerSelect = document.querySelector('.timer');
const triadSelect = document.querySelector('.triad');

const messageDisplay = document.querySelector('.message');
const scoreDisplay = document.querySelector('.score');
const header = document.querySelector('.header');

const correctSelect = document.querySelector('.correct-img');
const incorrectSelect = document.querySelector('.incorrect-img');

const select1 = document.querySelector('.select-1');
const select2 = document.querySelector('.select-2');
const select3 = document.querySelector('.select-3');

let start = true;
let correctTriad = '';
let timer = 0;
let sharpFlat = "";
let score = 0;

// Array / Object of possible triads and their correct triads
const notes = ['A', 'B', 'C', 'D', 'E', 'F', 'G']
const triadArr = ['A', 'B', 'C', 'D', 'E', 'F', 'G']
const triadObj = {
  'A': 'AC#E',
  'B': 'BD#F#',
  'C': 'CEG',
  'D': 'DF#A',
  'E': 'EG#B',
  'F': 'FAC',
  'G': 'GBD',
}




// Display current note.
// Using the current note, search obj for corresponding triad and set this to correct answer in global var.
function setTriad(){
  const triad = triadArr[Math.floor(Math.random() * triadArr.length)];
  triadSelect.innerText = triad;
  correctTriad = triadObj[`${triad}`]
}

// Timer
    const timerFunc = setInterval(function(){
        timerSelect.innerHTML = timer;
        timer--;
        if(timer === 0){
            messageDisplay.innerText = "Game Over!";
            scoreDisplay.innerText = "Your score: " + score;
            reset();
        }
        },1000)


// Answer Input
function answerInput(keyCounter, keyCode){
   let currentSelected = document.querySelector(`.select-${keyCounter}`);

   currentSelected.classList.add("animate-input");
   currentSelected.addEventListener("animationend", function(){
       currentSelected.classList.remove("animate-input");
   })

   if(sharpFlat){
        currentSelected.innerText = keyCode.toUpperCase().concat(sharpFlat)
        sharpFlat = ''; 
   } else {
        currentSelected.innerText = keyCode.toUpperCase();
   }

}
// Check Answer
function checkAnswer(){
  const answer = select1.innerText.concat(select2.innerText, select3.innerText);
  if(answer === correctTriad){
    score++;
    setTriad();
    setCorrect();
    clearInputs();
    playCorrect(answer);
  } else {
    setIncorrect();
    clearInputs();
  }
}

// Play music triad
function playCorrect(answer){
    arr = [];

    for(let i = 0; i < answer.length; i++){
        if(!(answer[i] === "#" || answer[i] === "b")){    
            if((answer[i+1] === "#" || answer[i+1] === "b") && answer[i+1] !== "4"){
                arr.push(answer[i] + answer[i+1] + "4")
            } else {
                arr.push(answer[i] + "4")
            }
        }
    }
    polySynth.triggerAttackRelease(arr, "2n");
}

// Correct / Incorrect Display
function setCorrect(){
    incorrectSelect.style.visibility = "hidden";
    correctSelect.style.visibility = "visible";
    correctSelect.classList.add("animate-correct-img");
    correctSelect.addEventListener('animationend', function(){
        correctSelect.classList.remove("animate-correct-img");
    })
}

function setIncorrect(){
    incorrectSelect.style.visibility = "visible";
    correctSelect.style.visibility = "hidden";
    incorrectSelect.classList.add("animate-incorrect-img");
    incorrectSelect.addEventListener('animationend', function(){
        incorrectSelect.classList.remove("animate-incorrect-img");
    })
}


// Clear All Inputs
function clearInputs(){
  select1.innerText = '';
  select2.innerText = '';
  select3.innerText = '';
}
// Program
    let keyCounter = 1;

    window.addEventListener('keydown', function(e){
        if(e.key === 'ArrowUp'){
            sharpFlat = '#'
        } else if(e.key === 'ArrowDown'){
            sharpFlat = 'b'
        }
    })

    window.addEventListener('keyup', function(e){
      // On a keyup event, call function to input answer into the correct box. A counter will keep track of which box is the current input, up to 3.
      // After 3 inputs have been put in, call function to calculate whether the answer is correct or not. 
      // Once all the calculations are done, tally as correct or incorrect, clear inputs and start again with a different triad. 
      if(!(e.key == 'ArrowUp' || e.key == 'ArrowDown') && notes.includes(e.key.toUpperCase())){
        if(keyCounter <= 2 && start === true){
            answerInput(keyCounter, e.key);
            keyCounter++;
          } else if(keyCounter === 3 && start === true){
             answerInput(keyCounter, e.key);
             checkAnswer();
             keyCounter = 1;
          } 
      }
    })

// Reset Game 
function reset(){
    start = false;
    score = 0;
    timerSelect.style.visibility = "hidden";
    selectContainer.style.display = "none";
    triadSelect.style.display = "none";
    startBtn.style.visibility = "visible"
    scoreDisplay.style.display = "block";
    messageDisplay.style.display = "block";
    header.style.display = "block";
    incorrectSelect.style.visibility = "hidden";
    correctSelect.style.visibility = "hidden";
}

// Initialization

function init(){
  start = true;
  timer = 30;
  keycounter = 1;
  timerSelect.style.visibility = "visible";
  selectContainer.style.display = "flex";
  triadSelect.style.display = "block";
  startBtn.style.visibility = "hidden";
  scoreDisplay.style.display = "none";
  messageDisplay.style.display = "none";
  header.style.display = "none";
  
  clearInputs();
  setTriad();
}

reset();
startBtn.addEventListener("click", init)