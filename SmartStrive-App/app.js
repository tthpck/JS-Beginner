

//buttons
const homeButton = document.querySelectorAll('.js-home-button');
const exploreButton = document.querySelectorAll('.js-explore-button');
const focusButton = document.querySelectorAll('.js-focus-button');
const profileButton = document.querySelectorAll('.js-profile-button');
const selectUserName = document.querySelector('.js-username-selection');

//screens
const allScreens = document.querySelectorAll('.screen');
const homeScreen = document.querySelector('.js-home-screen');
const exploreScreen = document.querySelector('.js-explore-screen');
const focusScreen = document.querySelector('.js-focus-screen');
const focusContent = document.querySelector('.js-focus-content');
const profileScreen = document.querySelector('.js-profile-screen');
const exploreScreenContent = document.querySelector('.js-explore-content');
const subAreaScreen = document.querySelector('.js-subsections-screen');
const subAreaContent = document.querySelector('.js-subsections-content');
const actionsScreen = document.querySelector('.js-actions-screen');
const actionsContent = document.querySelector('.js-actions-content');

//p
const welcomeMessage = document.querySelector('.js-welcome-message');

//input
const inputUserName = document.querySelector('.js-username-input');



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


//userName

let userName = localStorage.getItem('username') || '';
renderUserName();

function renderUserName(){
  if (userName) {welcomeMessage.innerHTML = `Hi, ${userName}` 
  } else {welcomeMessage.innerHTML = `Hi, There!`}
};

//userName Selection

selectUserName.addEventListener('click', () => {
  const userNameChoice = inputUserName.value;
  localStorage.setItem('username', userNameChoice);
  userName = localStorage.getItem('username');
  renderUserName();
});

//function screen buttons

function changeScreen(screen){
  allScreens.forEach(s => {
    s.classList.add('hidden');
  })
  screen.classList.remove('hidden')
}

//my focus content

const myFocus = JSON.parse(localStorage.getItem('focus')) || [];

updateMyFocus()

function updateMyFocus() {
  if (myFocus.length === 0) {focusContent.innerHTML = 'Add a focus and start changing your life!'} 
    else { focusContent.innerHTML = myFocus
          .map(focus => `<p>${focus}</p> <button class = "js-delete-focus delete-focus">Remove</button>`)
          .join('');
  }

  document.querySelectorAll('.js-delete-focus')
    .forEach((button, index) => button.addEventListener('click', () => {
      myFocus.splice(index, 1);
      updateMyFocus();
    }))
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
    .map(action => `<ul>${action}</ul> <button class ="js-add-focus add-focus ">Add to My Focus</button>`)
    .join('');
  
  document.querySelector('.js-back-button')
    .addEventListener('click', () => {
      changeScreen(subAreaScreen)
    })

  document.querySelectorAll('.js-add-focus')
    .forEach((button, index) => 
      button.addEventListener('click', () => {
        if (myFocus.includes(actions[index])) return
        else {
        myFocus.push(actions[index]);
        localStorage.setItem('focus', JSON.stringify(myFocus));
        updateMyFocus();
        }
      })
    )
}



