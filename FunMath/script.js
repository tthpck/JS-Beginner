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



//=========================RENDER==========================//

function render(){
  if(state.screen === 'home') {
    renderHomeScreen();
  } else if (state.screen === 'add-sub' || state.screen === 'count') {
    renderLevelScreen(state.gameType);
  } else if (state.screen === 'quiz') {
    renderQuizScreen();}
}

//=========================SET STATE==========================//
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

//=========================USERNAME SELECTION==========================//
function gameSelection(){
  const gameTypeButtons = document.querySelectorAll('.js-game-type');

  gameTypeButtons.forEach(button => {
    button.addEventListener('click', () => {
      setState({screen: button.value, gameType: button.value})
    })
  });
}

//=========================RENDER HOMESCREEN==========================//
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


//=========================RENDER LEVEL SCREEN==========================//
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
  if (state.gameType === 'add-sub'){
    renderAddSubLayout()
    renderAddSubGame();
    assignGamesEvents();
  } else if (state.gameType === 'count'){
    renderCountLayout()
    renderCountGame()
    assignGamesEvents()
  }
}


//=========================RENDER COUNT LAYOUT==========================//
function renderCountLayout(){
      document.querySelector('.js-full-screen').innerHTML = `
        <div class = "screen js-screen-quiz">
      <div>
          <h2>CONTA QUANTE SONO</h2>
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

//=========================RENDER COUNT GAME==========================//
function renderCountGame(){
  const game = document.querySelector('.js-game');
  const difficulty = state.gameLevel;


  const gameData = startGame();

  const countGame = [`
    <img class = "game-images" src="./images/${difficulty}/type_${gameData.imgType1}_number_${gameData.numbers[0]}.png">`
    ,
    `<img class = "game-images" src="./images/${difficulty}/type_${gameData.imgType2}_number_${gameData.numbers[1]}.png"></img>`
    ,
    `<img class = "game-images" src="./images/${difficulty}/type_${gameData.imgType3}_number_${gameData.numbers[2]}.png">` 
    ,
    `<img class = "game-images" src="./images/${difficulty}/type_${gameData.imgType4}_number_${gameData.numbers[3]}.png">`
    , 
    `<img class = "game-images" src="./images/${difficulty}/type_${gameData.imgType5}_number_${gameData.numbers[4]}.png">`
    , 
    `<img class = "game-images" src="./images/${difficulty}/type_${gameData.imgType6}_number_${gameData.numbers[5]}.png">` 
  ];

  Object.assign(state, {currentGame: countGame.slice(0,gameData.numberOfImages)
    .join('')})

  game.innerHTML = state.currentGame

  
}

//=========================RENDER ADD-SUB GAME==========================//
function renderAddSubGame(){
  const game = document.querySelector('.js-game');
  const difficulty = state.gameLevel;

  const gameData = startGame();

  Object.assign(state, {currentGame: `
    <img class = "game-images" src="./images/${difficulty}/type_${gameData.imgType1}_number_${gameData.numbers[0]}.png">

    <img class = "sign-images" src = "./images/${difficulty}/sign_${gameData.sign}.png">

    <img class = "game-images" src="./images/${difficulty}/type_${gameData.imgType2}_number_${gameData.numbers[1]}.png">
  `
 }) 
  game.innerHTML = state.currentGame;
}

//=========================ASSIGN QUIZ EVENTS==========================//
function assignGamesEvents(){ 
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
        input.value += button.value;
      })
    })

  document.querySelector('.js-delete-input').addEventListener('click', ()=>{
    input.value = ''
  })

  function checkResult(){
    const userInput = Number(input.value);
    const game = document.querySelector('.js-game');

    
    if (userInput === state.lastResult) {
      game.innerHTML = `
        <img class = "result" src = "./images/results/correct_1.png">
        <p class = 'answer correct-answer'>${userInput} E' GIUSTO!!</p>
        <br>
        <button class ="js-play-again play-again">GIOCA ANCORA</button>`;
      input.value = '';
      state.points++;
      localStorage.setItem('state',JSON.stringify(state))
      input.classList.add('hidden');
      document.querySelector('.js-play-again').addEventListener('click', () => {
        (state.gameType === 'add-sub')? renderAddSubGame() : renderCountGame()
        input.classList.remove('hidden');;
    })
    } else {
      game.innerHTML = `
      <img class ="result" src ="./images/results/incorrect_1.png">
      <p class = 'answer incorrect-answer'>${userInput} E' SBAGLIATO</p> 
      ` + state.currentGame;
      input.value = '';
    };
  };


  document.querySelector('.js-enter').addEventListener('click', () => checkResult())
}

//=========================RENDER QUIZ LAYOUT==========================//
function renderAddSubLayout(){
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

//=========================START GAME==========================// da migliorare con arrays imgtype
function startGame(){


  const imgType1 = Math.floor(Math.random()*3)+1 //change the multiplier each time you add image types
  const imgType2 = Math.floor(Math.random()*3)+1 //change the multiplier each time you add image types
  const imgType3 = Math.floor(Math.random()*3)+1 //change the multiplier each time you add image types
  const imgType4 = Math.floor(Math.random()*3)+1 //change the multiplier each time you add image types
  const imgType5 = Math.floor(Math.random()*3)+1 //change the multiplier each time you add image types
  const imgType6 = Math.floor(Math.random()*3)+1 //change the multiplier each time you add image typess

  let sign = Math.floor(Math.random()*2)+1;

  const n1 = (state.gameLevel === 'easy')? Math.floor(Math.random()*6)+1 : Math.floor(Math.random()*10)+1;
  const n2 = (state.gameLevel === 'easy')? Math.floor(Math.random()*6)+1 : Math.floor(Math.random()*10)+1;
  const n3 = (state.gameLevel === 'easy')? Math.floor(Math.random()*6)+1 : Math.floor(Math.random()*10)+1;
  const n4 = (state.gameLevel === 'easy')? Math.floor(Math.random()*6)+1 : Math.floor(Math.random()*10)+1;
  const n5 = (state.gameLevel === 'easy')? Math.floor(Math.random()*6)+1 : Math.floor(Math.random()*10)+1;
  const n6 = (state.gameLevel === 'easy')? Math.floor(Math.random()*6)+1 : Math.floor(Math.random()*10)+1;
  const numbers = [n1,n2,n3,n4,n5,n6];


  let result;

  const numberOfImages = Math.floor(Math.random()*6)+3

  if (state.gameType === 'add-sub' && sign === 2 && numbers[1] > numbers[0]){
      [numbers[0], numbers[1]] = [numbers[1], numbers[0]];
    } 
  
  if (state.gameType === 'add-sub'){
    result = (sign === 1)? Number(numbers[0] + numbers[1]) : (numbers[0] - numbers[1])
  } else {result = numbers.slice(0,numberOfImages).reduce((a,b) => a+b ,0)}



  Object.assign(state, {lastResult: result});

    return {
      imgType1, 
      imgType2, 
      imgType3, 
      imgType4, 
      imgType5, 
      imgType6, 
      sign, 
      numbers,
      result,
      numberOfImages,
    }

};


render()
