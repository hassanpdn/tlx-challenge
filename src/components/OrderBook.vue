<template>
      <base-card class="order-book full-width" title="Order Book">
            <base-table ref="sellItems" :items="sellItems" :headers="headers"></base-table>
            <base-card class="current-mark-price">Mark: {{numberSeperator(currentMarkPrice)}}</base-card>
            <base-table ref="buyItems" :items="buyItems" :headers="headers"></base-table>
      </base-card>
</template>

<script>
import BaseCard from "@/components/base/BaseCard.vue";
import BaseTable from "@/components/base/BaseTable.vue";
import { numberSeperator } from "@/helpers/helpers";
export default {
      name: "index",
      components: { BaseTable, BaseCard },
      data() {
            return {
                  // Web Socket state
                  connection: false,

                  // Table state
                  items: [],
                  headers: [
                        { title: `Price`, value: "price" },
                        { title: `Amount`, value: "amount" },
                  ],
                  price: 0,
                  amount: 0,
                  currentMarkPrice: 0,
            };
      },
      computed: {
            sellItems() {
                  return (
                        this.items?.existing?.filter(
                              (i) => i.side === "sell"
                        ) ||
                        this.items?.insert?.filter((i) => i.side === "sell")
                  );
            },
            buyItems() {
                  return (
                        this.items?.existing?.filter((i) => i.side === "buy") ||
                        this.items?.insert?.filter((i) => i.side === "buy")
                  );
            },
      },
      methods: {
            numberSeperator,
            averageCalculation() {
                  const max = Math.max(...this.sellItems.map((i) => i.price));
                  const min = Math.min(...this.buyItems.map((i) => i.price));

                  this.currentMarkPrice = (min + max) / 2;
            },
      },
      created() {
            console.log("Starting connection to WebSocket Server");
            this.connection = new WebSocket("ws://localhost:8080");
            this.connection.onopen = function (event) {
                  console.log(event);
                  console.log("Successfully connected to WebSocket");
            };

            this.connection.onmessage = ({ data }) => {
                  const message = JSON.parse(data);
                  this.items = message;

                  this.averageCalculation();
            };
      },
      async mounted() {
            this.$nextTick(() => {
                  this.$refs.sellItems.scrollToBottom();
            });
      },
      beforeDestroy() {
            this.connection.close();
      },
};
</script>

<style>
      .order-book {
            margin: 40px;
      }

      .current-mark-price {
            margin: 25px 0;
      }
</style>