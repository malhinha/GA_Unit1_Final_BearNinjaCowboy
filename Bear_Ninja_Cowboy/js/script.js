// cache dom nodes

const ninjaBtn = document.getElementById('ninja');
const bearBtn = document.getElementById('bear');
const cowboyBtn = document.getElementById('cowboy');
const resultDiv = document.getElementById('result');
const compScoreDisplay = document.getElementById('computer_score');
const playerScoreDisplay = document.getElementById('player_score');

// array of options, play patterns

const choiceOptions = [
  'ninja', 'bear', 'cowboy'
];

const easyGamePlay = [
  0, 1, 0, 2, 0, 0
];

// global variables for player choices, scores, gameplay indexes

let computer = '';
let player = '';
let computerScore = 0;
let playerScore = 0;
let gamePlay = 'easy';
let easyPlayIndex = 0;
let medPlayIndex = 0;


// see who wins

const matchResults = (playerChoice) => {

  let compChoice = generateCompChoice();

  player = choiceOptions[playerChoice];
  computer = choiceOptions[compChoice];

  console.log(`player: ${player}`);
  console.log(`computer: ${computer}`);

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
}


// have computer make their choice

const generateCompChoice = () => {

  if (gamePlay == 'hard') {
    //sets computer choice to random selection from options array
    let choice = Math.floor(Math.random() * choiceOptions.length);
    return choice;
  }
  else if (gamePlay == 'easy') {
    //sets computer choice to current easy play index selection
    let choice = easyGamePlay[easyPlayIndex];

    //increments easy play index selection or sets it back to 0 if at end of array
    if (easyPlayIndex < easyGamePlay.length-1) {
      easyPlayIndex++;
    } else {
      easyPlayIndex = 0;
    }

    return choice;
  }

}

// reflect who wins/update points

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
