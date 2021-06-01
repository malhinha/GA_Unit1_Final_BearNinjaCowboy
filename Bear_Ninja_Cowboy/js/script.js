/* ======================
CACHE DOM NODES
=========================*/

// buttons
const ninjaBtn = document.getElementById('ninja');
const bearBtn = document.getElementById('bear');
const cowboyBtn = document.getElementById('cowboy');
const easyBtn = document.getElementById('level-easy');
const mediumBtn = document.getElementById('level-medium');
const hardBtn = document.getElementById('level-hard');
const nutsBtn = document.getElementById('level-nuts');
const continueBtn = document.getElementById('continue');
const nextLevelBtn = document.getElementById('next-level');
const startLevelBtn = document.getElementById('start');
const restartBtn = document.getElementById('restart');
const quitBtn = document.getElementById('quit');
const replayBtn = document.getElementById('replay');
const yesBtn = document.getElementById('yes');
const noBtn = document.getElementById('no');

// displays
const compScoreDisplay = document.getElementById('computer-score');
const playerScoreDisplay = document.getElementById('player-score');
const levelDisplay = document.getElementById('level-number')
const gamePlayArea = document.getElementById('gamePlayArea');
const compCircle = document.querySelector('.fighter-circle#computer')
const playerCircle = document.querySelector('.fighter-circle#player');
const vsDiv = document.getElementById('vs');
// const levelDiv = document.getElementById('level-box');
const arenaDiv = document.getElementById('arena');
const playerDiv = document.getElementById('panel');
const resultDiv = document.getElementById('resultDiv');
// const resultComp = document.getElementById('computer-result');
const resultPlayer = document.getElementById('player-result');
const levelResultDiv = document.getElementById('level-result');
const levelIntroHeading = document.querySelector('.modal#level-intro h1');
const levelIntroDesc = document.querySelector('.modal#level-intro p');
const alertTitle = document.querySelector('.modal#alert p');

// modals, trays
const levelModal = document.querySelector('.modal#level-select');
const levelIntroModal = document.querySelector('.modal#level-intro');
const resultsModal = document.querySelector('.tray#match-end');
const playerWinnerDiv = document.getElementById('player-winner');
const playerLoserDiv = document.getElementById('player-loser');
const alertOverlay = document.getElementById('alert-overlay');


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

