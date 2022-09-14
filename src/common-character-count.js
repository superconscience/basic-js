const { NotImplementedError } = require('../extensions/index.js');

/**
 * Given two strings, find the number of common characters between them.
 *
 * @param {String} s1
 * @param {String} s2
 * @return {Number}
 *
 * @example
 * For s1 = "aabcc" and s2 = "adcaa", the output should be 3
 * Strings have 3 common characters - 2 "a"s and 1 "c".
 */
function getCommonCharacterCount(s1, s2) {
  const [a1, a2] = [s1.split(''), s2.split('')];

  return a1.reduce((count, c) => {
    const index = a2.indexOf(c);
    if (index !== -1){
      a2.splice(a2.indexOf(c), 1);
      count++;
    }
    return count;
  }, 0)

}

module.exports = {
  getCommonCharacterCount
};
