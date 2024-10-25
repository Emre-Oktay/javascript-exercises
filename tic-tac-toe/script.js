function Gameboard() {
    const rows = 3;
    const columns = 3;
    let board = [];

    const init = () => {
        for (let i = 0; i < rows; i++) {
            board[i] = [];
            for (let j = 0; j < columns; j++) {
                board[i].push(Cell());
            }
        }
    };

    init();

    const getBoard = () => board;

    const addMark = (column, row, player) => {
        if (board[row][column].getValue() !== ' ') return;
        board[row][column].addMark(player);
    };

    const printBoard = () => {
        const boardWithCellValues = board.map((row) => row.map((cell) => cell.getValue()))
        console.log(boardWithCellValues);
    };

    const resetBoard = () => {
        board = [];

        init();
    };

    return {
        getBoard, addMark, printBoard, resetBoard
    }
}

function Cell() {
    let value = ' ';

    const addMark = (player) => {
        value = player;
    };

    const getValue = () => value;

    return {
        addMark,
        getValue
    };
}


function GameController(
    playerOneName = "Player One",
    playerTwoName = "Player Two"
) {
    const board = Gameboard();

    const players = [
        {
            name: playerOneName,
            mark: 'x',
            score: 0
        },
        {
            name: playerTwoName,
            mark: 'o',
            score: 0
        }
    ];

    let activePlayer = players[0];
    let gameEnded = false;

    const switchPlayerTurn = () => {
        activePlayer = activePlayer === players[0] ? players[1] : players[0];
    };

    const getActivePlayer = () => activePlayer;

    const printNewRound = () => {
        board.printBoard();
        console.log(`${getActivePlayer().name}'s turn.`);
    };

    const checkEndCondition = () => {
        //Check if a player has won
        const currentBoard = board.getBoard()
        const winningCombinations = [
            [[0, 0], [0, 1], [0, 2]],
            [[1, 0], [1, 1], [1, 2]],
            [[2, 0], [2, 1], [2, 2]],
            [[0, 0], [1, 0], [2, 0]],
            [[0, 1], [1, 1], [2, 1]],
            [[0, 2], [1, 2], [2, 2]],
            [[0, 0], [1, 1], [2, 2]],
            [[0, 2], [1, 1], [2, 0]]
        ];
        for (const combination of winningCombinations) {
            const [a, b, c] = combination;
            if (currentBoard[a[0]][a[1]].getValue() !== ' ' &&
                currentBoard[a[0]][a[1]].getValue() === currentBoard[b[0]][b[1]].getValue() &&
                currentBoard[a[0]][a[1]].getValue() === currentBoard[c[0]][c[1]].getValue()
            ) {
                return currentBoard[a[0]][a[1]].getValue();
            }
        }

        console.log(currentBoard.flat().filter(cell => cell.getValue() === ' '));
        //Check if there are empty cells; if not, the game is a draw
        if (currentBoard.flat().every(cell => cell.getValue() !== ' ')) {
            console.log(`Draw`);
            return "Draw";
        }

        return null;
    }

    const playRound = (column, row) => {
        if (gameEnded) return;
        console.log(
            `Putting ${getActivePlayer().name}'s mark into column ${column}, row ${row}`
        );
        board.addMark(column, row, getActivePlayer().mark);

        const result = checkEndCondition();
        if (result) {
            gameEnded = true;
            if (result === activePlayer.mark) activePlayer.score += 1;
            console.log(` ${players[0].name}:${players[0].score}, ${players[1].name}:${players[1].score} `)
            return result;
        } else {
            switchPlayerTurn();
            printNewRound();
            return null;
        }
    };

    const resetGame = () => {
        board.resetBoard();
        activePlayer = players[0];
        gameEnded = false;
    };

    printNewRound();

    return {
        playRound,
        getActivePlayer,
        resetGame,
        getBoard: board.getBoard
    };
}

function ScreenController() {
    let game;
    const playerTurnDiv = document.querySelector('.turn');
    const boardDiv = document.querySelector('.board');

    const gameOverModal = document.querySelector('#gameOverModal');
    const gameResultText = document.querySelector('#gameResult');
    const newGameButton = document.querySelector('#newGameButton');

    const startGameModal = document.querySelector('#startGameModal');
    const startGameButton = document.querySelector('#startGameButton');

    const p1Name = document.querySelector('#player-one-name');
    const p2Name = document.querySelector('#player-two-name');
    const p1Score = document.querySelector('#player-one-score');
    const p2Score = document.querySelector('#player-two-score');



    const updateScreen = () => {
        // clear the board
        boardDiv.textContent = "";

        // get the newest version of the board and player turn
        const board = game.getBoard();
        const activePlayer = game.getActivePlayer();

        // Display player's turn
        playerTurnDiv.textContent = `${activePlayer.name}'s turn...`

        // Render board squares
        board.forEach((row, row_index) => {
            row.forEach((cell, col_index) => {
                const cellButton = document.createElement("button");
                cellButton.classList.add("cell");

                cellButton.dataset.column = col_index
                cellButton.dataset.row = row_index

                cellButton.textContent = cell.getValue();
                boardDiv.appendChild(cellButton);
            })
        })
    }

    const updateScore = (player) => {
        if (player.name === p1Name.textContent) {
            p1Score.textContent = player.score;
        } else if (player.name === p2Name.textContent) {
            p2Score.textContent = player.score;
        }
    }

    const showGameOverModal = (result) => {
        const activePlayer = game.getActivePlayer();
        if (result === "Draw") {
            gameResultText.textContent = "It's a Draw!";
        } else {
            gameResultText.textContent = `${activePlayer.name} wins!`;
            updateScore(activePlayer);
        }
        gameOverModal.style.display = "flex";
    };

    const initializeGame = () => {
        const playerOneName = document.querySelector('#playerOneName').value || "Player One";
        const playerTwoName = document.querySelector('#playerTwoName').value || "Player Two";
        p1Name.textContent = playerOneName;
        p2Name.textContent = playerTwoName;
        p1Score.textContent = 0;
        p2Score.textContent = 0;
        game = GameController(playerOneName, playerTwoName);
        startGameModal.style.display = "none";
        updateScreen();
    };

    // Add event listener for the board
    function clickHandlerBoard(e) {
        const selectedColumn = e.target.dataset.column;
        const selectedRow = e.target.dataset.row;
        if (!selectedColumn) return;
        const result = game.playRound(selectedColumn, selectedRow);
        if (result) {
            showGameOverModal(result); // Show modal if the game has ended
        }
        updateScreen();
    }

    const startNewGame = () => {
        game.resetGame();
        gameOverModal.style.display = "none";
        updateScreen();
    };

    boardDiv.addEventListener("click", clickHandlerBoard);
    newGameButton.addEventListener("click", startNewGame);
    startGameButton.addEventListener("click", initializeGame);

    // Display the start game modal initially
    startGameModal.style.display = "flex";
}

ScreenController();