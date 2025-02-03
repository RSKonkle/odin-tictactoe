// TIC-TAC-TOE SCRIPT //

/////////////////////////////
// GAMEBOARD - GAME LOGIC //
///////////////////////////
function Gameboard() {
    // Initializing empty board array and row/column values
    let rows = 3;
    let columns = 3;
    let board = [];
    let turns = 0;
    gameOver = false;

    // Create board using nested for loops, creates 3 rows and 3 columns
    for (let i = 0; i < rows; i++){
        board[i] = [];
        for (let j = 0; j < columns; j++){
            board[i].push("");
        }
    }

    // Initialize players and set currentPlayer
    player1 = {name: "Player 1", marker: "X"};
    player2 = {name: "Player 2", marker: "O"};
    let currentPlayer = player1;

    function getCurrentPlayer() {
        return currentPlayer;
    }

    function switchTurns(){
        currentPlayer === player1 ?
        currentPlayer = player2 :
        currentPlayer = player1;
        displayController.updateTurnDisplay();
    }

    // Checks for empty cell, then places marker in chosen cell
    function placeMarker(row, column) {
        if (gameOver) return;

        if (board[row][column] === ""){
            board[row][column] = currentPlayer.marker;
            turns++;

            // Check for a winner after placing a move
            const winner = checkWin();
            if (winner) {
                setTimeout(() => {
                    gameOver = true;
                    document.getElementById("resultsText").textContent = `${winner} wins!`;
                    document.getElementById("resultsModal").style.display = "block";
                }, 100);
                return; // Stop the game
            }

            if (turns === 9){
                setTimeout(() => {
                    gameOver = true;
                    document.getElementById("resultsText").textContent = "It's a tie!";
                    document.getElementById("resultsModal").style.display = "block";
                }, 100);
                return;
            }

            switchTurns()
        } 
    }

    // Set array of winningCombinations (8 total) to loop through
    const winningCombinations = [
        // Winning Rows
        [[0, 0], [0, 1], [0, 2]],
        [[1, 0], [1, 1], [1, 2]],
        [[2, 0], [2, 1], [2, 2]],
    
        // Winning Columns
        [[0, 0], [1, 0], [2, 0]],
        [[0, 1], [1, 1], [2, 1]],
        [[0, 2], [1, 2], [2, 2]],
    
        // Winning Diagonals
        [[0, 0], [1, 1], [2, 2]],
        [[0, 2], [1, 1], [2, 0]]
    ];

    function checkWin() {
        for (let combo of winningCombinations) {
            const [a, b, c] = combo; // Get marker positions for each winning combo
            if (
                board[a[0]][a[1]] !== "" && // Ensure cell is not empty
                board[a[0]][a[1]] === board[b[0]][b[1]] &&
                board[a[0]][a[1]] === board[c[0]][c[1]]
            ){
                return currentPlayer.name
            }
        }
        return null; // No winner yet, game continues
    }

    function restartGame() {
        game = Gameboard(); // Reset game
        displayController.renderBoard(game.board); // Refresh UI
        document.getElementById("resultsModal").style.display = "none";
        updateTurnDisplay();
    }

    return {board, placeMarker, switchTurns, checkWin, restartGame, getCurrentPlayer};
}

///////////////////////////////////
// DISPLAYCONTROLLER - UI LOGIC //
/////////////////////////////////
const displayController = (function() {
    function renderBoard(board) {
        let gameboard = document.querySelector(".gameboard");
        gameboard.innerHTML = ""; // Clear previous board

        board.forEach((row, rowIndex) => {  // Loop through rows
            row.forEach((cell, colIndex) => {  // Loop through columns
                let tile = document.createElement("div");
                tile.textContent = cell; // Set tile text to board value
                tile.dataset.row = rowIndex; // Set data-row
                tile.dataset.column = colIndex; // Set data-column
                tile.classList.add("tile"); // Add CSS class

                tile.addEventListener("click", () => {
                    if (board[rowIndex][colIndex] === ""){
                        game.placeMarker(rowIndex, colIndex);
                        renderBoard(board);
                    }
                });

                gameboard.appendChild(tile); // Append tile to board container
            });
        });
    }

    function updateTile(row, column, marker) {
        let tile = document.querySelector(`[data-row="${row}"][data-column="${column}"]`);
        if (tile) tile.textContent = marker; // Update the tile with "X" or "O"
    }

    function updateTurnDisplay() {
        document.getElementById("turnDisplay").textContent =
            `${game.getCurrentPlayer().name}'s Turn (${game.getCurrentPlayer().marker})`;
    }

    return { renderBoard, updateTile, updateTurnDisplay };
})();

let game = Gameboard();

document.addEventListener("DOMContentLoaded", () => {
    displayController.renderBoard(game.board);
    displayController.updateTurnDisplay();

    document.getElementById("restartBtn").addEventListener("click", () => {
        game.restartGame();
    });
})

