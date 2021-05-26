/* ======================
CACHE DOM NODES
=========================*/

const ninjaBtn = document.getElementById('ninja');
const bearBtn = document.getElementById('bear');
const cowboyBtn = document.getElementById('cowboy');
const resultDiv = document.getElementById('result');
const compScoreDisplay = document.getElementById('computer-score');
const playerScoreDisplay = document.getElementById('player-score');
const gamePlayArea = document.getElementById('gamePlayArea');


/* ======================
DATA ARRAYS
=========================*/

const choiceOptions = [
  'ninja', 'bear', 'cowboy'
];

const easyGamePlay = [
  0, 1, 0, 2, 0, 0
];


/* ======================
GLOBAL VARS
=========================*/

let computer = '';
let player = '';
let computerScore = 0;
let playerScore = 0;
let gamePlay = 'easy';
let easyPlayIndex = 0;
let medPlayIndex = 0;

compScoreDisplay.innerHTML = computerScore;
playerScoreDisplay.innerHTML = playerScore;


/* ======================
GAME FUNCTIONS
=========================*/

// reset global variables for a new game

const gameReset = () => {
  computer = '';
  player = '';
  computerScore = 0;
  playerScore = 0;
  gamePlay = '';
  easyPlayIndex = 0;
  medPlayIndex = 0;
}


// create the gameboard for a new game

const newGame = () => {
  console.log('ready to start');
  // clears out game area & resets score
  resultDiv.innerHTML = '';
  gamePlayArea.innerHTML = '';
  compScoreDisplay.innerHTML = computerScore;
  playerScoreDisplay.innerHTML = playerScore;

  // creates difficulty level buttons
  createEasyButton();
  createMediumButton();
  createHardButton();
}


// see who wins match

const matchResults = (playerChoice) => {

  let compChoice = generateCompChoice();

  // for debugging
  player = choiceOptions[playerChoice];
  computer = choiceOptions[compChoice];
  console.log(`player: ${player}`);
  console.log(`computer: ${computer}`);
  //

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

  roundCheck();
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

  } else {
    console.log('ERROR: gamePlay not set');
  }

}


// reflect who wins match/update points

const computerWins = () => {
  computerScore++;
  playerScore--;
  console.log(`The computer wins!`);
  resultDiv.innerHTML = 'The computer wins!';
  updateScore();
}

const playerWins = () => {
  playerScore++;
  computerScore--;
  console.log(`You win!`);
  resultDiv.innerHTML = 'You win!';
  updateScore();
}

const updateScore = () => {
  compScoreDisplay.innerHTML = computerScore;
  playerScoreDisplay.innerHTML = playerScore;
}


// checks to see if someone won the round

const roundCheck = () => {
  if (computerScore === 5) {
    // wipe away game control buttons & global vars
    gamePlayArea.innerHTML = 'The computer wins!';
    gameReset();

    // create 'play again' button
    createStartButton('PLAY AGAIN?');

  } else if (playerScore === 5) {
    // wipe away game control buttons
    gamePlayArea.innerHTML = 'You beat the computer!';
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


// creates easy difficulty level button

const createEasyButton = () => {
  const newEasyButton = document.createElement('button');
  newEasyButton.id = "easy_level";
  newEasyButton.innerHTML = 'Easy';
  gamePlayArea.appendChild(newEasyButton);

  const easyButton = document.getElementById('easy_level');

  easyButton.addEventListener('click', (e) => {
    gamePlay = 'easy';
  });
}

// creates medium difficulty level button

const createMediumButton = () => {
  const newMediumButton = document.createElement('button');
  newMediumButton.id = "medium_level";
  newMediumButton.innerHTML = 'Medium';
  gamePlayArea.appendChild(newMediumButton);

  const mediumButton = document.getElementById('medium_level');

  mediumButton.addEventListener('click', (e) => {
    gamePlay = 'medium';
  });
}


// creates hard difficulty level button

const createHardButton = () => {
  const newHardButton = document.createElement('button');
  newHardButton.id = "hard_level";
  newHardButton.innerHTML = 'Hard';
  gamePlayArea.appendChild(newHardButton);

  const hardButton = document.getElementById('hard_level');

  hardButton.addEventListener('click', (e) => {
    gamePlay = 'hard';
  });
}

// creates Bear button


/* ======================
EVENT LISTENERS
=========================*/

// start new game

// startButton.addEventListener('click', (e) => {
//   newGame();
// });

// have player make their choices

ninjaBtn.addEventListener('click', (e) => {
  matchResults(0);
});

bearBtn.addEventListener('click', (e) => {
  matchResults(1);
});

cowboyBtn.addEventListener('click', (e) => {
  matchResults(2);
});


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
