import Big from "big.js";

export default class Formatter {
  formatMoney(value, precision = 2) {
    return new Big(value).toFixed(precision);
  }

  formatNumber(value, precision = 2) {
    return new Big(value).toFixed(precision);
  }
}
