const gameBoard = () => {

    const createPlayer = (name, mark, turn) => {
        return {name, mark, turn}
    }

    const player1 = createPlayer("p1", "x", true)
    const player2 = createPlayer("p2", "x", false)

}