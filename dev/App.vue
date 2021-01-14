<template>
  <div>
    <vue-wn-table :tableColumns="columns" :tableRows="rows" />
  </div>
</template>

<script>
import VueWnTable from "@/index";

export default {
  components: {
    VueWnTable
  },
  data() {
    return {
      rows: []
    };
  },
  computed: {
    columns() {
      return [];
    }
  }
};
</script>
