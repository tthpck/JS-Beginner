

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
let focusContent = document.querySelector('.js-focus-content');
const profileScreen = document.querySelector('.js-profile-screen');
let exploreScreenContent = document.querySelector('.js-explore-content');
const subAreaScreen = document.querySelector('.js-subsections-screen');
let subAreaContent = document.querySelector('.js-subsections-content');
const actionsScreen = document.querySelector('.js-actions-screen');
let actionsContent = document.querySelector('.js-actions-content');

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
  userName = localStorage.getItem('user');
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

  focusContent.innerHTML = '';

  if (myFocus.length !== 0) {
  myFocus.forEach((focus,index) => {
  const focusCard = document.createElement('div');
  focusCard.classList.add('focus-div')

  const focusText = document.createElement('p');
  focusText.textContent = (focus)

  const focusButton = document.createElement('button');
   focusButton.textContent = ('Remove')
   focusButton.classList.add('focus-remove-button')

   const focusCheckBox = document.createElement('input');
   focusCheckBox.type = ('checkbox');

   focusCard.appendChild(focusCheckBox);
   focusCard.appendChild(focusText);
   focusCard.appendChild(focusButton);

   focusContent.appendChild(focusCard);



   focusButton.addEventListener('click', () =>{
    myFocus.splice(index, 1);
    localStorage.setItem('focus', JSON.stringify(myFocus))
    updateMyFocus();
   })
})} else {

  const placeHolderText = document.createElement('p');
  placeHolderText.textContent = ('Add a focus and start changing your life!');

  focusContent.appendChild(placeHolderText);
}}


//explore screen

function renderExploreScreen(){

  const macroNames = Object.keys(areaDatabase);

  exploreScreenContent.innerHTML = '';

  macroNames.forEach(macroName => {

  const macroCard = document.createElement('div');
  macroCard.classList.add('macro-div');

  const macroButton = document.createElement('button');
  macroButton.classList.add('macro-button');
  macroButton.value = (macroName)
  macroButton.textContent = (macroName);


  macroButton.addEventListener('click', (event) => {
    renderSubArea(event.target.value)
  }
  )

  macroCard.appendChild(macroButton);
  exploreScreen.appendChild(macroCard)



  })
}



//function sub areas

function renderSubArea(macroName) {
    changeScreen(subAreaScreen)

    const subArea = areaDatabase[macroName]

subAreaContent.innerHTML = '';

subArea.forEach(area => {

const subAreaCard = document.createElement('div');
subAreaCard.classList.add('subarea-div');

const subAreaButton = document.createElement('button');
subAreaButton.classList.add('subarea-button');
subAreaButton.value = (area);
subAreaButton.textContent = (area);

subAreaButton.addEventListener('click', (event) => {
  renderActions(macroName, event.target.value)
})

subAreaCard.appendChild(subAreaButton)
subAreaContent.appendChild(subAreaCard);

})
}





//function actions buttons

function renderActions(macroName, subarea){
  changeScreen(actionsScreen) 
  
  const actions = actionsDatabase[macroName][subarea]

actionsContent.innerHTML = '';

actions.forEach(actionText => {

  const actionCard = document.createElement('div');
  actionCard.classList.add('action-div');

  const cardText = document.createElement('p');
  cardText.textContent = (actionText)

  const cardButton = document.createElement('button');
  cardButton.textContent = ('Add to My Focus');

  cardButton.addEventListener('click', () => {
        if (myFocus.includes(actionText)) return
        else {
        myFocus.push(actionText);
        localStorage.setItem('focus', JSON.stringify(myFocus));
        updateMyFocus();
        }
      })
  
  actionCard.appendChild(cardText);
  actionCard.appendChild(cardButton);

  actionsContent.appendChild(actionCard)
})

}






