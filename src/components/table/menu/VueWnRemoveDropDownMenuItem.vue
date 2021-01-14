<template>
  <a class="dropdown-item" v-bind="$attrs" v-on="$listeners">
    <i class="nav-icon fa fa-trash"></i>
    {{ $t("actions.remove") }}
  </a>
</template>

<script>
export default {
  name: "VueWnRemoveDropDownMenuItem"
};
</script>

<style></style>
