import { get } from "lodash";

export default class Cell {
  /**
   * @param {Column} column
   * @param {string} value
   * @param {string} key
   */
  constructor({ column, value = "" }) {
    this.column = column;
    this.value = value;
  }

  get getColumn() {
    return this.column;
  }

  get getValue() {
    return get(this.value, this.column.id);
  }
}
