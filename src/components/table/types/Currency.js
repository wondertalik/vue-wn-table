export default class Currency {
  /**
   * Represent a currency model
   *
   * @constructor
   * @param {object} currency
   * @param {string} currency.symbol
   * @param {string} currency.name
   **/
  constructor({ symbol, name }) {
    this.symbol = symbol;
    this.name = name;
  }
}
