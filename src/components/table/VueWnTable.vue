<template>
  <div class="row">
    <div class="col-md-12">
      <vue-wn-table-filter-component
        @[onResetFilters]="resetFilters"
        :table-columns="tableColumns"
        :filters="filters"
      ></vue-wn-table-filter-component>

      <div class="card" :class="{ 'sk-loading': showSpinner }">
        <div class="sk-spinner sk-spinner-double-bounce" v-if="showSpinner">
          <div class="sk-double-bounce1"></div>
          <div class="sk-double-bounce2"></div>
        </div>

        <div class="card-header">
          <h3 class="card-title">{{ title }}</h3>

          <div class="card-tools">
            <div class="input-group input-group-sm" style="width: 300px" v-if="isQuickSearching">
              <div class="input-group-append mr-2" v-if="advancedSearch">
                <button type="submit" class="btn btn-default">
                  <i class="far fa-question-circle"></i>
                </button>
              </div>

              <input
                type="text"
                name="table_search"
                class="form-control float-right"
                v-model="quickSearching"
                :placeholder="$t('actions.search')"
              />

              <div class="input-group-append">
                <button type="submit" class="btn btn-default">
                  <i class="fas fa-search"></i>
                </button>
              </div>

              <div class="btn-group ml-2">
                <button
                  type="button"
                  class="btn btn-secondary btn-sm dropdown-toggle"
                  data-toggle="dropdown"
                >
                  <i class="fas fa-cog"></i>
                </button>
                <div class="dropdown-menu dropdown-menu-right" role="menu">
                  <a class="dropdown-item" @click="advancedSearch = !advancedSearch">
                    <i class="fas fa-check-circle mr-1" v-if="advancedSearch"></i>
                    {{ $t("actions.enabled_advanced_search") }}
                  </a>
                </div>
              </div>
            </div>
            <slot name="table-tools"></slot>
          </div>
        </div>

        <div class="card-footer clearfix" v-if="showPerPageToolbar && rows.length > 0">
          <vue-wn-per-page
            :per-page="perPage"
            :total="paginationOptions.total"
            @[perPageButtonClikedEvent]="perPageClicked"
          ></vue-wn-per-page>

          <vue-wn-show-table-count
            v-if="paginationOptions.total > 0"
            :from="paginationOptions.from"
            :to="paginationOptions.to"
            :total="paginationOptions.total"
          ></vue-wn-show-table-count>

          <vue-wn-paginator
            :current-page="paginationOptions.currentPage"
            :last-page="paginationOptions.lastPage"
            @on-page-change="onLoadNextPage"
          ></vue-wn-paginator>
        </div>

        <!-- /.card-header -->
        <div class="card-body table-responsive p-0">
          <table class="table table-hover">
            <thead>
              <tr>
                <th v-if="draggableEnabled" style="text-align: left"></th>
                <th :style="actionColumnStyle" v-if="showRowTableAction"></th>
                <th
                  v-for="column in tableColumns"
                  :key="column.id"
                  @click="onSortColumnClicked(column)"
                  :style="column.styleHeader"
                >
                  <span>{{ $t(column.name) }}</span>
                  <i class="fas fa-sort-amount-up" v-if="column.isSortByAsc"></i>
                  <i class="fas fa-sort-amount-down" v-if="column.isSortByDesc"></i>
                </th>
              </tr>
            </thead>
            <tbody v-if="rows.length == 0">
              <tr>
                <td v-if="draggableEnabled"></td>
                <td :colspan="tableColumns.length + 1" class="text-center">
                  {{ emptyRowsMessage }}
                </td>
              </tr>
            </tbody>

            <draggable
              :disabled="!draggableEnabled"
              handle=".handle"
              tag="tbody"
              :list="rows"
              @change="handlerDraggable"
              :move="handlerMove"
              v-else
            >
              <tr
                v-for="(row, index_row) in rows"
                :key="`${index_row}_${new Date().getMilliseconds()}`"
              >
                <td v-if="draggableEnabled" style="width: 40px; padding: 5px">
                  <button
                    type="button"
                    class="btn btn-sm handle"
                    @click.stop="onEditActionClicked(props.row.raw)"
                  >
                    <i class="fas fa-arrows-alt"></i>
                  </button>
                </td>
                <td
                  class="td-align-left"
                  v-if="showRowTableAction"
                  :style="{ padding: '5px', width: `${rowTableActionWidth}px` }"
                >
                  <slot name="table-action" :row="row">
                    <div class="btn-group">
                      <button type="button" class="btn btn-default" data-toggle="dropdown">
                        <i class="fas fa-list"></i>
                        <span class="sr-only">Toggle Dropdown</span>
                        <div class="dropdown-menu" role="menu">
                          <vue-wn-edit-drop-down-menu-item
                            @click.stop="onEditActionClicked(row, $event)"
                          ></vue-wn-edit-drop-down-menu-item>

                          <vue-wn-remove-drop-down-menu-item
                            @click.stop="onRemoveActionClicked(row, $event)"
                          ></vue-wn-remove-drop-down-menu-item>
                        </div>
                      </button>
                      <button
                        type="button"
                        class="btn btn-default"
                        @click.stop="onShowActionClicked(row, $event)"
                        v-if="rowShowButton"
                      >
                        <i class="fas fa-eye"></i>
                      </button>
                    </div>
                  </slot>
                </td>

                <td
                  v-for="(cell, index_cell) in row.getCells"
                  :key="index_cell"
                  @click="onRowClicked(row, $event)"
                  :style="cell.getColumn.styleCell"
                >
                  <slot name="table-row" :cell="cell" :row="row">
                    <span>{{ cell.getValue }}</span>
                  </slot>
                </td>
              </tr>
            </draggable>

            <tfoot v-if="showFooter">
              <tr v-if="rows.length > 0">
                <th :style="actionColumnStyle" v-if="showRowTableAction"></th>
                <th v-for="column in tableColumns" :key="column.id" :style="column.styleFooter">
                  <slot name="table-footer-row" :column="column">
                    <span v-if="column.isCalculateTotal">
                      <formatted-number-field
                        :val="column.getTotal"
                        :id="column.id"
                        :money="column.isShowMoney"
                      ></formatted-number-field>
                    </span>
                  </slot>
                </th>
              </tr>
            </tfoot>
          </table>
        </div>
        <div class="card-footer" v-if="showPerPageToolbar && rows.length > 0">
          <div class="row">
            <div class="col-md-12" style="text-align">
              <vue-wn-per-page
                :per-page="perPage"
                :total="paginationOptions.total"
                @[perPageButtonClikedEvent]="perPageClicked"
              ></vue-wn-per-page>

              <vue-wn-show-table-count
                v-if="paginationOptions.total > 0"
                :from="paginationOptions.from"
                :to="paginationOptions.to"
                :total="paginationOptions.total"
              ></vue-wn-show-table-count>

              <vue-wn-paginator
                :current-page="paginationOptions.currentPage"
                :last-page="paginationOptions.lastPage"
                @on-page-change="onLoadNextPage"
              ></vue-wn-paginator>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  GetDataRequest,
  Column,
  Cell,
  Row,
  SortingColumn,
  SearchingColumn,
  FilterField
} from "@/components/table/types";

