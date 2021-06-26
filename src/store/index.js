import { renderTimer } from '../utils/helpers'
import { buildBoard, revealAdjacentEmptyCells } from '../utils/initBoard'

import { createStore } from 'vuex'

export default createStore({
  state: {
    board: [],
    levels: {
      easy: { rows: 4, mines: 4 },
      medium: { rows: 8, mines: 12 },
      hard: { rows: 12, mines: 30 },
      brutal: { rows: 16, mines: 48 },
    },
    currentLevel: { rows: 16, mines: 48 },
    emojiOption: {
      default: "🙂",
      clicking: "😬",
      hovering: "🤔",
      gameOver: "😵",
    },
    game: {
      isOver: false,
      emoji: '🙂',
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
    game: ({ game }) => game,
    level: ({ currentLevel }) => currentLevel
  },
  mutations: {
    setBoard(state, { levelName }) {
      let { levels } = state
      state.currentLevel = levels?.[levelName] ? levels[levelName] : state.currentLevel
      state.board = buildBoard(state.currentLevel)
    },
    resetGame({ game, emojiOption }) {
      game.isOver = false
      game.timer.gameRunning = false
      game.emoji = emojiOption.default
    },
    gameOver({ board, game, emojiOption }) {
      board.forEach((row) => row.forEach((cell) => {
        if (cell.isMine) cell.isShown = true
      }))
      game.isOver = true
      game.timer.gameRunning = false
      game.emoji = emojiOption.gameOver
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
