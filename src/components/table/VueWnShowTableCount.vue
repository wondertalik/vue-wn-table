<template>
  <!-- Showing from {{ from }} to {{ to }} of {{ total }} entries -->
  <span class="ml-4">
    {{ $t("tables.showing") }} {{ $t("tables.from") }} {{ from }} {{ $t("tables.to") }} {{ to }}
    {{ $t("tables.of") }} {{ total }} {{ $t("tables.rows") }}
  </span>
</template>

<script>
export default {
  name: "VueWnShowTableCount",
  props: {
    total: {
      type: [String, Number],
      required: true
    },
    from: {
      type: [String, Number],
      required: true
    },
    to: {
      type: [String, Number],
      required: true
    }
  }
};
</script>
