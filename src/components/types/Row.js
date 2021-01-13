import { deepCopy } from "@/components/utils/functions";

export default class Row {
  /**
   *
   * @param {Array.<Cell>} cells
   * @param raw
   */
  constructor({ cells = [], raw = {} }) {
    this.cells = cells;
    this.raw = raw;
  }

  addCell(cell) {
    if (cell.getColumn.isCalculateTotal) {
      cell.getColumn.plusTotal(cell.getValue);
    }
    this.cells.push(cell);
  }

  get getCells() {
    return this.cells;
  }

  get getRaw() {
    return deepCopy(this.raw);
  }
}
