const state = JSON.parse(localStorage.getItem('state')) || {
  playerName: '',
  nameStatus: '',
  points: 0,
  screen: 'home',
  answersRecord: [],
  gameType: '',
  gameLevel: '',
  lastResult: 0,
}

// da fare renderHomeSCreen renderLevelScreen e renderQuizScreen



//render da aggiornare per count
function render(){
  if(state.screen === 'home') {
    renderHomeScreen();
  } else if (state.screen === 'add-sub' || state.screen === 'count') {
    renderLevelScreen(state.gameType);
  } else if (state.screen === 'quiz') {
    renderQuizScreen();}
}

//=========================UPDATE STATE==========================//
function setState(patch){
  Object.assign(state, patch);
  localStorage.setItem('state', JSON.stringify(state));
  render();
}

//=========================USERNAME SELECTION==========================//
function userNameSelection(){
  const userSelButton = document.querySelector('.js-user-name-selection');
  const userSelInput = document.querySelector('.js-user-name-input');

  userSelInput.addEventListener('keyup', (event) => {
    if (event.key === 'Enter'){
        setState({playerName: (userSelInput.value).toUpperCase(), nameStatus: 'confirmed'});
    };
  });

  if (!state.nameStatus){
    userSelButton.textContent = `COME TI CHIAMI?`;
    userSelButton.addEventListener('click', ()=> {
      userSelInput.classList.remove('hidden');
      setState({nameStatus: 'editing'});
    })
  } else if (state.nameStatus === 'editing'){
    userSelButton.textContent = 'OK';
    userSelInput.classList.remove('hidden');
    userSelButton.addEventListener('click', () => {
      userSelInput.classList.add('hidden');
      setState({playerName: (userSelInput.value).toUpperCase(), nameStatus: 'confirmed'});
    })
  } else if (state.nameStatus === 'confirmed'){
    userSelButton.textContent = `CIAO ${state.playerName}, VUOI CAMBIARE NOME?`;
    userSelButton.addEventListener('click', () => {
      userSelInput.classList.remove('hidden');
      setState({nameStatus: 'editing'});
    })
  }  
}

//games selection da rivedere forse
function gameSelection(){
  const gameTypeButtons = document.querySelectorAll('.js-game-type');

  gameTypeButtons.forEach(button => {
    button.addEventListener('click', () => {
      setState({screen: button.value, gameType: button.value})
    })
  });
}

//render jhome screen selection da rivedere forse
function renderHomeScreen() {

    document.querySelector('.js-full-screen').innerHTML = 
      `<div class = "screen js-screen-home active">
        <div><h1>BENVENUTA A FUNMATH ${state.playerName}!</h1></div>
            <div>
                <button class = "js-user-name-selection user-selection"></button>
                <input type = "text-box" class = " js-user-name-input hidden" placeholder = "MI CHIAMO">
            </div>
                
        <div><h2>A COSA VUOI GIOCARE OGGI?</h2></div>

        <div>
            <button class = "js-game-type game-type" value = "add-sub"> ADDIZIONI E SOTTRAZIONI</button>
            <button class = "js-game-type game-type" value = "count"> CONTARE! </button>
        
            <div>
                <h1>HAI ${state.points} PUNTI</h1>
            </div>
        </div>
      </div>`;


    userNameSelection();
    gameSelection();


}


//render level screen selection da rivedere forse
function renderLevelScreen(game) {
        
  document.querySelector('.js-full-screen').innerHTML = 
    `<div class = "screen js-screen-level">
      <div>
        <h2>${
          (game === 'add-sub')? 'GIOCHIAMO A FARE ADDIZIONI E SOTTRAZIONI!' : 'GIOCHIAMO A CONTARE!'
        }</h2>
        <h2>SCEGLI UN LIVELLO</h2>
        <button class = "js-difficulty-button" value = "easy"> FACILE</button>
        <button class = "js-difficulty-button" value = "hard"> DIFFICILE</button>
      </div>
      <button class = "js-back-home">INDIETRO</button>
    </div>`;

    document.querySelector('.js-back-home').addEventListener('click', () =>{
      setState({screen: 'home', gameType: ''});
    });

    document.querySelectorAll('.js-difficulty-button').forEach(button => {
      button.addEventListener('click', () => {
        setState({screen: 'quiz', gameLevel: button.value});
      })
    })

}

