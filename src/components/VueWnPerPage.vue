<template>
  <div class="btn-group pull-left" v-if="total > pageNumberOptionsVisible[0]">
    <button
      type="button"
      class="btn btn-sm"
      v-for="number in pageNumberOptionsVisible"
      :key="`my-vue-table-page-${number}`"
      @click="perPageClicked(number)"
      :class="{
        'btn-default': parseInt(perPage) !== parseInt(number),
        'btn-primary': parseInt(perPage) === parseInt(number)
      }"
    >
      {{ number }}
    </button>

    <div class="btn-group">
      <button
        type="button"
        class="btn btn-default btn-sm dropdown-toggle dropdown-icon"
        data-toggle="dropdown"
      ></button>
      <div class="dropdown-menu">
        <a
          class="dropdown-item"
          v-for="number in pageNumberOptionsDropDown"
          :key="`my-vue-table-page-${number}`"
          @click="perPageClicked(number)"
        >
          <i class="far fa-check-circle" v-if="parseInt(perPage) === parseInt(number)"></i>
          {{ number }}
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import { PER_PAGE_BUTTON_CLICKED } from "./table-events";

export default {
  name: "VueWnPerPage",
  props: {
    perPage: {
      type: [Number, String],
      required: true
    },
    total: {
      type: [Number, String],
      required: true
    }
  },
  data() {
    return {
      pageNumberOptionsVisible: [20, 50, 100],
      pageNumberOptionsDropDown: [1000, 500, 200]
    };
  },
  methods: {
    perPageClicked(number) {
      this.$emit(PER_PAGE_BUTTON_CLICKED, number);
    }
  }
};
</script>

<style></style>
