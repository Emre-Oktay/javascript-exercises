let restartBtn = document.createElement('button');
let result = document.querySelector('#result');
let playerWins = 0;
let computerWins = 0;
let round = 0;

let buttons = document.querySelector('#buttons');
buttons.addEventListener('click', (event) => {
    let target = event.target;
    const computerSelection = getComputerChoice();
    playRound(computerSelection, target.id);
    updateScore(computerWins, playerWins, round);
});

function getComputerChoice() {
    const choices = ['rock', 'paper', 'scissors'];
    return choices[Math.floor(Math.random() * choices.length)];
}

function playRound(computerSelection, playerSelection) {
    const choices = ['rock', 'paper', 'scissors'];
    let outcome = '';

    if (playerSelection == 'rock') {
        if (computerSelection == 'rock') {
            outcome = 'Tie';
        } else if (computerSelection == 'paper') {
            outcome = 'Lose';
        } else {
            outcome = 'Win';
        }
    } else if (playerSelection == 'paper') {
        if (computerSelection == 'rock') {
            outcome = 'Win';
        } else if (computerSelection == 'paper') {
            outcome = 'Tie';
        } else {
            outcome = 'Lose';
        }
    } else if (playerSelection == 'scissors') {
        if (computerSelection == 'rock') {
            outcome = 'Lose';
        } else if (computerSelection == 'paper') {
            outcome = 'Win';
        } else {
            outcome = 'Tie';
        }
    }
    round++;
    if (outcome == 'Win') {
        playerWins++;
        result.textContent = `You win! ${playerSelection} beats ${computerSelection}`;
    } else if (outcome == 'Lose') {
        computerWins++;
        result.textContent = `You Lose! ${computerSelection} beats ${playerSelection}`;
    } else if (outcome == 'Tie') {
        result.textContent = 'It is a Tie!';
    }
}

function updateScore(computerWins, playerWins, round) {
    const score = document.querySelector('#score');
    if (round == 5) {
        const gameResult = document.querySelector('#gameResult');
        if (playerWins > computerWins) {
            gameResult.textContent = 'You Win!';
            score.textContent = `Player: ${playerWins} - Computer: ${computerWins}`;
        } else if (playerWins < computerWins) {
            gameResult.textContent = 'You Lose!';
            score.textContent = `Player: ${playerWins} - Computer: ${computerWins}`;
        } else {
            gameResult.textContent = 'Draw!';
            score.textContent = `Player: ${playerWins} - Computer: ${computerWins}`;
        }
        score.textContent = `Round: ${round}, Player: ${playerWins} - Computer: ${computerWins}`;
        restartBtn.addEventListener('click', restartGame());
        restartBtn.textContent = 'Restart';
        gameResult.appendChild(restartBtn);
    } else {
        score.textContent = `Round: ${round}, Player: ${playerWins} - Computer: ${computerWins}`;
    }
}

function restartGame() {
    playerWins = 0;
    computerWins = 0;
    round = 0;
    restartBtn.remove();
}
