// create calculator
//create computer choice
//start game 
// when = check vs computer choice
//se corretto mostrare punteggio fino ad ora and go again
//otherwise start again

let userNumber = '';
let computerRandomNumber;
let computerChoice;

const score = JSON.parse(localStorage.getItem('score'))|| {
  correct: 0,
  wrong: 0,
}

const saveScore = () => {
  localStorage.setItem('score', JSON.stringify(score));
}

const isChoiceCorrect = () => {
  if ((userNumber % computerChoice) === 0) {
    console.log(`Well done!`);
    score.correct++;
    saveScore()
  } else {
    console.log(`Incorrect!`);
    score.wrong++;
    saveScore();
  }
  }



const clickButton = (button) =>{
  if (computerChoice === null) {
    console.log('Start the Game first!')}
  else if (button === '=') {
  userNumber = eval(userNumber);
  console.log(userNumber) 
  } else if (button === 'C') {
  userNumber = '';
  console.log(0)
  } else {
  userNumber = userNumber+= button;
  console.log(userNumber)
  }
 }

 const computerPicks = () => {
  computerRandomNumber = Math.random();
  if (computerRandomNumber > 0.66){
    computerChoice = 7;
  } else if (computerRandomNumber < 0.33){
    computerChoice = 3;
  } else computerChoice = 11
  console.log(`Next divider is number ${computerChoice}`)
 } 

 const restartGame = () => {
  computerChoice = null;
  userNumber = '';
  console.log(0);
 }

 const showScore = () => {
  console.log(`You gave ${score.correct} correct answers and ${score.wrong} incorrect answers this match`)
 }

 const restartScore = () => {
  score.correct = 0;
  score.wrong = 0;
 }