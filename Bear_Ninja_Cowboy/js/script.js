/* ======================
CACHE DOM NODES
=========================*/

const ninjaBtn = document.getElementById('ninja');
const bearBtn = document.getElementById('bear');
const cowboyBtn = document.getElementById('cowboy');
const compScoreDisplay = document.getElementById('computer-score');
const playerScoreDisplay = document.getElementById('player-score');
const levelDisplay = document.getElementById('level-number')
const gamePlayArea = document.getElementById('gamePlayArea');
const compCircle = document.querySelector('.fighter-circle#computer')
const playerCircle = document.querySelector('.fighter-circle#player');
const vsDiv = document.getElementById('vs');
const easyBtn = document.getElementById('level-easy');
const mediumBtn = document.getElementById('level-medium');
const hardBtn = document.getElementById('level-hard');
const levelModal = document.querySelector('.modal#level-select');
const resultsModal = document.querySelector('.modal#match-end');
const levelDiv = document.getElementById('level-box');
const arenaDiv = document.getElementById('arena');
const playerDiv = document.getElementById('panel');
const resultDiv = document.getElementById('resultDiv');
const resultComp = document.getElementById('computer-result');
const resultPlayer = document.getElementById('player-result');


/* ======================
DATA ARRAYS
=========================*/

const choiceOptions = [
  'ninja', 'bear', 'cowboy'
];

const easyGamePlay = [
  0, 1, 0, 2, 0, 0
];

const mediumGamePlay = [
  2, 1, 0, 1, 1, 0, 0, 2, 2, 0, 1, 2
];

const sprites = [
  'images/sprites/ninja.png',
  'images/sprites/ninja-won.png',
  'images/sprites/ninja-lost.png',
  'images/sprites/bear.png',
  'images/sprites/bear-won.png',
  'images/sprites/bear-lost.png',
  'images/sprites/cowboy.png',
  'images/sprites/cowboy-won.png',
  'images/sprites/cowboy-lost.png',
];


/* ======================
GLOBAL VARS
=========================*/

let computer = '';
let player = '';
let compChoice = null;
let playerChoice = null;
let computerScore = 0;
let playerScore = 0;
let gamePlay = '';
let easyPlayIndex = 0;
let mediumPlayIndex = 0;
let level = 1;

compScoreDisplay.innerHTML = computerScore;
playerScoreDisplay.innerHTML = playerScore;
levelDisplay.innerHTML = level;


/* ======================
GAME FUNCTIONS
=========================*/

// reset global variables for a new game

const gameReset = (newLevel) => {
  computer = '';
  player = '';
  computerScore = 0;
  playerScore = 0;
  gamePlay = '';
  easyPlayIndex = 0;
  medPlayIndex = 0;
  level = newLevel;
}


// toggles game board visibility

const toggleBoard = () => {
  // expose game arena
  levelDiv.classList.toggle('open');
  arenaDiv.classList.toggle('open');
  playerDiv.classList.toggle('open');
}

// set the arena with the warriors

const setMatch = () => {
  // have computer make their choice
  compChoice = generateCompChoice();

  // move player sprite into arena
  const playerSprite = document.createElement('img');
  playerSprite.setAttribute('src', sprites[playerChoice*3]);
  playerCircle.appendChild(playerSprite);

  // move computer sprite into the arena
  const compSprite = document.createElement('img');
  compSprite.setAttribute('src', sprites[compChoice*3]);
  compCircle.appendChild(compSprite);

  // for debugging
  console.log(`player: ${choiceOptions[playerChoice]}`);
  console.log(`computer: ${choiceOptions[compChoice]}`);
  //

  matchResults();
}


// have computer make their choice & return back to matchResults

const generateCompChoice = () => {

  if (gamePlay == 'hard') {
    //sets computer choice to random selection from options array
    let choice = Math.floor(Math.random() * choiceOptions.length);
    return choice;

  } else if (gamePlay == 'easy') {
    //sets computer choice to current easy play index selection
    let choice = easyGamePlay[easyPlayIndex];

    //increments easy play index selection or sets it back to 0 if at end of array
    if (easyPlayIndex < easyGamePlay.length-1) {
      easyPlayIndex++;
    } else {
      easyPlayIndex = 0;
    }

    return choice;

  } else if (gamePlay == 'medium') {
    //sets computer choice to current medium play index selection
    let choice = mediumGamePlay[mediumPlayIndex];

    //increments medium play index selection or sets it back to 0 if at end of array
    if (mediumPlayIndex < mediumGamePlay.length-1) {
      mediumPlayIndex++;
    } else {
      mediumPlayIndex = 0;
    }

    return choice;

  } else {
    console.log('ERROR: gamePlay not set');
  }

}


