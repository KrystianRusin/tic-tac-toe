(function (){
    const createBoard = (event) => {
        event.preventDefault()
        const p1 = document.getElementById("p1-name").value
        const p2 = document.getElementById("p2-name").value
        const container = document.querySelector(".container")
        container.innerHTML = ""
        const gamediv = document.createElement('div')
        gamediv.classList.add("game-container")
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                const cell = document.createElement('div');
                cell.classList.add('grid-cell');
                cell.dataset.cellId = i.toString() + " " + j.toString()
                gamediv.appendChild(cell);
            }
        }
        container.appendChild(gamediv)
        gameBoard(p1, p2)
        }

        const startBtn = document.querySelector(".start-btn")
        startBtn.addEventListener('click', createBoard)
  
})()


function gameBoard(p1, p2) {

    const gameState = [[null,null,null],[null,null,null],[null,null,null]]

    const init = () => {
        const player1 = player.createPlayer(p1, "X", true)
        const player2 = player.createPlayer(p2, "O", false)
        const cells = document.querySelectorAll(".grid-cell");
        cells.forEach(cell => {
            cell.addEventListener('click', function() {
                let cellId = cell.dataset.cellId
                cellId = cellId.split(" ")
                if (player.getTurn(player1) == true){
                    if (gameState[cellId[0]][cellId[1]] == null){
                        game.placeMark(player1, cell)
                        updateGame(player1, cellId)
                        player.setTurn(player1, false)
                        player.setTurn(player2, true)
                    }
                    else {
                        alert("Mark already placed in that cell")
                    }
                } else if (player.getTurn(player2) == true){
                    if (gameState[cellId[0]][cellId[1]] == null){
                        game.placeMark(player2, cell)
                        updateGame(player2, cellId)
                        player.setTurn(player2, false)
                        player.setTurn(player1, true)
                    }else {
                        alert("Mark already placed in that cell")
                    }
                    
                }
            });
        })
    }

    const updateGame = (p, cellId) => {
       
        gameState[cellId[0]][cellId[1]] = player.getMark(p)
        if (game.checkWinner(gameState,cellId[0], cellId[1]) == true){
            console.log("Game Over")
        }
    }

   
    init()
}

const player = (function(){

    const createPlayer = (name, mark, turn) => {
        return {name, mark, turn}
    }

    const getName = (p) => {
        return p.name
    }
    const getMark = (p) => {
        return p.mark
    }

    const getTurn = (p) => {
        return p.turn
    }
    const setTurn = (p, turn) => {
        p.turn = turn
    }

    return{
        createPlayer,
        getName,
        getMark,
        getTurn,
        setTurn
    }
})();

const game = (function() {

    const placeMark = (p, cell) => {
        let mark = player.getMark(p)
        cell.innerHTML = mark
    }

    const checkWinner = (gameState, row, col) => {
        const player = gameState[row][col];
        const size = gameState.length;


        let win = true;
        for (let i = 0; i < size; i++) {
            if (gameState[row][i] !== player) {
            win = false;
            break;
            }
        }
        if (win) return true;


        win = true;
        for (let i = 0; i < size; i++) {
            if (gameState[i][col] !== player) {
            win = false;
            break;
            }
        }
        if (win) return true;

        
        if (row === col) {
            win = true;
            for (let i = 0; i < size; i++) {
            if (gameState[i][i] !== player) {
                win = false;
                break;
            }
            }
            if (win) return true;
        }


        if (row + col === size - 1) {
            win = true;
            for (let i = 0; i < size; i++) {
            if (gameState[i][size - 1 - i] !== player) {
                win = false;
                break;
            }
            }
            if (win) return true;
        }

        const isBoardFull = gameState.every(row => row.every(cell => cell !== null));
        if (isBoardFull) return true;

        return false;
        }

    return {
        placeMark,
        checkWinner
    }
})()

