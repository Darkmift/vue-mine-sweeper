import { createStore } from 'vuex'

export default createStore({
  state: {
    board: []
  },
  getters: {
    board: ({ board }) => board,
    cell: ({ board }) => ({ i, j }) => board[i][j]
  },
  mutations: {
    setBoard(state, { boardMatrix }) {
      state.board = boardMatrix
    }
  },
})
