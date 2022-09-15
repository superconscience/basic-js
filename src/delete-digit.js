const { NotImplementedError } = require('../extensions/index.js');

/**
 * Given some integer, find the maximal number you can obtain
 * by deleting exactly one digit of the given number.
 *
 * @param {Number} n
 * @return {Number}
 *
 * @example
 * For n = 152, the output should be 52
 *
 */
function deleteDigit( n ) {
  if (n < 10) return n;
  const array = String(n).split('').map(Number);
  return Math.max(...array.map((_, i, array) => {
    const newArray = [...array];
    newArray.splice(i, 1);
    return Number(newArray.join(''));
  }))
}

module.exports = {
  deleteDigit
};
