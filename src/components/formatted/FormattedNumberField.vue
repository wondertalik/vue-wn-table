<template>
  <span>{{ formattedValue }}</span>
</template>

<script>
import { Formatter } from "./index";
import { isset } from "@/components/utils/functions";
import { Currency } from "../types";

export default {
  props: {
    val: {
      required: true
    },
    id: {
      type: String,
      default: ""
    },
    money: {
      type: Boolean,
      default: false
    },
    precision: {
      type: Number,
      default: 2
    },
    defaultCurrency: {
      type: Currency,
      default: null
    }
  },
  computed: {
    formattedValue() {
      let formatter = new Formatter();
      if (this.money) {
        return formatter.formatMoney(this.val, this.precision) + this.currencySymbol;
      }

      return formatter.formatNumber(this.val, this.precision);
    },
    currencySymbol() {
      if (isset(this.defaultCurrency)) return this.defaultCurrency.symbol;
      return "";
    }
  }
};
</script>
