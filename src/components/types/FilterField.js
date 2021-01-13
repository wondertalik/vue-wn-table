/**
 * Базовый класс фильтрации
 *
 * @property {String} searchKey Поле по которому идет поиск в бд
 * @property {String} type Тип операции при фильтрации
 * @property {String} filterKey По этому ключу определяется столбец таблицы, должен быть указан в конфигурации таблицы
 * @property {String} filterColumn Данные фильтра
 */
export default class FilterField {
  /**
   * @param {object} data - filter settings
   * @param {String} data.filterKey по этому ключу определяется столбец таблицы, должен быть указан в конфигурации таблицы
   * @param {String} data.type тип операции при фильтрации
   * @param {String} data.searchKey поле, по которому идет поиск в бд
   * @param {String} data.conditional поле является специальным фильтром
   */
  constructor({ filterKey, searchKey, type, conditional = false }) {
    this._type = type;
    this._filterKey = filterKey;
    this._searchKey = searchKey;
    this._conditional = conditional;
  }

  /**
   * Поле, по которому идет поиск в бд
   *
   * @return {String}
   */
  get searchKey() {
    return this._searchKey;
  }

  /**
   * Тип операции при фильтрации
   * @return {String}
   */
  get filterKey() {
    return this._filterKey;
  }

  /**
   * Тип операции при фильтрации
   * @return {String}
   */
  get type() {
    return this._type;
  }

  /**
   * Поле является специальным фильтром
   * @return {bool}
   */
  get conditional() {
    return this._conditional;
  }

  /**
   * @param {FilterColumn} column
   */
  set filterColumn(column) {
    this._filterColumn = column;
  }

  /**
   * @return {FilterColumn}
   */
  get filterColumn() {
    return this._filterColumn;
  }
}