// see who wins match

const matchResults = () => {
  console.log('matchResults: ', compChoice, playerChoice);

  if ((playerChoice == 0 && compChoice == 1) ||
  (playerChoice == 1 && compChoice == 2) ||
  (playerChoice == 2 && compChoice == 0)) {
    computerWins();
  } else if ((playerChoice == 0 && compChoice == 2) ||
  (playerChoice == 1 && compChoice == 0) ||
  (playerChoice == 2 && compChoice == 1)){
    playerWins();
  } else {
    console.log(`It's a draw :(`);
    resultDiv.innerHTML = 'It\'s a draw :(';
  }

  // roundCheck();
}


// reflect who wins match/update points

const computerWins = () => {
  // increments/decrements scores
  computerScore++;
  playerScore--;
  updateScore();

  // displays winner & loser sprites
  matchEnd('computer');
}

const playerWins = () => {
  // increments/decrements scores
  playerScore++;
  computerScore--;
  updateScore();

  // displays winner & loser sprites
  console.log(`You win!`);
  resultDiv.innerHTML = 'You win!';
  matchEnd('player');
}


// display new point totals

const updateScore = () => {
  compScoreDisplay.innerHTML = computerScore;
  playerScoreDisplay.innerHTML = playerScore;
}


// display for end of match

const matchEnd = (winner) => {
  // display results modal
  resultsModal.classList.toggle('open');

  // check who won & display right sprites
  if (winner === 'computer') {
    console.log(`The computer wins!`);
    resultDiv.innerHTML = 'You lost :(';

    const compResultsSprite = document.createElement('img');
    compResultsSprite.setAttribute('src', sprites[(compChoice*3)+1]);
    resultSprite.appendChild(compResultsSprite);
  }
  else if (winner === 'player') {
    console.log('matchEnd: player winner needs logic');
  }
  else {
    console.log('matchEnd: something broke');
  }
}


// checks to see if someone won the round

const roundCheck = () => {
  if (computerScore === 5) {
    // wipe away game control buttons & global vars
    resultDiv.innerHTML = 'The computer wins!';
    gameReset();

    // create 'play again' button
    createStartButton('PLAY AGAIN?');

  } else if (playerScore === 5) {
    // wipe away game control buttons
    resultDiv.innerHTML = 'You beat the computer!';
    gameReset();

    // create 'play again' button
    createStartButton('PLAY AGAIN?');

  }
}


/* ======================
ELEMENT CREATION FUNCTIONS
=========================*/

// creates new game start button

const createStartButton = (label) => {
  const newStartButton = document.createElement('button');
  newStartButton.id = "start_game";
  newStartButton.innerHTML = label;
  gamePlayArea.appendChild(newStartButton);

  const startButton = document.getElementById('start_game');

  startButton.addEventListener('click', (e) => {
    newGame();
  });
}



/* ======================
EVENT LISTENERS
=========================*/

// capture player choice

ninjaBtn.addEventListener('click', (e) => {
  playerChoice = 0;
  setMatch();
});

bearBtn.addEventListener('click', (e) => {
  playerChoice = 1;
  setMatch();
});

cowboyBtn.addEventListener('click', (e) => {
  playerChoice = 2;
  setMatch();
});


// set difficuly level

easyBtn.addEventListener('click', (e) => {
  // set game play to easy & start game
  gamePlay = 'easy';

  // hide level select modal
  levelModal.classList.toggle('open');

  // expose game arena
  toggleBoard();

});

mediumBtn.addEventListener('click', (e) => {
  // set game play to easy & start game
  gamePlay = 'medium';

  // hide level select modal
  levelModal.classList.toggle('open');

  // expose game arena
  toggleBoard();

});

hardBtn.addEventListener('click', (e) => {
  // set game play to easy & start game
  gamePlay = 'hard';

  // hide level select modal
  levelModal.classList.toggle('open');

  // expose game arena
  toggleBoard();

});



/* ======================
START GAME
=========================*/





/* psuedo game flow code scratchsheet
set global vars (empty)
draw start button [click]
draw difficulty level buttons [click]
match play:
- draw play options [click]
- play match
- wipe play options/declare winner/(?draw go again?[click])
- repeat
end of round/declare winner/draw replay button
reset global vars
draw difficulty level buttons...



*/