import { VueWnTableFilterComponent } from "@/components/table/filters";

import { PER_PAGE_BUTTON_CLICKED } from "./table-events";

import VueWnPaginator from "./VueWnPaginator.vue";
import VueWnShowTableCount from "./VueWnShowTableCount.vue";

import VueWnRemoveDropDownMenuItem from "./menu/VueWnRemoveDropDownMenuItem";
import VueWnEditDropDownMenuItem from "./menu/VueWnEditDropDownMenuItem";
import VueWnPerPage from "./VueWnPerPage.vue";

import * as events from "./table-events";
import { FormattedNumberField } from "./formatted";

import draggable from "vuedraggable";

import { forEach } from "lodash";

/**
 * Table component with pagination, sorting and searching functionality
 * @displayName VueMyTable
 *
 * @property {Array.<FilterField>} filters
 */
export default {
  name: "VueMyTable",
  components: {
    draggable,
    VueWnPaginator,
    VueWnShowTableCount,
    VueWnPerPage,
    VueWnTableFilterComponent,
    VueWnRemoveDropDownMenuItem,
    VueWnEditDropDownMenuItem,
    FormattedNumberField
  },
  props: {
    tableColumns: {
      type: Array,
      validator: function(columns) {
        for (let column of columns) {
          if (!(column instanceof Column)) {
            console.error("tableColumns should include only Column instance");
            return false;
          }
        }
        return true;
      },
      required: true
    },
    filters: {
      type: Array,
      validator: function(filters) {
        for (let filter of filters) {
          if (!(filter instanceof FilterField)) {
            console.error("filters should include only FilterField instance");
            return false;
          }
        }
        return true;
      },
      default() {
        return [];
      }
    },
    title: {
      type: String,
      default: ""
    },
    tableRows: {
      type: Array
    },
    isLoading: {
      type: Boolean,
      default: false
    },
    showFooter: {
      type: Boolean,
      default: false
    },
    showPerPageToolbar: {
      type: Boolean,
      default: true
    },
    showRowTableAction: {
      type: Boolean,
      default: true
    },
    rowTableActionWidth: {
      type: [Number, String],
      default: 85
    },

    paginationOptions: {
      type: Object,
      default() {
        return {
          currentPage: 1,
          lastPage: 1,
          perPage: 10,
          total: 0,
          from: 0,
          to: 0
        };
      }
    },
    rowShowButton: {
      type: Boolean,
      default: true
    },
    rowEditButton: {
      type: Boolean,
      default: true
    },
    isQuickSearching: {
      type: Boolean,
      default: true
    },
    emptyRowsMessage: {
      type: String,
      default: "The table does not contain data"
    },
    actionColumnStyle: {
      type: Object,
      default() {
        return {};
      }
    },
    draggableEnabled: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      advancedSearch: false,
      /**
       * row linked to current drag operation
       */
      relatedDraggableRow: null,
      error: null,
      /** @param {Array.<Row>} rows */
      rows: [],
      quickSearching: "",
      isPreparing: false,
      perPage: 20
    };
  },
  computed: {
    showSpinner() {
      return this.isLoading || this.isPreparing;
    },
    perPageButtonClikedEvent() {
      return PER_PAGE_BUTTON_CLICKED;
    },
    onResetFilters() {
      return events.ON_RESET_FILTERS;
    }
  },
  watch: {
    tableRows: {
      handler() {
        forEach(this.tableColumns, column => column.resetTotal());
        this.onPrepareData();
      },
      immediate: true
    },
    tableColumns: {
      handler() {
        forEach(this.tableColumns, column => column.resetTotal());
        this.onPrepareData();
      }
    },
    quickSearching: {
      handler() {
        this.getData(this.getRequest(1));
      }
    },
    filters: {
      handler() {
        this.getData(this.getRequest(1));
      }
    },
    advancedSearch: {
      handler() {
        if (this.quickSearching.length > 0) {
          this.getData(this.getRequest(this.paginationOptions.currentPage));
        }
      }
    },
    perPage: {
      handler() {
        this.getData(this.getRequest(this.paginationOptions.currentPage));
      }
    }
  },
  created() {
    this.getData(this.getRequest(1));
    // EventBus.listen(events.ON_TABLE_ROW_UPDATED, () => {
    //   this.getData(this.getRequest(this.paginationOptions.currentPage));
    // });
  },
  beforeDestroy() {
    // EventBus.off(events.ON_TABLE_ROW_UPDATED);
  },
  methods: {
    perPageClicked(value) {
      this.perPage = value;
    },
    /**
     * @param {GetDataRequest} data
     */
    getData(data) {
      this.$emit(events.GET_TABLE_DATA, data);
    },
    resetFilters() {
      this.$emit(events.ON_RESET_FILTERS);
    },

    getRequest(page) {
      let request = new GetDataRequest({
        currentPage: page,
        perPage: this.perPage,
        sorting: this.sortingColumn()
      });

      if (this.quickSearching.length > 0) {
        let searchText = this.advancedSearch ? this.quickSearching : `%${this.quickSearching}%`;
        if (searchText !== "%%") request.searchingData = this.searchingColumn(searchText);
      }
      if (this.filters.length > 0) {
        console.log(this.filters);
        //set filters
        request.filterData = this.filters
          .filter(filter => !filter.conditional)
          .map(filter => {
            console.log(filter.filterColumn);
            return filter.filterColumn;
          });

        //set conditional filters
        request.conditionalData = this.filters
          .filter(filter => filter.conditional)
          .map(filter => {
            console.log(filter.filterColumn);
            return filter.filterColumn;
          });
      }
      return request;
    },
    onLoadNextPage({ clicked_page }) {
      this.getData(this.getRequest(clicked_page));
    },
    onPrepareData() {
      this.isPreparing = true;

      let data = [];
      for (const row of this.tableRows) {
        let tableRow = new Row({ raw: row });
        /** @param {Column} column */
        for (const column of this.tableColumns) {
          tableRow.addCell(new Cell({ column, value: row }));
          //tableRow.raw[column.id] = row[column.id];
        }
        data.push(tableRow);
      }
      this.rows = data;
      this.isPreparing = false;
    },
    /**
     * @param {Row} row
     * @param event
     */
    onRowClicked(row, event) {
      this.$emit(events.ON_TABLE_ROW_CLICKED, { ...row.raw, event });
    },
    /**
     * @param {Row} row
     * @param event
     */
    onShowActionClicked(row, event) {
      this.$emit(events.ON_TABLE_SHOW_ACTION_CLICKED, { ...row.raw, event });
    },
    /**
     * @param {Row} row
     * @param event
     */
    onEditActionClicked(row, event) {
      this.$emit(events.ON_TABLE_EDIT_ACTION_CLICKED, { ...row.raw, event });
    },
    /**
     * @param {Row} row
     * @param event
     */
    onRemoveActionClicked(row, event) {
      this.$emit(events.ON_TABLE_REMOVE_ACTION_CLICKED, { ...row.raw, event });
    },
    /**
     * @param {Column} column
     */
    onSortColumnClicked(column) {
      if (column.canSort) {
        column.getNextSorting();
        this.getData(this.getRequest(this.paginationOptions.currentPage));
      }
    },
    searchingColumn(value) {
      let columns = [];
      if (value === null || value === undefined || value.length === 0) return columns;
      this.tableColumns.forEach(column => {
        if (column.isSearching) {
          columns.push(new SearchingColumn(column.key, value));
        }
      });
      return columns;
    },
    sortingColumn() {
      let columns = [];

      this.tableColumns.forEach((column, index) => {
        if (!column.isSortDisable) columns.push(new SortingColumn(index, column.key, column.sort));
      });
      return columns;
    },
    onErrorData(error) {
      console.error("onErrorData", error);
    },
    handlerDraggable(event) {
      console.log(event);
      if (event.moved) {
        this.$emit(events.ROW_DRAGGABLE_MOVED, {
          replacedData: this.relatedDraggableRow.getRaw,
          data: event.moved.element.getRaw,
          oldIndex: event.moved.oldIndex,
          newIndex: event.moved.newIndex,
          sorting: event.moved.newIndex
        });
      }
    },
    handlerMove(event) {
      this.relatedDraggableRow = this.rows[event.relatedContext.index];
      return true;
    }
  }
};
</script>

<style scoped>
.td-align-right {
  text-align: right;
}

.handle {
  color: lightgray;
}
</style>
