<template>
  <div class="callout callout-info" v-if="filters.length > 0">
    <button type="button" class="close" @click="resetFilters">&times;</button>
    <h5>
      <i class="icon fas fa-search"></i>
      {{ $t("actions.search") }}
    </h5>

    <template v-for="(filter, index) in filters">
      <vue-wn-table-date-range-filter
        :column="getColumnByFilterKey(filter.filterKey)"
        :key="`filter_${Date.now() + index}`"
        :filter="filter"
        v-if="isDateRangeField(filter)"
        :show-operator="index + 1 !== filters.length"
      ></vue-wn-table-date-range-filter>

      <vue-wn-table-list-filter
        :column="getColumnByFilterKey(filter.filterKey)"
        :key="`filter_${Date.now() + index}`"
        :filter="filter"
        v-if="isListField(filter)"
        :show-operator="index + 1 !== filters.length"
      ></vue-wn-table-list-filter>
    </template>
  </div>
</template>

<script>
import { Column, FilterField, DateRangeFilterField, ListFilterField } from "@/components/types";

import { ON_RESET_FILTERS } from "@/components/table-events";

import { VueWnTableDateRangeFilter, VueWnTableListFilter } from "@/components/filters";

export default {
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
    }
  },
  components: {
    VueWnTableDateRangeFilter,
    VueWnTableListFilter
  },
  methods: {
    getColumnByFilterKey(key) {
      return this.tableColumns.find(item => item.filterKey === key);
    },
    /**
     * @param {FilterField} filter
     */
    isDateRangeField(filter) {
      return filter instanceof DateRangeFilterField;
    },
    isListField(filter) {
      return filter instanceof ListFilterField;
    },
    resetFilters() {
      this.$emit(ON_RESET_FILTERS);
    }
  }
};
</script>

<style></style>
