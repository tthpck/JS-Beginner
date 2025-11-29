

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
        `<button class = "js-macro-button macro-button"> ${name}</button>`)
      .join ('');  

      document.querySelectorAll('.js-macro-button').forEach(button =>
        button.addEventListener('click', () =>{
          console.log('ciao')   //DA RIVEDERE
      })
      )

}