const hardGamePlay = [
  0, 1, 1, 0, 2, 0, 2, 2, 1, 0, 0, 1, 2, 0, 2
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

const levelDescriptions = [
  'First to 5 points wins!',
  'Now, first to 15 points wins!',
  'First to 15 points wins but win two in a row & get a bonus point. Lose two in a row: 1 point penalty!',
  '15 points is still the goal. Three wins in a row gets a double bonus (+2). Three losses in a row is a -3 point penalty!',
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
let computerStreak = 0;
let playerStreak = 0;
let gamePlay = '';
let easyPlayIndex = 0;
let mediumPlayIndex = 0;
let hardPlayIndex = 0;
let level = 1;

compScoreDisplay.innerHTML = computerScore;
playerScoreDisplay.innerHTML = playerScore;
levelDisplay.innerHTML = level;


/* ======================
GAME FUNCTIONS
=========================*/

// reset global variables for a new game

const gameReset = () => {
  computer = '';
  player = '';

  resetScores();
  resetStreak();

  gamePlay = '';
  easyPlayIndex = 0;
  medPlayIndex = 0;
  hardPlayIndex = 0;
  level = 1;
}


// reset game play indexes

const resetIndexes = () => {
  if (level < 5) {
    easyPlayIndex = 0;
    mediumPlayIndex = 0;
    hardPlayIndex = 0;
  } else {
    easyPlayIndex = Math.floor(Math.random() * easyGamePlay.length);
    mediumPlayIndex = Math.floor(Math.random() * mediumGamePlay.length);
    hardPlayIndex = Math.floor(Math.random() * hardGamePlay.length);
  }
}

// reset scores for game restarts or new level

const resetScores = () => {
  computerScore = 0;
  playerScore = 0;

  compScoreDisplay.innerHTML = computerScore;
  playerScoreDisplay.innerHTML = playerScore;
}

// reset winning/losing streaks

const resetStreak = () => {
  computerStreak = 0;
  playerStreak = 0;
}


// toggles game board visibility

const toggleBoard = () => {
  // expose game arena
  // levelDiv.classList.toggle('open');
  arenaDiv.classList.toggle('open');
  playerDiv.classList.toggle('open');
}


// set the arena with the warriors

const setMatch = () => {
  // have computer make their choice
  compChoice = generateCompChoice();

  // move player sprite into arena
  playerCircle.classList.toggle('empty');
  const playerSprite = document.createElement('img');
  playerSprite.setAttribute('src', sprites[playerChoice*3]);
  playerCircle.appendChild(playerSprite);

  // move computer sprite into the arena
  compCircle.classList.toggle('empty');
  const compSprite = document.createElement('img');
  compSprite.setAttribute('src', sprites[compChoice*3]);
  compCircle.appendChild(compSprite);

  // for debugging
  console.log(`player: ${choiceOptions[playerChoice]}`);
  console.log(`computer: ${choiceOptions[compChoice]}`);
  //

  matchResults();
}


// have computer make their choice & return back to setMatch

const generateCompChoice = () => {

  if (gamePlay == 'nuts') {
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

  } else if (gamePlay == 'hard') {
    //sets computer choice to current hard play index selection
    let choice = hardGamePlay[hardPlayIndex];
    console.log(`${hardPlayIndex}`);

    //increments hard play index selection or sets it back to 0 if at end of array
    if (hardPlayIndex < hardGamePlay.length-1) {
      hardPlayIndex++;
    } else {
      hardPlayIndex = 0;
    }

    return choice;

  } else {
    console.log('ERROR: gamePlay not set');
  }

}


// see who wins match

const matchResults = () => {
  // console.log('matchResults: ', compChoice, playerChoice);

  if ((playerChoice == 0 && compChoice == 1) ||
  (playerChoice == 1 && compChoice == 2) ||
  (playerChoice == 2 && compChoice == 0)) {
    computerWins();

  } else if ((playerChoice == 0 && compChoice == 2) ||
  (playerChoice == 1 && compChoice == 0) ||
  (playerChoice == 2 && compChoice == 1)){
    playerWins();

  } else {
    matchEnd('draw');

  }

}


// reflect who wins match/update points

const computerWins = () => {
  // increments/decrements scores
  computerScore++;
  playerScore--;

  // resets streak if momentum turn
  if (computerStreak < 0) {
    resetStreak();
  }

  // increments/decrements streaks
  computerStreak++;
  playerStreak--;

  // checks level & updates scoreboard numbers
  updateScore();

  // displays winner & loser sprites
  matchEnd('computer');
}

const playerWins = () => {
  // increments/decrements scores
  playerScore++;
  computerScore--;

  // resets streak if momentum turn
  if (playerStreak < 0 ) {
    console.log('this should happen when player streak is negative');
    resetStreak();
  }

  // increments/decrements streaks
  computerStreak--;
  playerStreak++;

  // checks level & updates scoreboard numbers
  updateScore();

  // displays winner & loser sprites
  matchEnd('player');
}


// check for streaks & display new point totals

const updateScore = () => {
  updateScoreDisplay();
  console.log(`update score streaks: ${playerStreak}, ${computerStreak}`);

  if (level == 3) {
    if (playerStreak == 2) {
      playerScore++;
      computerScore--;

      updateScoreDisplay();
      resetStreak();
    } else if (computerStreak == 2) {
      playerScore--;
      computerScore++;

      updateScoreDisplay();
      resetStreak();
    }
  } else if (level >= 4) {
    console.log('level 4 check true');
    if (playerStreak == 3) {
      playerScore+=2;
      computerScore-=3;

      updateScoreDisplay();
      resetStreak();
    } else if (computerStreak == 3) {
      playerScore-=3;
      computerScore+=2;

      updateScoreDisplay();
      resetStreak();
    }
  }
}


// update score display

const updateScoreDisplay = () => {
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
    resultDiv.innerHTML = 'Loser! :(';

    // display losing player sprite
    const resultPlayerSprite = document.createElement('img');
    resultPlayerSprite.setAttribute('src', sprites[(playerChoice*3)+2]);
    resultPlayer.appendChild(resultPlayerSprite);

  }
  else if (winner === 'player') {
    console.log(`You win!`);
    resultDiv.innerHTML = 'Winner!';

    // display winning player sprite
    const resultPlayerSprite = document.createElement('img');
    resultPlayerSprite.setAttribute('src', sprites[(playerChoice*3)+1]);
    resultPlayer.appendChild(resultPlayerSprite);

  }
  else if (winner === 'draw') {
    console.log(`It's a draw :(`);
    resultDiv.innerHTML = 'It\'s a draw';

  }
  else {
    console.log('matchEnd: something broke');
  }
}


// checks to see if someone won the round

const roundCheck = () => {
  if ((computerScore === 5 && level === 1) ||
  (computerScore === 15 && level >= 2)) {
    console.log(`computer wins the round`);

    // hide game arena
    toggleBoard();

    // display loser message
    levelResultDiv.innerHTML = "You got whupped.";

    // display "play again" button
    playerLoserDiv.classList.toggle('open');

  } else if ((playerScore === 5 && level === 1) ||
  (playerScore === 15 && level >= 2)) {
    console.log(`player wins the round`);

    // hide game arena
    toggleBoard();

    // display loser message
    levelResultDiv.innerHTML = `Round ${level} complete.`;

    // display quit & next level buttons
    playerWinnerDiv.classList.toggle('open');

  }
}


// display next level intro modal

const displayLevelIntro = () => {
  // update copy
  levelIntroHeading.innerHTML = `Round ${level}`;

  if (level <=4) {
    levelIntroDesc.innerHTML = `${levelDescriptions[level-1]}`;
  } else {
    levelIntroDesc.innerHTML = `Keep on killing it onto infinity!`;
  }

  levelIntroModal.classList.toggle('open');
}




/* ======================
ELEMENT CREATION FUNCTIONS
=========================*/



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

  // show level intro model
  displayLevelIntro();

});

