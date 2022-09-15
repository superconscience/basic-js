const { NotImplementedError } = require('../extensions/index.js');

/**
 * Given matrix, a rectangular matrix of integers,
 * just add up all the values that don't appear below a "0".
 *
 * @param {Array<Array>} matrix
 * @return {Number}
 *
 * @example
 * matrix = [
 *  [0, 1, 1, 2],
 *  [0, 5, 0, 0],
 *  [2, 0, 3, 3]
 * ]
 *
 * The result should be 9
 */
function getMatrixElementsSum( matrix ) {
  return matrix.reduce(
    (sum, row, i, matrix) =>
      sum + row.reduce((sum, num, k) => {
        const prevRow = matrix[i - 1];
        return !prevRow || prevRow[k] !== 0 ? sum + num : sum;
      }, 0),
    0);
}

module.exports = {
  getMatrixElementsSum
};
