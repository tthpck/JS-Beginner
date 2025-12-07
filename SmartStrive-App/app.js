

//buttons
const homeButton = document.querySelector('.js-home-button');
const exploreButton = document.querySelectorAll('.js-explore-button');
const focusButton = document.querySelectorAll('.js-focus-button');
const profileButton = document.querySelectorAll('.js-profile-button');
const selectUserName = document.querySelector('.js-username-selection');
const backButton = document.querySelector('.js-back-button');

//screens
const allScreens = document.querySelectorAll('.screen');
const onboardingScreen = document.querySelector('.js-onboarding-screen');
const onboardingContent = document.querySelector('.js-onboarding-content');
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

//variables
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


//onboarding check


const onboardingCompleted = localStorage.getItem('onboardingCompleted')

if (!onboardingCompleted) {
  document.querySelector('.js-nav-buttons').classList.add('hidden');
  changeScreen(onboardingScreen);
  renderOnboarding();
  } else {
  changeScreen(homeScreen);
  updateHomeScreen();
  setActive(homeButton)
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


    homeButton.addEventListener('click', () => {
      setActive(homeButton);
      changeScreen(homeScreen)
      updateHomeScreen();
    }
  );
  
  exploreButton.forEach(button => 
    button.addEventListener('click', () => {
      setActive(button);
      changeScreen(exploreScreen);
      renderExploreScreen();
    }
  ));
  
  focusButton.forEach(button => 
    button.addEventListener('click', () => {
      setActive(button);
      changeScreen(focusScreen);
      updateMyFocus();
    }
  ));
  
  profileButton.forEach(button => 
    button.addEventListener('click', () => {
      setActive(button);
      changeScreen(profileScreen);
      renderProfileScreen();
  }
));

//switch active classes nav buttons and screens
function setActive(button) {
  document.querySelectorAll('.nav-item').forEach(b => b.classList.remove('active'));
  button.classList.add('active');
}

function changeScreen(screen){
  allScreens.forEach(s => {
    s.classList.add('hidden');
  })
  screen.classList.remove('hidden')
}



// onboarding screen function

function renderOnboarding() {

onboardingContent.innerHTML = '';
const onboardingCard = document.createElement('div');
onboardingCard.classList.add('onboarding-card');

const onboardingTitle = document.createElement('div');
onboardingTitle.textContent = ('Welcome to SmartStrive');
onboardingTitle.classList.add('onboarding-title');
const OnboardingQuote = document.createElement('div');
OnboardingQuote.textContent = ('80% of your progress comes from 20% of your actions.');
OnboardingQuote.classList.add('onboarding-quote');
const OnboardingDescription = document.createElement('div');
OnboardingDescription.textContent = ('Discover your priorities, stay focused, and build habits that actually move your life forward.'); 
OnboardingDescription.classList.add('onboarding-description');
const onboardingUserQuote = document.createElement('div');
onboardingUserQuote.textContent = ('What should I call you?'); //to finish
onboardingUserQuote.classList.add('onboarding-user-quote');
const onboardingUserName = document.createElement('input');
onboardingUserName.classList.add('onboarding-username-input');
const onboardingButton = document.createElement('button');
onboardingButton.textContent = ('Choose')
onboardingButton.classList.add('onboarding-button');
const onboardingCTA = document.createElement('div');
const onboardingCTAButton = document.createElement('button');
onboardingCTAButton.textContent = ('Start My Day!')
onboardingCTA.classList.add('onboarding-CTA');
onboardingCTAButton.classList.add('onboarding-CTA-button')
onboardingCTA.appendChild(onboardingCTAButton);


onboardingButton.addEventListener('click', () => {
  const userName = onboardingUserName.value.trim();
  localStorage.setItem('username', userName);
  onboardingButton.textContent = ('Got it!')
})

onboardingCTAButton.addEventListener('click', () => {
      localStorage.setItem('onboardingCompleted', 'true')
      document.querySelector('.js-nav-buttons').classList.remove('hidden')
      changeScreen(homeScreen);
      setActive(homeButton)
      updateHomeScreen();

})

onboardingCard.append(onboardingTitle, OnboardingQuote, OnboardingDescription, onboardingUserQuote, 
  onboardingUserName, onboardingButton, onboardingCTA)

onboardingContent.appendChild(onboardingCard)



}


//Home screen function

function updateHomeScreen() {

  let userName = localStorage.getItem('username') || '';
  const mainFocus = myFocus.filter(focus => focus.main === true)

  const logoCard = document.createElement('div');
  logoCard.classList.add('title-card');
  logoCard.innerHTML = 'Focus on 20. Obtain 80.';

  const welcomeCard = document.createElement('div');
  welcomeCard.classList.add('welcome-card');
  welcomeCard.textContent = renderUserName();

  const motivationCard = document.createElement('div');
  motivationCard.classList.add('motivation-card');

  const mainFocusCard = document.createElement('div');
  mainFocusCard.classList.add('main-focus-card');
  const motivationCardTitle = document.createElement('p')
  motivationCardTitle.textContent = (`MY MAIN FOCUS TODAY`);
  motivationCard.appendChild(motivationCardTitle);
 ;

  homeContent.innerHTML = '';

    function renderUserName(){
  if (userName) {return `Hi, ${userName}` }
   else return welcomeCard.innerHTML = `Hi, There!`
  };

    showMainFocus();
    
  homeContent.appendChild(logoCard);
  homeContent.appendChild(welcomeCard);
  homeContent.appendChild(motivationCard);
  homeContent.appendChild(mainFocusCard);

  function showMainFocus() {
    mainFocus.forEach(focus => { 
      if (!focus.done){
      const focusCard = document.createElement('Div');
      focusCard.textContent = focus.text;
      mainFocusCard.appendChild(focusCard)
      }
  })
    
  }
}


//my focus screen update function

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


  if (myFocus.length === 0) {
    renderPlaceHolder()
    
  } else {

    myFocus.forEach((focus,index) => {
    const focusCard = document.createElement('div');
    focusCard.classList.add('focus-div')
  

    const focusText = document.createElement('p');
    focusText.textContent = (focus.text)

    const focusButton = document.createElement('button');
    focusButton.textContent = ('-')
    focusButton.classList.add('focus-remove-button', 'secondary-button')

    const mainFocusButton = document.createElement('button');
    mainFocusButton.textContent = ('🔥');
    mainFocusButton.classList.add('main-focus-button', 'secondary-button');
    
    
    const toggleCompletion = document.createElement('div');
    toggleCompletion.classList.add('toggle-completion')
    if (focus.done) toggleCompletion.classList.add('active')
    
    toggleCompletion.textContent = focus.done? '✔' : 'Tap to complete';

    toggleCompletion.addEventListener('click', () => {
      focus.done = !focus.done;


      if (focus.done) {
        toggleCompletion.classList.add('active')
        focusCard.classList.add('active')
      } else {
        toggleCompletion.classList.remove('active')
        focusCard.classList.remove('active')
      };

      toggleCompletion.textContent = focus.done? '✔' : 'Tap to complete';
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

    if (focus.done) focusCard.classList.add('active');
    else focusCard.classList.remove('active');

    if (focus.main) focusCard.classList.add("main");
    else focusCard.classList.remove("main");


    const actionsContainer = document.createElement('div');
    actionsContainer.classList.add('focus-actions');

    actionsContainer.appendChild(mainFocusButton);
    actionsContainer.appendChild(focusButton);

    focusCard.appendChild(actionsContainer);


    focusCard.appendChild(toggleCompletion);
    focusCard.appendChild(focusText);
    focusCard.appendChild(mainFocusButton);
    focusCard.appendChild(focusButton);

    focusContent.appendChild(focusCard);


    mainFocusButton.addEventListener('click', () => {
      focus.main = !focus.main;

      focus.main? focusCard.classList.add('main-active')
      : focusCard.classList.remove('main-active');

      localStorage.setItem('focus', JSON.stringify(myFocus))
      updateMyFocus()    
    })

    if (focus.main) focusCard.classList.add('main-active');

    focusButton.addEventListener('click', () =>{
      myFocus.splice(index, 1);
      localStorage.setItem('focus', JSON.stringify(myFocus))
      updateMyFocus();
    })
  })

}}

//render placerholder
function renderPlaceHolder() {
    const placeHolderText = document.createElement('p');
    placeHolderText.textContent = ('Add a focus and start changing your life!');
    focusContent.appendChild(placeHolderText);
}

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

  backButton.addEventListener('click', ()=> renderSubArea(macroName))
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
  const userNameChoice = userNameInput.value.trim();
  localStorage.setItem('username', userNameChoice);
  userNameButton.textContent = 'Saved!';
  updateHomeScreen();
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