mediumBtn.addEventListener('click', (e) => {
  // set game play to medium & begin play
  gamePlay = 'medium';

  // hide level select modal
  levelModal.classList.toggle('open');

  // show level intro model
  displayLevelIntro();

});

hardBtn.addEventListener('click', (e) => {
  // set game play to hard & begin play
  gamePlay = 'hard';

  // hide level select modal
  levelModal.classList.toggle('open');

  // show level intro model
  displayLevelIntro();

});

nutsBtn.addEventListener('click', (e) => {
  // set game play to nuts & begin play
  gamePlay = 'nuts';

  // hide level select modal
  levelModal.classList.toggle('open');

  // show level intro model
  displayLevelIntro();

});


// start next match

continueBtn.addEventListener('click', (e) => {
  // clear fighter circles
  document.querySelector('.fighter-circle#computer img').remove();
  document.querySelector('.fighter-circle#player img').remove();
  compCircle.classList.toggle('empty');
  playerCircle.classList.toggle('empty');

  // close match result modal
  resultsModal.classList.toggle('open');

  // clear result circle & message
  if (document.querySelector('#player-result img')) {
    document.querySelector('#player-result img').remove();
  }
  resultDiv.innerHTML = '';

  // check if someone player won/lost the round
  roundCheck();

});


// intro next level

nextLevelBtn.addEventListener('click', (e) => {
  // close level end modal & reset div
  playerWinnerDiv.classList.toggle('open');
  levelResultDiv.innerHTML = ``;

  // increment level
  level++;
  levelDisplay.innerHTML = level;

  // reset game play indexes, streaks & indexes
  resetScores();
  resetStreak();
  resetIndexes();

  // open intro modal
  displayLevelIntro();
});


// start next level

startLevelBtn.addEventListener('click', (e) => {
  // close intro modal
  levelIntroModal.classList.toggle('open');

  // expose game arena
  toggleBoard();
});


// replay current lost level

replayBtn.addEventListener('click', (e) => {
  // close level end modal & reset div
  playerLoserDiv.classList.toggle('open');
  levelResultDiv.innerHTML = ``;

  // reset game play indexes, streaks & indexes
  resetScores();
  resetStreak();
  resetIndexes();

  // open intro modal
  displayLevelIntro();

});


// quit the game

quitBtn.addEventListener('click', (e) => {
  alertOverlay.classList.toggle('open');
});


// if yes, do the right thing

yesBtn.addEventListener('click', (e) => {
  gameReset();
  toggleBoard();
  alertOverlay.classList.toggle('open');
  levelModal.classList.toggle('open');
});


// if no, close overlay

noBtn.addEventListener('click', (e) => {
  alertOverlay.classList.toggle('open');
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
