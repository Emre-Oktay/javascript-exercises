function getComputerChoice(choices) {
    choices = ['rock', 'paper', 'scissors'];
    return choices[Math.floor(Math.random() * choices.length)];
}

function playRound(computerSelection, playerSelection) {
    choices = ['rock', 'paper', 'scissors'];
    if (
        playerSelection !== null &&
        choices.includes(playerSelection.toLowerCase())
    ) {
        playerSelection = playerSelection.toLowerCase();
    } else {
        return 'InvalidInput';
    }

    if (playerSelection == 'rock') {
        if (computerSelection == 'rock') {
            return 'Tie';
        } else if (computerSelection == 'paper') {
            return 'Lose';
        } else {
            return 'Win';
        }
    } else if (playerSelection == 'paper') {
        if (computerSelection == 'rock') {
            return 'Win';
        } else if (computerSelection == 'paper') {
            return 'Tie';
        } else {
            return 'You Lose! Scissors beats Paper';
        }
    } else if (playerSelection == 'scissors') {
        if (computerSelection == 'rock') {
            return 'Lose';
        } else if (computerSelection == 'paper') {
            return 'Win';
        } else {
            return 'Tie';
        }
    }
}

function playGame(numberOfRounds = 5) {
    let playerWins = 0;
    let computerWins = 0;
    for (let round = 1; round <= numberOfRounds; round++) {
        const playerSelection = prompt('Choose your move:');
        const computerSelection = getComputerChoice();
        const result = playRound(computerSelection, playerSelection);
        if (result == 'Win') {
            console.log(
                `You win! ${playerSelection} beats ${computerSelection}`
            );
            playerWins++;
        } else if (result == 'Lose') {
            console.log(
                `You Lose! ${computerSelection} beats ${playerSelection}`
            );
            computerWins++;
        } else if (result == 'Tie') {
            console.log('It is a Tie!');
        }
        console.log(
            `Round: ${round}, Player: ${playerWins}, Computer: ${computerWins}`
        );
    }
    if (playerWins > computerWins) {
        console.log('You win the game!');
        console.log(`Player: ${playerWins}, Computer: ${computerWins}`);
    } else if (playerWins < computerWins) {
        console.log('You lose the game!');
        console.log(`Player: ${playerWins}, Computer: ${computerWins}`);
    } else {
        console.log('It is a draw!');
        console.log(`Player: ${playerWins}, Computer: ${computerWins}`);
    }
}

playGame();
