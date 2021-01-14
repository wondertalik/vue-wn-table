<template>
  <div>
    {{ $t("filters.field") }} "{{ $t(column.name) }}"
    <template v-if="date2 === null">
      <span class="text-bold">{{ $t(`filters.operation.=`) }}</span>
      <formatted-date-field :val="date1"></formatted-date-field>
    </template>

    <template v-if="date1 !== null && date2 !== null">
      <span class="text-bold">{{ $t("filters.operation.from") }}</span>
      <formatted-date-field :val="date1"></formatted-date-field>
      <span class="text-bold">{{ $t("filters.operation.to") }}</span>
      <formatted-date-field :val="date2"></formatted-date-field>
    </template>

    <vue-wn-table-filter-operator
      :operator="filter.filterColumn.operator"
      v-if="showOperator"
    ></vue-wn-table-filter-operator>
  </div>
</template>

<script>
import { DateRangeFilterField, Column } from "@/components/table/types";
import { FormattedDateField } from "@/components/table/formatted";
import { VueWnTableFilterOperator } from "@/components/table/filters";

export default {
  props: {
    column: {
      type: Column,
      required: true
    },
    filter: {
      type: DateRangeFilterField,
      required: true
    },
    showOperator: {
      type: Boolean,
      default: true
    }
  },
  components: {
    FormattedDateField,
    VueWnTableFilterOperator
  },
  computed: {
    date1() {
      let data = this.getData();
      return data.length > 0 ? data[0] : null;
    },
    date2() {
      let data = this.getData();
      return data.length === 2 ? data[1] : null;
    }
  },
  methods: {
    getData() {
      return this.filter.filterColumn.value.split(",");
    }
  }
};
</script>

<style></style>
