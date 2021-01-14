<template>
  <div>
    {{ $t("filters.field") }} "{{ $t(column.name) }}"
    <span class="text-bold">{{ $t(`filters.operation.${filterOperation}`) }}</span>
    <span>{{ `"${filterValue}"` }}</span>

    <vue-wn-table-filter-operator
      :operator="filter.filterColumn.operator"
      v-if="showOperator"
    ></vue-wn-table-filter-operator>
  </div>
</template>

<script>
import { ListFilterField, Column } from "@/components/table/types";
import { VueWnTableFilterOperator } from "@/components/table/filters";

export default {
  props: {
    column: {
      type: Column,
      required: true
    },
    /**
     * @property {ListFilterField} filter
     */
    filter: {
      type: ListFilterField,
      required: true
    },
    showOperator: {
      type: Boolean,
      default: true
    }
  },
  components: {
    VueWnTableFilterOperator
  },
  computed: {
    value() {
      return this.filter.filterColumn.value;
    },
    filterOperation() {
      return this.filter.filterColumn.filterOperation;
    },
    filterValue() {
      return this.filter.filterColumn.filterValue.join(", ");
    }
  }
};
</script>

<style></style>
