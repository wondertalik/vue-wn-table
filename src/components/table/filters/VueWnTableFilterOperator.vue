<template>
  <div class="badge badge-warning">{{ operatorValue }}</div>
</template>

<script>
export default {
  props: {
    operator: {
      type: String
    }
  },
  computed: {
    operatorValue() {
      return this.$t(`filters.operator.${this.operator.toLowerCase()}`);
    }
  }
};
</script>

<style></style>
