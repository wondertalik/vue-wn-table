/**
 * @property {number} order
 * @property {string} key
 * @property {string} direction
 */
export default class SortingColumn {
  constructor(order, key, direction) {
    this.order = order;
    this.key = key;
    this.direction = direction;
  }

  get data() {
    return `${this.order};${this.key};${this.direction}`;
  }
}
