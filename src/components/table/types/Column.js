export default class Column {
  /**
   * Represent a column of VuWnTable
   * @constructor
   * @param {object} column - Column settings
   * @param {string} column.id
   * @param {string} column.name
   * @param {Object} column.styleCell
   * @param {Object} column.styleHeader
   * @param {Object} column.styleFooter
   * @param {string|null} [column.key=null]
   * @param {string|null} [column.filterKey=null] using for
   * @param {boolean} [column.canSort=true] If column.key is null, will be false
   * @param {boolean} [column.canSearch=true] If column.key is null, will be false
   * @param {boolean} [column.calculateTotal=false]
   * @param {boolean} [column.money=false]
   */
  constructor({
    id,
    name,
    key = null,
    filterKey = null,
    styleCell = {},
    styleHeader = {},
    styleFooter = {},
    canSort = true,
    canSearch = true,
    calculateTotal = false,
    money = false
  }) {
    this.id = id;
    this.name = name;
    this.key = key;
    this.filterKey = filterKey;
    this.styleCell = styleCell;
    this.styleHeader = styleHeader;
    this.styleFooter = styleFooter;
    this.canSort = key !== null ? canSort : false;
    this.canSearch = key !== null ? canSearch : false;
    this.sortingValues = ["asc", "desc", "disable"];
    this.calculateTotal = calculateTotal;
    this.money = money;
    this.total = 0;
    this.sortDisable();
  }

  getNextSorting() {
    if (this.canSort) {
      switch (this.sort) {
        case "asc":
          this.sortByDesc();
          break;
        case "desc":
          this.sortDisable();
          break;
        case "disable":
          this.sortByAsc();
          break;
      }
    }
  }

  resetTotal() {
    this.total = 0.0;
  }

  plusTotal(value) {
    this.total += parseFloat(value);
  }

  get getTotal() {
    return this.total;
  }

  sortByAsc() {
    if (this.canSort) this.sorting = this.sortingValues[0];
  }

  sortByDesc() {
    if (this.canSort) this.sorting = this.sortingValues[1];
  }

  sortDisable() {
    this.sorting = this.sortingValues[2];
  }

  get isSortByAsc() {
    return this.sort === this.sortingValues[0];
  }

  get isSortByDesc() {
    return this.sort === this.sortingValues[1];
  }

  get isSortDisable() {
    return this.sort === this.sortingValues[2];
  }

  get isSearching() {
    return this.canSearch;
  }

  get sort() {
    return this.sorting;
  }

  get isCalculateTotal() {
    return this.calculateTotal;
  }

  get isShowMoney() {
    return this.money;
  }
}
