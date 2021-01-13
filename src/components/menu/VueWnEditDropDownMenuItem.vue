<template>
  <a class="dropdown-item" v-bind="$attrs" v-on="$listeners">
    <i class="nav-icon fa fa-edit"></i>
    {{ $t("actions.edit") }}
  </a>
</template>

<script>
export default {
  name: "VueWnEditDropDownMenuItem"
};
</script>

<style></style>
