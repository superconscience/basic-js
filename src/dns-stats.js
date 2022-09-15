const { NotImplementedError } = require('../extensions/index.js');

/**
 * Given an array of domains, return the object with the appearances of the DNS.
 *
 * @param {Array} domains
 * @return {Object}
 *
 * @example
 * domains = [
 *  'code.yandex.ru',
 *  'music.yandex.ru',
 *  'yandex.ru'
 * ]
 *
 * The result should be the following:
 * {
 *   '.ru': 3,
 *   '.ru.yandex': 3,
 *   '.ru.yandex.code': 1,
 *   '.ru.yandex.music': 1,
 * }
 *
 */
function getDNSStats(domains) {
  return domains.reduce((result, domain) => {
    let parts = domain.split('.');
    if (parts.length < 2)
      return result;
    parts = parts.reverse();
    parts.reduce((label, part, i, array) => {
      label += '.' + part;
      result[label] = result[label] ? result[label] + 1: 1;
      return label
    }, '');
    return result;
  }, {})
}

module.exports = {
  getDNSStats
};
