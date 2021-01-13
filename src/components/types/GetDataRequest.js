export default class GetDataRequest {
  /**
   * @constructor
   * @param currentPage
   * @param {number} perPage
   * @param {Array.<SearchingColumn>} searching
   * @param {Array.<SortingColumn>} sorting
   */
  constructor({ currentPage = 1, perPage = 10, searching = [], sorting = [], conditional = [] }) {
    this.current_page = currentPage;
    this.per_page = perPage;
    this.data = {
      searching: [],
      sorting: [],
      filter: [],
      conditional: []
    };
    this.searchingData = searching;
    this.sortingData = sorting;
    this.conditionalData = conditional;
  }

  /**
   * List of fields for searching
   *
   * @param {Array.<SearchingColumn>} searching
   */
  set searchingData(searching = []) {
    this.data.searching = searching.map(column => {
      return column.data;
    });
  }

  /**
   * List of fields for filtering
   *
   * @param {Array.<FilterColumn>} filter
   */
  set filterData(filter = []) {
    this.data.filter = filter.map(column => {
      return column.data;
    });
  }

  /**
   * List of fields for sorting
   *
   * @param {Array.<SortingColumn>} sorting
   */
  set sortingData(sorting = []) {
    this.data.sorting = sorting.map(column => {
      return column.data;
    });
  }

  /**
   * List of fields for conditional filter
   *
   * @param {Array.<DataCondition>} conditional
   */
  set conditionalData(conditional = []) {
    this.data.conditional = conditional.map(column => {
      return column.data;
    });
  }
}
