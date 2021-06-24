import { createStore } from 'vuex'

export default createStore({
  state: {
    board: []
  },
  getters: {
    board({ board }) {
      return board
    },
    cell({ board }, { i, j }) {
      return board?.[i]?.[j]
    }
  },
  mutations: {
    setBoard(state, boardMatrix) {
      state.board = boardMatrix
    }
  },
})
