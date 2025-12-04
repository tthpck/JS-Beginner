

//buttons
const homeButton = document.querySelectorAll('.js-home-button');
const exploreButton = document.querySelectorAll('.js-explore-button');
const focusButton = document.querySelectorAll('.js-focus-button');
const profileButton = document.querySelectorAll('.js-profile-button');
const selectUserName = document.querySelector('.js-username-selection');

//screens
const allScreens = document.querySelectorAll('.screen');
const homeScreen = document.querySelector('.js-home-screen');
const homeContent = document.querySelector('.js-home-content');
const exploreScreen = document.querySelector('.js-explore-screen');
const focusScreen = document.querySelector('.js-focus-screen');
let focusContent = document.querySelector('.js-focus-content');
const profileScreen = document.querySelector('.js-profile-screen');
let profileContent = document.querySelector('.js-profile-content');
const statsContent = document.querySelector('.js-stats-content');
let exploreScreenContent = document.querySelector('.js-explore-content');
const subAreaScreen = document.querySelector('.js-subsections-screen');
let subAreaContent = document.querySelector('.js-subsections-content');
const actionsScreen = document.querySelector('.js-actions-screen');
let actionsContent = document.querySelector('.js-actions-content');


//my focus content

const myFocus = JSON.parse(localStorage.getItem('focus')) || [];



const completedHistory = JSON.parse(localStorage.getItem('history')) || [];

const todayDate = new Date().toDateString();
const lastReset = localStorage.getItem('lastReset');

const dailyProgress =  JSON.parse(localStorage.getItem('daily')) || {
  completed: 0,
  dailyStreak: false,
  dailyStreakDays: 0,
  percentageCompleted: 0,
}
//If new day

   if (todayDate !== lastReset) {
      myFocus.forEach(item => item.done = false)
    localStorage.setItem('lastReset', todayDate);
    localStorage.setItem('focus', JSON.stringify(myFocus))
    if (dailyProgress.completed === 0) {
        dailyProgress.dailyStreakDays = 0;
        dailyProgress.dailyStreak = false;
    };
    dailyProgress.completed = 0;
    dailyProgress.percentageCompleted = 0;
    localStorage.setItem('daily', JSON.stringify(dailyProgress));
  };


//event listeners buttons

homeButton.forEach(button => 
    button.addEventListener('click', () => {
      changeScreen(homeScreen)
      updateHomeScreen();
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
      changeScreen(focusScreen);
      updateMyFocus();
    }
  ));
  
  profileButton.forEach(button => 
    button.addEventListener('click', () => {
      changeScreen(profileScreen);
      renderProfileScreen();
  }
));



//function screen buttons

function changeScreen(screen){
  allScreens.forEach(s => {
    s.classList.add('hidden');
  })
  screen.classList.remove('hidden')
}


updateMyFocus();
updateHomeScreen();

//Home screen function

function updateHomeScreen() {

  let userName = localStorage.getItem('username') || '';
const mainFocus = myFocus.filter(focus => focus.main === true)

  const logoCard = document.createElement('div');
  logoCard.classList.add('title-card');
  logoCard.textContent = 'SmartStrive';

  const welcomeCard = document.createElement('div');
  welcomeCard.classList.add('welcome-card');
  welcomeCard.textContent = renderUserName();

  const motivationCard = document.createElement('div');
  motivationCard.classList.add('motivation-card');
  motivationCard.textContent = ('Focus on the 20. Obtain the 80!')

  const mainFocusCard = document.createElement('div');
  mainFocusCard.classList.add('main-focus-card');
  const motivationCardTitle = document.createElement('p')
  motivationCardTitle.textContent = (`MY MAIN FOCUS TODAY`);
  motivationCard.appendChild(motivationCardTitle);
  showMainFocus();

  homeContent.innerHTML = '';

    function renderUserName(){
  if (userName) {return `Hi, ${userName}` }
   else return welcomeCard.innerHTML = `Hi, There!`
  };

  homeContent.appendChild(logoCard);
  homeContent.appendChild(welcomeCard);
  homeContent.appendChild(motivationCard);
  homeContent.appendChild(mainFocusCard);

  function showMainFocus() {
    mainFocus.forEach(focus => {
      const focusCard = document.createElement('Div');
      focusCard.textContent = focus.text;
      motivationCard.appendChild(focusCard)
    })
  }
}


//my focus updating

