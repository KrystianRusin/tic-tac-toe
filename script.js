function gameBoard(p1, p2) {
    const createPlayer = (name, mark, turn) => {
        return {name, mark, turn}
    }
    
    const player1 = createPlayer(p1, "X", true)
    const player2 = createPlayer(p2, "O", false)
    
    const init = () => {
        const startBtn = document.querySelector(".start-btn")
        startBtn.addEventListener('click', createBoard)
    }
    
    const createBoard = () => {
        const container = document.querySelector(".container")
        container.innerHTML = ""
        const gamediv = document.createElement('div')
        gamediv.classList.add("game-container")
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                const cell = document.createElement('div');
                cell.classList.add('grid-cell');
                gamediv.appendChild(cell);
            }
        }
        container.appendChild(gamediv)
    }

    init()
    
}

gameBoard()
