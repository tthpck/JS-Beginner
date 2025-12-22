const state = JSON.parse(localStorage.getItem('state')) || {
  playerName: '',
  nameStatus: '',
  points: 0,
  screen: 'home',
  answersRecord: [],
  gameType: '',
  gameLevel: '',
}

// da fare renderHomeSCreen renderLevelScreen e renderQuizScreen



//render FINITO - se non si cambia nulla
function render(){
  if(state.screen === 'home') {
    renderHomeScreen();
  } else if (state.screen === 'add-sub' || state.screen === 'count') {
    renderLevelScreen(state.gameType);
  } else if (state.screen === 'quiz') {
    renderQuizScreen();}
}

//update state -- finito
function setState(patch){
  Object.assign(state, patch)
  localStorage.setItem('state', JSON.stringify(state))
  render();
}

//username selection FINITO
function userNameSelection(){
  const userSelButton = document.querySelector('.js-user-name-selection');
  const userSelInput = document.querySelector('.js-user-name-input');


  if (!state.nameStatus){
    userSelButton.textContent = `COME TI CHIAMI?`;
    userSelButton.addEventListener('click', ()=> {
      userSelInput.classList.remove('hidden');
      setState({nameStatus: 'editing'});
      render();
    })
  } else if (state.nameStatus === 'editing'){
    userSelButton.textContent = 'MI CHIAMO';
    userSelInput.classList.remove('hidden');
    userSelButton.addEventListener('click', () => {
      userSelInput.classList.add('hidden');
      setState({playerName: (userSelInput.value).toUpperCase(), nameStatus: 'confirmed'});
      render();
    })
  } else if (state.nameStatus === 'confirmed'){
    userSelButton.textContent = `CIAO ${state.playerName}, VUOI CAMBIARE NOME?`;
    userSelButton.addEventListener('click', () => {
      userSelInput.classList.remove('hidden');
      setState({nameStatus: 'editing'});
      render();
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


function renderHomeScreen() {

    document.querySelector('.js-full-screen').innerHTML = 
      `<div class = "screen js-screen-home active">
        <div><h1>BENVENUTA A FUNMATH ${state.playerName}!</h1></div>
            <div>
                <button class = "js-user-name-selection user-selection"></button>
                <input type = "text-box" class = " js-user-name-input hidden">
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
      render();
    });

    document.querySelectorAll('.js-difficulty-button').forEach(button => {
      button.addEventListener('click', () => {
        setState({screen: 'quiz', gameLevel: button.value});
        renderQuizScreen()
      })
    })

}

function renderQuizScreen() {
  document.querySelector('.js-full-screen').innerHTML =         `
    <div class = "screen js-screen-quiz">
      <div>
          <h2>QUALE E' IL RISULTATO DI:</h2>
            <div class = "js-game">
            </div>
              <br>
              <input>
              <br>
          <button> 7</button>
          <button> 8</button>
          <button> 9</button>
          <br>
          <button> 4</button>
          <button> 5</button>
          <button> 6</button>
          <br>
          <button> 1</button>
          <button> 2</button>
          <button> 3</button>
          <br>
          <button>INVIO</button>
      </div>
      <button class = "js-back-level">INDIETRO</button>
    </div>`;

  document.querySelector('.js-back-level').addEventListener('click', () =>{
      setState({screen: state.gameType});
      render();
  });
    
  startGame()

}


function startGame(){

  const difficulty = state.gameLevel;
  const game = document.querySelector('.js-game');
  const sign = Math.floor(Math.random()*2)+1;

  const imgType1 = Math.floor(Math.random()*2)+1 //change the multiplier each time you add image types
  const imgNumber1 = Math.floor(Math.random()*2)+1 //min 0 max 9

  const imgType2 = Math.floor(Math.random()*2)+1 //change the multiplier each time you add image types
  const imgNumber2 = Math.floor(Math.random()*2)+1 //min 0 max 9

  game.innerHTML = `
    <img class = "game-images" src="./images/${difficulty}/type_${imgType1}_number_${imgNumber1}.png">
  
    <img class = "game-images" src = "./images/${difficulty}/sign_${sign}.png">

    <img class = "game-images" src="./images/${difficulty}/type_${imgType2}_number_${imgNumber2}.png">
  
  `
}

render()

