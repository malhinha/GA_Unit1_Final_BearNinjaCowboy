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

// displays
const compScoreDisplay = document.getElementById('computer-score');
const playerScoreDisplay = document.getElementById('player-score');
const levelDisplay = document.getElementById('level-number')
const gamePlayArea = document.getElementById('gamePlayArea');
const compCircle = document.querySelector('.fighter-circle#computer')
const playerCircle = document.querySelector('.fighter-circle#player');
const vsDiv = document.getElementById('vs');
const levelDiv = document.getElementById('level-box');
const arenaDiv = document.getElementById('arena');
const playerDiv = document.getElementById('panel');
const resultDiv = document.getElementById('resultDiv');
const resultComp = document.getElementById('computer-result');
const resultPlayer = document.getElementById('player-result');
const levelResultDiv = document.getElementById('level-result');
const playerWinnerDiv = document.getElementById('player-winner');
const playerLoserDiv = document.getElementById('player-loser');

// modals, trays
const levelModal = document.querySelector('.modal#level-select');
const resultsModal = document.querySelector('.modal#match-end');
const levelEndModal = document.getElementById('round-end');


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
let level = 0;

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
  computerScore = 0;
  playerScore = 0;
  computerStreak = 0;
  playerStreak = 0;
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

    // display winning computer sprite
    const resultCompSprite = document.createElement('img');
    resultCompSprite.setAttribute('src', sprites[(compChoice*3)+1]);
    resultComp.appendChild(resultCompSprite);

    // display losing player sprite
    const resultPlayerSprite = document.createElement('img');
    resultPlayerSprite.setAttribute('src', sprites[(playerChoice*3)+2]);
    resultPlayer.appendChild(resultPlayerSprite);

  }
  else if (winner === 'player') {
    console.log(`You win!`);
    resultDiv.innerHTML = 'Winner!';

    // display losing computer sprite
    const resultCompSprite = document.createElement('img');
    resultCompSprite.setAttribute('src', sprites[(compChoice*3)+2]);
    resultComp.appendChild(resultCompSprite);

    // display winning player sprite
    const resultPlayerSprite = document.createElement('img');
    resultPlayerSprite.setAttribute('src', sprites[(playerChoice*3)+1]);
    resultPlayer.appendChild(resultPlayerSprite);

  }
  else if (winner === 'draw') {
    console.log(`It's a draw :(`);
    resultDiv.innerHTML = 'It\'s a draw';

    // redisplay played computer sprite
    const resultCompSprite = document.createElement('img');
    resultCompSprite.setAttribute('src', sprites[compChoice*3]);
    resultComp.appendChild(resultCompSprite);

    // redisplay played player sprite
    const resultPlayerSprite = document.createElement('img');
    resultPlayerSprite.setAttribute('src', sprites[playerChoice*3]);
    resultPlayer.appendChild(resultPlayerSprite);

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

    // displays end of round modal
    levelEndModal.classList.toggle('open');

    // display loser message
    levelResultDiv.innerHTML = "Game over. You lost.";

    // display "play again" button
    playerLoserDiv.classList.toggle('open');

  } else if ((playerScore === 5 && level === 1) ||
  (playerScore === 15 && level >= 2)) {
    console.log(`player wins the round`);

    // displays end of round modal
    levelEndModal.classList.toggle('open');

    // display loser message
    levelResultDiv.innerHTML = `Level ${level} complete. Ready for more?`;

    // display quit & next level buttons
    playerWinnerDiv.classList.toggle('open');

  }
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

  // expose game arena
  toggleBoard();

});

mediumBtn.addEventListener('click', (e) => {
  // set game play to medium & begin play
  gamePlay = 'medium';

  // hide level select modal
  levelModal.classList.toggle('open');

  // expose game arena
  toggleBoard();

});

hardBtn.addEventListener('click', (e) => {
  // set game play to hard & begin play
  gamePlay = 'hard';

  // hide level select modal
  levelModal.classList.toggle('open');

  // expose game arena
  toggleBoard();

});

nutsBtn.addEventListener('click', (e) => {
  // set game play to nuts & begin play
  gamePlay = 'nuts';

  // hide level select modal
  levelModal.classList.toggle('open');

  // expose game arena
  toggleBoard();

});


// start next match

continueBtn.addEventListener('click', (e) => {
  // clear fighter circles
  document.querySelector('.fighter-circle#computer img').remove();
  document.querySelector('.fighter-circle#player img').remove();

  // close match result modal
  resultsModal.classList.toggle('open');

  // clear result circles
  document.querySelector('#computer-result img').remove();
  document.querySelector('#player-result img').remove();
  resultDiv.innerHTML = '';

  // check if someone player won/lost the round
  roundCheck();

});


// start next level

nextLevelBtn.addEventListener('click', (e) => {
  // close level end modal & reset div
  levelEndModal.classList.toggle('open');
  playerWinnerDiv.classList.toggle('open');
  levelResultDiv.innerHTML = ``;

  // increment level
  level++;
  levelDisplay.innerHTML = level;

  // reset game play indexes, streaks & indexes
  resetScores();
  resetStreak();
  resetIndexes();

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
