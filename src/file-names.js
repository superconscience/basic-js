const { NotImplementedError } = require('../extensions/index.js');

/**
 * There's a list of file, since two files cannot have equal names,
 * the one which comes later will have a suffix (k),
 * where k is the smallest integer such that the found name is not used yet.
 *
 * Return an array of names that will be given to the files.
 *
 * @param {Array} names
 * @return {Array}
 *
 * @example
 * For input ["file", "file", "image", "file(1)", "file"],
 * the output should be ["file", "file(1)", "image", "file(1)(1)", "file(2)"]
 *
 */
function renameFiles(names) {
  if (!Array.isArray(names) || names.length === 0)
    return names;
  const count = {};
  const output = [];
  for (let name of names) {
    const currentCount = name in count ? count[name] : 0;
    count[name] = count[name] ? count[name] + 1 : 1;
    if (output.includes(name)) {
      name += (currentCount > 0 ? `(${currentCount})` : '');
      count[name] = count[name] ? count[name] + 1 : 1;
    }
    output.push(name);
  }
  return output;
}

module.exports = {
  renameFiles
};
