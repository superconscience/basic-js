const { NotImplementedError } = require('../extensions/index.js');

/**
 * Given a string, return its encoding version.
 *
 * @param {String} str
 * @return {String}
 *
 * @example
 * For aabbbc should return 2a3bc
 *
 */
function encodeLine(str) {
  if (!str) return str;
  let output = '';
  for (let i = 1, count = 1; i <= str.length ; i++) {
    if (str[i - 1] === str[i]) {
      count++;
      continue;
    }
    output += (count > 1 ? count : '') + str[i - 1];
    count = 1;
  }
  return output;
}

module.exports = {
  encodeLine
};
