<template>
  <span>{{ formattedValue }}</span>
</template>

<script>
import { format } from "date-fns";

import { parseDate, isset } from "@/components/table/utils/functions";

export default {
  props: {
    val: {
      required: true
    },
    withTime: {
      type: Boolean,
      default: false
    },
    locale: {
      type: String,
      default: "en"
    }
  },
  computed: {
    getDateFormat() {
      switch (this.locale) {
        case "en":
          return "yyyy-MM-dd";
        default:
          return "dd.MM.yyyy";
      }
    },
    getTimeFormat() {
      return this.withTime ? " HH:mm" : "";
    },
    formattedValue() {
      return isset(this.val)
        ? format(
            this.val instanceof Date ? this.val : parseDate(this.val),
            `${this.getDateFormat}${this.getTimeFormat}`
          )
        : "";
    }
  }
};
</script>

<style></style>