function updateMyFocus() {

  focusContent.innerHTML = '';


  const focusHeaderCard = document.createElement('div');
  focusHeaderCard.classList.add('focus-header-card')
  const focusHeader = document.createElement('p');
  focusHeader.textContent = 'TODAY I WILL FOCUS ON';
  focusHeaderCard.appendChild(focusHeader);
  const focusClearButton = document.createElement('button');
  focusClearButton.classList.add('focus-clear-button', 'primary-button');
  focusClearButton.textContent = ('CLEAR ALL');
  focusClearButton.addEventListener('click',() => {
    myFocus.length = 0;
    updateMyFocus();
  })
  focusHeaderCard.appendChild(focusClearButton);

  focusContent.appendChild(focusHeaderCard);
  

  myFocus.sort((a,b) => a.done - b.done)
  updateMyFocus

  if (myFocus.length !== 0) {
  myFocus.forEach((focus,index) => {
  const focusCard = document.createElement('div');
  focusCard.classList.add('focus-div')
 

  const focusText = document.createElement('p');
  focusText.textContent = (focus.text)

  const focusButton = document.createElement('button');
   focusButton.textContent = ('Remove')
   focusButton.classList.add('focus-remove-button', 'secondary-button')

  const mainFocusButton = document.createElement('button');
  mainFocusButton.textContent = ('🔥');
  mainFocusButton.classList.add('main-focus-button', 'secondary-button');
  
  /*
   const focusCheckBox = document.createElement('input');
   focusCheckBox.type = ('checkbox');
   focusCheckBox.classList.add('focus-checkbox');
   focusCheckBox.checked = focus.done;
   

   focusCheckBox.addEventListener('change', () => {
    focus.done = focusCheckBox.checked;

    const numberCompleted = myFocus.filter(item => item.done).length;

    dailyProgress.percentageCompleted =
    myFocus.length === 0 ? 0 : numberCompleted / myFocus.length;

    dailyProgress.completed = numberCompleted;

    if (!dailyProgress.dailyStreak && numberCompleted > 0) {
        dailyProgress.dailyStreak = true;
        dailyProgress.dailyStreakDays++;
    }

    if (focus.done && !completedHistory.some(item => item.id === focus.id)) completedHistory.push(focus);

    localStorage.setItem('focus', JSON.stringify(myFocus));
    localStorage.setItem('daily', JSON.stringify(dailyProgress));
    localStorage.setItem('history', JSON.stringify(completedHistory));
*/
const toggleCompletion = document.createElement('div');
  toggleCompletion.classList.add('toggle-completion')
  if (focus.done) toggleCompletion.classList.add('active')
  
  toggleCompletion.textContent = focus.done? 'Completed!' : 'Tap to complete';

  toggleCompletion.addEventListener('click', () => {
    focus.done = !focus.done;
    
    if (focus.done) {toggleCompletion.classList.add('active')} else {toggleCompletion.classList.remove('active')};

    toggleCompletion.textContent = focus.done? 'Completed!' : 'Tap to complete';
    const numberCompleted = myFocus.filter(item => item.done).length;

    dailyProgress.percentageCompleted =
    myFocus.length === 0 ? 0 : numberCompleted / myFocus.length;

    dailyProgress.completed = numberCompleted;

    if (!dailyProgress.dailyStreak && numberCompleted > 0) {
        dailyProgress.dailyStreak = true;
        dailyProgress.dailyStreakDays++;
    }

    if (focus.done && !completedHistory.some(item => item.id === focus.id)) completedHistory.push(focus);

    localStorage.setItem('focus', JSON.stringify(myFocus));
    localStorage.setItem('daily', JSON.stringify(dailyProgress));
    localStorage.setItem('history', JSON.stringify(completedHistory));  
  })

   
   focusCard.appendChild(toggleCompletion);
   focusCard.appendChild(focusText);
   focusCard.appendChild(mainFocusButton);
   focusCard.appendChild(focusButton);

   focusContent.appendChild(focusCard);


   mainFocusButton.addEventListener('click', () => {
    focus.main = !focus.main;
    localStorage.setItem('focus', JSON.stringify(myFocus))
    updateMyFocus()    
  })

  if (focus.main) focusCard.style.backgroundColor = ('red');

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
  exploreScreenContent.appendChild(macroCard)



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

      const newAction = {
      id: generateId(actionText),
      text: actionText,
      macro: macroName,
      sub: subarea,
      done: false,
      main: false,
      addedAt: Date.now()
      };

        if (myFocus.some(item => item.id === newAction.id)) return
        else {
        myFocus.push(newAction);
        localStorage.setItem('focus', JSON.stringify(myFocus));
        updateMyFocus();
        }

      })
  
  actionCard.appendChild(cardText);
  actionCard.appendChild(cardButton);

  actionsContent.appendChild(actionCard)
  
})

}

function renderProfileScreen(){

  profileContent.innerHTML = '';

  const userNameCard = document.createElement('div');

  const userNameInput = document.createElement('input');
  userNameInput.classList.add('username-input');
  const userNameButton = document.createElement('button');
  userNameButton.textContent = 'Choose UserName';
  userNameButton.classList.add('username-selection', 'primary-button')

  userNameCard.appendChild(userNameInput);
  userNameCard.appendChild(userNameButton);
  profileContent.appendChild(userNameCard);

  userNameButton.addEventListener('click', () => {
  const userNameChoice = userNameInput.value;
  localStorage.setItem('username', userNameChoice);
  userName = localStorage.getItem('username');
  renderUserName();
});

  statsContent.innerHTML = '';

  const statsCard = document.createElement('div');
  statsCard.classList.add('stats-card');
  const statsTitle = document.createElement('p');
  statsTitle.textContent = 'Your Stats are:'

  const completedText = document.createElement('p');
    completedText.textContent = `You have completed ${dailyProgress.completed} tasks today!`

  const dailyStreakDaysText = document.createElement('p');
    dailyStreakDaysText.textContent = `You are on a ${dailyProgress.dailyStreakDays} days streak of completed tasks!`

  const percentageCompletedText = document.createElement('p');
    percentageCompletedText.textContent = `You have completed ${dailyProgress.percentageCompleted*100}% of your daily tasks!`

  statsCard.appendChild(statsTitle);
  statsCard.appendChild(completedText);
  statsCard.appendChild(dailyStreakDaysText);
  statsCard.appendChild(percentageCompletedText);
  statsContent.appendChild(statsCard);

}



function generateId(text) {
  const day = new Date().toISOString().split('T')[0];
  return text.toLowerCase().replace(/[^a-z0-9]/g,'') +'_'+ day;
}