const { NotImplementedError } = require('../extensions/index.js');

/**
 * Implement chainMaker object according to task description
 * 
 */
const chainMaker = {
  _items: [],
  getLength() {
    return this._items.length
  },
  addLink( value ) {
    this._items.push(value);
    return this;
  },
  removeLink( position ) {
    if (typeof position !== 'number' || !Number.isInteger(position) || position < 0 || !((position - 1) in this._items)) {
      this._items = [];
      throw new Error('You can\'t remove incorrect link!');
    }
    this._items.splice(position - 1, 1);
    return this;
  },
  reverseChain() {
    this._items = this._items.reverse();
    return this;
  },
  finishChain() {
    const links = this._items.map(item => `( ${item} )`);
    this._items = [];
    return links.join('~~');
  }
};

module.exports = {
  chainMaker
};
