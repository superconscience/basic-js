const { NotImplementedError } = require('../extensions/index.js');

/**
 * In the popular Minesweeper game you have a board with some mines and those cells
 * that don't contain a mine have a number in it that indicates the total number of mines
 * in the neighboring cells. Starting off with some arrangement of mines
 * we want to create a Minesweeper game setup.
 *
 * @param {Array<Array>} matrix
 * @return {Array<Array>}
 *
 * @example
 * matrix = [
 *  [true, false, false],
 *  [false, true, false],
 *  [false, false, false]
 * ]
 *
 * The result should be following:
 * [
 *  [1, 2, 1],
 *  [2, 1, 1],
 *  [1, 1, 1]
 * ]
 */
function minesweeper(matrix) {
  return matrix.map(
    (row, i, matrix) => row.map(
      (_, k, row) => {
        const [prevRow, nextRow] = [matrix[i - 1], matrix[i + 1]];
        return (prevRow ? !!prevRow[k - 1] + !!prevRow[k] + !!prevRow[k + 1] : 0)
          + (!!row[k - 1] + !!row[k + 1])
          + (nextRow ? !!nextRow[k - 1] + !!nextRow[k] + !!nextRow[k + 1] : 0);
      }
    )
  );
}

module.exports = {
  minesweeper
};
