export default class FilterColumn {
  constructor(key, value, operation = "like", operator = "and") {
    this._key = key;
    this._value = value;
    this._operation = operation;
    this._operator = operator;
  }

  get data() {
    return `${this.key};${this.operation};${this.value};${this.operator}`;
  }

  /**
   * @param {Object} raw
   */
  set showFilterData({ value, operation = "in" }) {
    this._filterValue = value;
    this._filterOperation = operation;
  }

  get key() {
    return this._key;
  }

  /**
   * return {String}
   */
  get value() {
    return this._value;
  }

  get operation() {
    return this._operation;
  }

  get operator() {
    return this._operator;
  }

  get filterValue() {
    return this._filterValue;
  }

  get filterOperation() {
    return this._filterOperation;
  }
}
