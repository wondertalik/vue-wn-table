import { FilterField } from "./index";

/**
 * Фильтрация по дате
 *
 * @property {String} data.date1Key Поле в Form, которое содержит значение
 */
export default class DateRangeFilterField extends FilterField {
  /**
   *
   * @constructor
   *
   * @param {object} data - filter settings
   * @param {String} data.filterKey по этому ключу определяется столбец таблицы, должен быть указан в конфигурации таблицы
   * @param {String} data.searchKey поле, по которому идет поиск в бд
   * @param {String|null} data.dateKey поле в Form, которое содержит значение
   */
  constructor({ filterKey, searchKey, dateKey }) {
    super({ filterKey, searchKey, type: "date" });
    this._date1Key = dateKey;
  }

  get dateKey() {
    return this._date1Key;
  }
}
