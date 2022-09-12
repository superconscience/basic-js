const { NotImplementedError } = require('../extensions/index.js');

/**
 * Extract season from given date and expose the enemy scout!
 * 
 * @param {Date | FakeDate} date real or fake date
 * @returns {String} time of the year
 * 
 * @example
 * 
 * getSeason(new Date(2020, 02, 31)) => 'spring'
 * 
 */
function getSeason(date) {
  if (date === undefined)
    return 'Unable to determine the time of year!';
  if (
    !(date instanceof Date)
    || date.toString !== new Date().toString
  )
    throw new Error('Invalid date!');
  const month = (date.getMonth() + 1) % 12 + 1; // Here, December is 1 and November is 12
  return ['winter', 'spring', 'summer', 'autumn'][Math.ceil(month / 3) - 1]
}

module.exports = {
  getSeason
};
