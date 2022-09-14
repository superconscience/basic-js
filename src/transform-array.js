const { NotImplementedError } = require('../extensions/index.js');

/**
 * Create transformed array based on the control sequences that original
 * array contains
 * 
 * @param {Array} arr initial array
 * @returns {Array} transformed array
 * 
 * @example
 * 
 * transform([1, 2, 3, '--double-prev', 4, 5]) => [1, 2, 3, 3, 4, 5]
 * transform([1, 2, 3, '--double-next', 4, 5]) => [1, 2, 3, 4, 4, 5]
 * transform([1, 2, 3, '--discard-prev', 4, 5]) => [1, 2, 4, 5]
 * transform([1, 2, 3, '--discard-next', 4, 5]) => [1, 2, 3, 5]
 *
 */

function transform( arr) {
  if (!Array.isArray(arr))
    throw new Error (`'arr' parameter must be an instance of the Array!`);

  let outputArray;
  const nextActions = [];
  const prevActions = [];
  const removeIndices = [];
  const flatIndices = [];

  arr.forEach((element, index) =>
    (isPrevActionElement(element) && prevActions.push(createAction(element, index)))
    || (isNextActionElement(element) && nextActions.push(createAction(element, index)))
  ) ;

  if (prevActions.length === 0 && nextActions.length === 0)
    return arr.filter(element => !isActionElement(element));

  outputArray = arr.map((element, index, array) => {

    const nextAction = getActionByIndex(index, nextActions);
    const prevAction = getActionByIndex(index, prevActions);

    if (!nextAction && !prevAction) {
      if (isActionElement(element)) {
        removeIndices.push(index);
        return undefined;
      }
      return element;
    }

    if (nextAction && isDiscardAction(nextAction)) {
      removeIndices.push(index);
      return undefined;
    }

    const outputElements = [element];

    if (nextAction && isDoubleAction(nextAction))
      outputElements.push(element);
    if (prevAction && isDoubleAction(prevAction))
      outputElements.push(element);
    if (prevAction && isDiscardAction(prevAction))
      outputElements.pop();

    flatIndices.push(index);
    return outputElements;

  });

  return outputArray.reduce((result, element, index) => {
    if (removeIndices.includes(index))
      return result;
    if (flatIndices.includes(index))
      return result.concat(...element);
    return result.concat(element);
  }, []);

}

/**
 * Detects if string is an action (control)
 *
 * @param {String} element
 * @returns {Boolean} true if string is an action (control)
 *
 */
function isActionElement(element) {
  return typeof element === 'string' && (
    element === '--double-prev'
    || element === '--double-next'
    || element === '--discard-prev'
    || element === '--discard-next'
  )
}

/**
 * Creates object with props type and index
 * where type is name of action (control)
 * and index is an index of element of array being a target of the action
 *
 * @param {String} type
 * @param {Number} index
 * @returns {Object} return object with props type and index
 *
 */
function createAction(type, index) {
  if (isPrevActionElement(type))
    index--;
  else if (isNextActionElement(type))
    index++;
  return {type, index}
}

/**
 * Detects if action's (control's) target must be previous element of array
 *
 * @param {String} element
 * @returns {Boolean}
 *
 */
function isPrevActionElement(element) {
  return isActionElement(element) && element.includes('prev');
}

/**
 * Detects if action's (control's) target must be next element of array
 *
 * @param {String} element
 * @returns {Boolean}
 *
 */
function isNextActionElement(element) {
  return isActionElement(element) && element.includes('next');
}

/**
 * Detects if action's (control's) target must be doubled
 *
 * @param {String} element
 * @returns {Boolean}
 *
 */
function isDoubleAction(element) {
  return element.includes('double');
}

/**
 * Detects if action's (control's) target must be discarded
 *
 * @param {String} element
 * @returns {Boolean}
 *
 */
function isDiscardAction(element) {
  return element.includes('discard');
}

/**
 * Detects if action's (control's) target must be discarded
 *
 * @param {Number} index
 * @param {Array} actions array of actions => [{type: '--double-prev'}, index: 0]
 * @returns {Object || undefined} returns action if available or undefined
 *
 */
function getActionByIndex(index, actions) {
  const action = actions.find(action => action.index === index);
  return action ? action.type : undefined;
}

module.exports = {
  transform
};
