import { createStore } from 'vuex'

export default createStore({
  state: {
    board: [],
    game: { isOver: false }
  },
  getters: {
    board: ({ board }) => board,
    cell: ({ board }) => ({ i, j }) => board[i][j]
  },
  mutations: {
    setBoard(state, { boardMatrix }) {
      state.board = boardMatrix
    },
    gameOver({ board, game }) {
      board.forEach((row) => row.forEach((cell) => {
        if (cell.isMine) cell.isShown = true
        game.isOver = true
      }))
    }
  },
})