//=========================RENDER QUIZ SCREEN==========================//
function renderQuizScreen() {
  renderQuizLayout()
  renderGame();
  assignQuizEvents();
}

//=========================RENDER GAME==========================//
function renderGame(){
  const game = document.querySelector('.js-game');
  const difficulty = state.gameLevel;

  const gameData = startGame();

  game.innerHTML = `
    <img class = "game-images" src="./images/${difficulty}/type_${gameData.imgType1}_number_${gameData.number1}.png">

    <img class = "game-images" src = "./images/${difficulty}/sign_${gameData.sign}.png">

    <img class = "game-images" src="./images/${difficulty}/type_${gameData.imgType2}_number_${gameData.number2}.png">
  `;
}

//=========================ASSIGN QUIZ EVENTS==========================//
function assignQuizEvents(){
  document.querySelector('.js-back-level').addEventListener('click', () =>{
    setState({screen: state.gameType});
  });

  const input = document.querySelector('.js-calc-input');

  input.addEventListener('keyup', event => {
    if (event.key === 'Enter'){checkResult()}
  })
  document.querySelectorAll('.js-calc-button')
    .forEach(button => {
      button.addEventListener('click', () =>{
        input.value += button.value
      })
    })

  document.querySelector('.js-delete-input').addEventListener('click', ()=>{
    input.value = ''
  })

  function checkResult(){
    const userInput = Number(input.value)
    const gameHTML = document.querySelector('.js-game');

    if (userInput === state.lastResult) {
      gameHTML.innerHTML = `
        <img class = "result" src = "./images/results/correct_1.png">
        <p class = 'answer correct-answer'>${userInput} E' GIUSTO!!</p>
        <br>
        <button class ="js-play-again play-again">GIOCA ANCORA</button>`;
      input.value = '';
      Object.assign(state, {points: state.points++});
      document.querySelector('.js-play-again').addEventListener('click', () => {
      renderGame();
    })
    } else {
      gameHTML.innerHTML += `
      <img class ="result" src ="./images/results/incorrect_1.png">
      <p class = 'answer incorrect-answer'>${userInput} E' SBAGLIATO</p> 
      `;
    };
  };


  document.querySelector('.js-enter').addEventListener('click', () => checkResult())
}

//=========================RENDER QUIZ LAYOUT==========================//
function renderQuizLayout(){
  document.querySelector('.js-full-screen').innerHTML =         
    `
    <div class = "screen js-screen-quiz">
      <div>
          <h2>QUALE E' IL RISULTATO DI:</h2>
            <div class = "js-game">
            </div>
              <br>
              <input class = "js-calc-input calc-input">
              <br>
          <button class= "js-enter enter">INVIO</button>
          <br>
            <button class = "js-calc-button calc-button" value = "7">7</button>
            <button class = "js-calc-button calc-button" value = "8">8</button>
            <button class = "js-calc-button calc-button" value = "9">9</button>
            <br>
            <button class = "js-calc-button calc-button" value = "4">4</button>
            <button class = "js-calc-button calc-button" value = "5">5</button>
            <button class = "js-calc-button calc-button" value = "6">6</button>
            <br>
            <button class = "js-calc-button calc-button" value = "1">1</button>
            <button class = "js-calc-button calc-button" value = "2">2</button>
            <button class = "js-calc-button calc-button" value = "3">3</button>
          <br>
          <button class ="js-delete-input delete-input">CANCELLA</button>
      </div>
      <button class = "js-back-level">INDIETRO</button>
    </div>
    `;

}

//=========================START GAME==========================//
function startGame(){


  const imgType1 = Math.floor(Math.random()*2)+1 //change the multiplier each time you add image types
  const imgType2 = Math.floor(Math.random()*2)+1 //change the multiplier each time you add image types

  let sign = Math.floor(Math.random()*2)+1;
  let number1 = Math.floor(Math.random()*2)+1 //min 0 max 2
  let number2 = Math.floor(Math.random()*2)+1 //min 0 max 2

  if (sign === 2 && number2 > number1){
      [number1, number2] = [number2, number1]
    }
  
  let result = (sign === 1)? Number(number1 + number2) : (number1 - number2)

  Object.assign(state, {lastResult: result});

    return {
      imgType1, 
      imgType2, 
      sign, 
      number1, 
      number2, 
      result,
    }

};


render()

