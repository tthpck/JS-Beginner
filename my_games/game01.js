// create calculator
//create computer choice
//start game 
// when = check vs computer choice
//se corretto mostrare punteggio fino ad ora and go again
//otherwise start again

let userNumber = '';
let computerRandomNumber;
let computerChoice = null;
const $message = document.querySelector('.js-message');
const $message2 = document.querySelector('.js-message2');
const $number = document.querySelector('.js-input');
const $showScore = document.querySelector('.js-show-score');


const score = JSON.parse(localStorage.getItem('score'))|| {
  correct: 0,
  wrong: 0,
};

const saveScore = () => {
  localStorage.setItem('score', JSON.stringify(score));
}
 
  function updateMessage1 () {
    if (computerChoice === null) 
   $message.textContent = "Start the Game first!";
  else $message.textContent ='';
}

const isChoiceCorrect = () => {
  if ((userNumber % computerChoice) === 0) {
    $message.textContent = `Well done!`;
    score.correct++;
    saveScore()
  } else {
    $message.textContent = `Incorrect!`;
    score.wrong++;
    saveScore();
  }
  }



const clickButton = (button) =>{
      if (computerChoice === null) {
    $message.textContent = 'Start the Game first!'}
  else if (button === '=') {
    calculatesTotal();
  } else if (button === 'C') {
  userNumber = '';
  $number.value = ''
  $message.textContent = '';
  } else {
  userNumber = userNumber+= button;
  $number.value = userNumber;
  $message.textContent = '';
  }
 }

 const computerPicks = () => {
    computerRandomNumber = Math.random();
  if (computerRandomNumber > 0.66){
    computerChoice = 7;
  } else if (computerRandomNumber < 0.33){
    computerChoice = 3;
  } else computerChoice = 11
  $message2.textContent = `Next divider is number ${computerChoice}`;

 } 

 const restartGame = () => {
  computerChoice = null;
  userNumber = '';
  $number.value = '';
  $message.textContent = '';
  $message2.textContent = 'Start the Game!';
 }

 const showScore = () => {
  $showScore.textContent =`You gave ${score.correct} correct answers and ${score.wrong} incorrect answers this match`;
 }

 const restartScore = () => {
  score.correct = 0;
  score.wrong = 0;
 $showScore.textContent =`Score reset!`;
 }

//DA COMPLETARE QUESTA FUNZIONE - NON FUNZIONA BENE INSERIMENTO DA TASTIERA
 function keyboardWriting(key) {
  if (typeof key === 'number')
    $number.value = key;
  else if (key === 'Enter') calculatesTotal()
 }

 function calculatesTotal(){
  userNumber = eval(userNumber);
  $number.value = userNumber;
  isChoiceCorrect();
 }