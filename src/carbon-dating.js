const { NotImplementedError } = require('../extensions/index.js');

const MODERN_ACTIVITY = 15;
const HALF_LIFE_PERIOD = 5730;

/**
 * Determine the age of archeological find by using
 * given MODERN_ACTIVITY and HALF_LIFE_PERIOD values
 * 
 * @param {String} sampleActivity string representation of current activity 
 * @return {Number | Boolean} calculated age in years or false
 * in case of incorrect sampleActivity
 *
 * @example
 * 
 * dateSample('1') => 22387
 * dateSample('WOOT!') => false
 *
 */
function dateSample(sampleActivity) {
  if (
    sampleActivity === undefined
    || typeof sampleActivity !== 'string'
  ) return false;

  const sampleActivityNumber = Number(sampleActivity);

  if (
    Number.isNaN(sampleActivityNumber)
    || sampleActivityNumber <= 0
  ) return false;

  const result = Math.ceil(Math.log2(MODERN_ACTIVITY / Number(sampleActivity)) * HALF_LIFE_PERIOD);

  return result > 0 ? result : false;
}

module.exports = {
  dateSample
};
