const { NotImplementedError } = require('../extensions/index.js');

/**
 * Create a repeating string based on the given parameters
 *  
 * @param {String} str string to repeat
 * @param {Object} options options object 
 * @return {String} repeating string
 * 
 *
 * @example
 * 
 * repeater('STRING', { repeatTimes: 3, separator: '**', 
 * addition: 'PLUS', additionRepeatTimes: 3, additionSeparator: '00' })
 * => 'STRINGPLUS00PLUS00PLUS**STRINGPLUS00PLUS00PLUS**STRINGPLUS00PLUS00PLUS'
 *
 */
function repeater(str, options) {
  str = String(str);

  const defaults = {
    repeatTimes: 1,
    separator: '+',
    addition: null,
    additionRepeatTimes: 1,
    additionSeparator: '|'
  };

  options = {
    ...defaults,
    ...options,
    repeatTimes: Number.isInteger(options.repeatTimes) ? options.repeatTimes : defaults.repeatTimes,
    addition: options.hasOwnProperty('addition')  ? String(options.addition) : defaults.addition,
    additionRepeatTimes: Number.isInteger(options.additionRepeatTimes) ? options.additionRepeatTimes : defaults.additionRepeatTimes,
    additionSeparator: options.hasOwnProperty('additionSeparator') ? String(options.additionSeparator) : defaults.additionSeparator,
  };

  if (options.addition !== null) {
    str += Array(options.additionRepeatTimes).fill(options.addition).join(options.additionSeparator);
  }

  str = Array(options.repeatTimes).fill(str).join(options.separator);

  return str;

}

module.exports = {
  repeater
};
