import { FilterField } from "./index";

/**
 * Фильтрация по списку
 *
 * @property {String} data.dataKey Поле в Form, которое содержит значение
 * @property {String} data.label Ключ где, хранчится значение элемента в списке, которое используется для отображения в фильтрах
 */
export default class ListFilterField extends FilterField {
  /**
   *
   * @param {object} data - filter settings
   * @param {String} data.filterKey по этому ключу определяется столбец таблицы, должен быть указан в конфигурации таблицы
   * @param {String} data.searchKey поле, по которому идет поиск в бд
   * @param {String|null} data.dataKey поле в Form, которое содержит значение
   * @param {String} data.label Ключ где, хранчится значение элемента в списке, которое используется для отображения в фильтрах
   * @param {String} data.conditional  поле является специальным фильтром
   */
  constructor({ filterKey, searchKey, dataKey, label = "name", conditional = false }) {
    super({ filterKey, searchKey, type: "list", conditional });
    this._dataKey = dataKey;
    this._label = label;
  }

  get dataKey() {
    return this._dataKey;
  }

  get label() {
    return this._label;
  }
}
