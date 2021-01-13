export default class SearchingColumn {
  constructor(key, value, operation = "like") {
    this.key = key;
    this.value = value;
    this.operation = operation;
  }

  get data() {
    return `${this.key};${this.operation};${this.value}`;
  }
}
