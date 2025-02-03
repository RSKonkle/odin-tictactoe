// TIC-TAC-TOE SCRIPT //

// gameObject
// playerObject
// gameboardObject

// [][][]
// [][][]
// [][][]

function Gameboard() {
    // Initializing empty board array and row/column values
    let rows = 3;
    let columns = 3;
    let board = [];

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

    function switchTurns(){
        currentPlayer === player1 ?
        currentPlayer = player2 :
        currentPlayer = player1;
    }

    // Checks for empty cell, then places marker in chosen cell
    function placeMarker(row, column) {
        if (board[row][column] === ""){
            board[row][column] = currentPlayer.marker;

            // Check for a winner after placing a move
            const winner = checkWin();
            if (winner) {
                console.log(`${winner} wins!`);
                return; // Stop the game
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

    return {board, placeMarker, switchTurns, checkWin};
}

const displayController = (function() {
    function renderBoard(board) {
        // Update the UI
    }

    function updateTile(row, column, marker) {
        // Update a specific tile
    }

    return {renderBoard, updateTile};
})();

game = Gameboard();