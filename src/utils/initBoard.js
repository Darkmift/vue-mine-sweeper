export function buildBoard({ rows, mines }) {
  const boardMatrix = [];
  /***
   *  @phase_1 build cell entitites in board
   */

  for (let i = 0; i < rows; i++) {
    const row = [];
    for (let j = 0; j < rows; j++) {
      let cell = row[j];
      cell = _cellFactory(i, j);
      row.push(cell);
    }
    boardMatrix.push(row);
  }

  /***
 *  @phase_2 add mines
 */
  const cells = boardMatrix.flat(1)
  console.log("🚀 ~ file: initBoard.js ~ line 21 ~ buildBoard ~ cells", cells)

  for (let i = 0; i < mines; i++) {
    const randIdx = _getRandomInteger(0, cells.length - 1);
    const randCell = cells[randIdx];

    if (randCell.isMine) {
      i--;
      continue;
    }

    randCell.isMine = true;
  }

  /***
*  @phase_3 populate cell.minesAroundCount
*/

  for (let i = 0; i < cells.length; i++) {
    const cell = cells[i];
    const adjacentCells = _findAdjacentCells(boardMatrix, cells[i]);
    adjacentCells.forEach(adjacentCell => {
      if (adjacentCell.isMine) cell.minesAroundCount++
    })
  }
  _logTMat(boardMatrix)
  return boardMatrix
}

function _cellFactory(i, j) {
  const cell = {
    location: { i, j },
    minesAroundCount: 0,
    isShown: false,
    isMine: false,
    // has flag on
    isMarked: false,
  };

  return cell;
}

function _getRandomInteger(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function _findAdjacentCells(board, cell, range = 1) {
  const neighbours = [];
  const cellI = cell.location.i;
  const cellJ = cell.location.j;

  for (let i = cellI - range; i <= cellI + range; i++) {
    // exclude out of matrix bounds
    if (i < 0 || i > board.length - range) continue;
    for (let j = cellJ - range; j <= cellJ + range; j++) {
      //exclude self
      if (i === cellI && j === cellJ) continue;
      // exclude out of matrix bounds
      if (j < 0 || j > board[0].length - 1) continue;
      neighbours.push(board[i][j]);
    }
  }

  return neighbours;
}

function _logTMat(matrix) {
  const BOMB = '💣';

  console.table(
    matrix.map((arr) =>
      arr.map((cell) =>
        cell.isMine
          ? BOMB
          : cell.minesAroundCount
            ? cell.minesAroundCount
            : 0,
      ),
    ),
  );
}