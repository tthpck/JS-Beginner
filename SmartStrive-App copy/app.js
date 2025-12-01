

//buttons
const homeButton = document.querySelectorAll('.js-home-button');
const exploreButton = document.querySelectorAll('.js-explore-button');
const focusButton = document.querySelectorAll('.js-focus-button');
const profileButton = document.querySelectorAll('.js-profile-button');


//screens
const allScreens = document.querySelectorAll('.screen');
const homeScreen = document.querySelector('.js-home-screen');
const exploreScreen = document.querySelector('.js-explore-screen');
const focusScreen = document.querySelector('.js-focus-screen');
const profileScreen = document.querySelector('.js-profile-screen');
const exploreScreenContent = document.querySelector('.js-explore-content');
const subAreaScreen = document.querySelector('.js-subsections-screen');
const subAreaContent = document.querySelector('.js-subsections-content');
const actionsScreen = document.querySelector('.js-actions-screen');
const actionsContent = document.querySelector('.js-actions-content');

//event listeners buttons

homeButton.forEach(button => 
    button.addEventListener('click', () => {
      changeScreen(homeScreen)
  }
));

exploreButton.forEach(button => 
    button.addEventListener('click', () => {
      changeScreen(exploreScreen);
      renderExploreScreen();
  }
));

focusButton.forEach(button => 
    button.addEventListener('click', () => {
      changeScreen(focusScreen)
    }
  ));
  
  profileButton.forEach(button => 
    button.addEventListener('click', () => {
      changeScreen(profileScreen)
  }
));



//function screen buttons

function changeScreen(screen){
  allScreens.forEach(s => {
    s.classList.add('hidden');
  })
  screen.classList.remove('hidden')
}


//function explore screen

function renderExploreScreen(){

  const macroNames = Object.keys(areaDatabase)

  exploreScreenContent.innerHTML= 
    macroNames
      .map(name => 
        `<button class = "js-macro-button macro-button" value = "${name}"> ${name}</button>`)
      .join ('');  

      document
        .querySelectorAll('.js-macro-button')
        .forEach(button =>
          button.addEventListener('click', (event) =>{
          renderSubArea(event.target.value)
      })
      )

}


//function sub-area buttons

function renderSubArea(macroName) {
    changeScreen(subAreaScreen)

    const subArea = areaDatabase[macroName]

    subAreaContent.innerHTML = subArea
      .map(area => `<button class = "js-subarea-button subarea-button" value = "${area}">${area}</button>`)
      .join('');


     document
      .querySelectorAll('.js-subarea-button')
      .forEach(button => {
        button.addEventListener('click', (event) => {
          renderActions(macroName, event.target.value)
        }) 
      })
}

//function actions buttons

function renderActions(macroName, subarea){
  changeScreen(actionsScreen) 
  
  const actions = actionsDatabase[macroName][subarea]

  actionsContent.innerHTML = actions
    .map(a => `<ul>${a}</ul>`)
    .join('')
      //still to add delete buttons

  
  document.querySelector('.js-back-button')
    .addEventListener('click', () => {
      changeScreen(subAreaScreen)
    })

}