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
                if (player.getTurn(player1) == true){
                    game.placeMark(player1, cell)
                    updateGame(player1, cell)
                    player.setTurn(player1, false)
                    player.setTurn(player2, true)
                } else if (player.getTurn(player2) == true){
                    game.placeMark(player2, cell)
                    updateGame(player2, cell)
                    player.setTurn(player2, false)
                    player.setTurn(player1, true)
                    
                }
            });
        })
    }

    const updateGame = (p, cell) => {
        let cellId = cell.dataset.cellId
        cellId = cellId.split(" ")
        gameState[cellId[0]][cellId[1]] = player.getMark(p)
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

    return {
        placeMark
    }
})()

