import { renderTimer } from '../utils/helpers'
import { revealAdjacentEmptyCells } from '../utils/initBoard'

import { createStore } from 'vuex'

export default createStore({
  state: {
    board: [],
    game: {
      isOver: false,
      timer: {
        intervalAnchor: null,
        timer: 0,
        timerToString: '000',
        gameRunning: false
      }
    }
  },
  getters: {
    board: ({ board }) => board,
    cell: ({ board }) => ({ i, j }) => board[i][j],
    game: ({ game }) => game
  },
  mutations: {
    setBoard(state, { boardMatrix }) {
      state.board = boardMatrix
    },
    gameOver({ board, game }) {
      board.forEach((row) => row.forEach((cell) => {
        if (cell.isMine) cell.isShown = true
      }))
      game.isOver = true
      game.timer.gameRunning = false
    },
    revealAdjacentEmptyCells({ board }, { location }) {
      console.log({ board, location })
      revealAdjacentEmptyCells(board, location)
    },
    startTimer({ game: { timer } }) {
      timer.gameRunning = true
      renderTimer(timer)
    }
  },
})
