<template>
      <base-card class="order-book full-width" title="Order Book">
            <template slot="cardHeader">
                  <div class="card-fix-header">
                        <span>Order Book</span>
                        <base-select @select="select" :list="prices" value="Price"></base-select>
                  </div>
            </template>
            <base-table @rowClick="onItemClick" ref="sellOrders" :items="sellOrders" :headers="headers"></base-table>
            <base-card class="current-mark-price">Mark: {{priceSeperator(currentMarkPrice) || '- - -'}}</base-card>
            <base-table @rowClick="onItemClick" ref="buyOrders" :items="buyOrders" :headers="headers"></base-table>
      </base-card>
</template>

<script>

// Components
import BaseCard from "@/components/base/BaseCard.vue";
import BaseTable from "@/components/base/BaseTable.vue";
import BaseSelect from "@/components/base/BaseSelect.vue";

// Helpers
import { priceSeperator } from "@/helpers/helpers";
export default {
      name: "index",
      components: { BaseTable, BaseCard, BaseSelect },
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

                  // Select state
                  prices: ["None", 10, 20, 30, 40],
                  groupByNumber: null
            };
      },
      computed: {
            sellOrders: {
                  set(val){
                        return val
                  },
                  get(){
                        return (
                              this.items?.existing?.filter(
                                    i => i.side === "sell"
                              ) ||
                              this.items?.insert?.filter((i) => i.side === "sell")
                        );
                  }
            },
            buyOrders: {
                  set(val){
                        return val
                  },
                  get(){
                        return (
                              this.items?.existing?.filter((i) => i.side === "buy") ||
                              this.items?.insert?.filter((i) => i.side === "buy")
                        );
                  }
            },
      },
      methods: {
            priceSeperator,
            averageCalculation() {
                  const min_ask = Math.min(
                        ...this.sellOrders.filter((o) => o.side === "sell").map((o) => o.price)
                  );
                  const max_bid = Math.max(
                        ...this.buyOrders.filter((o) => o.side === "buy").map((o) => o.price)
                  );

                  if (isFinite(min_ask) && isFinite(max_bid)) {
                        this.currentMarkPrice = document.title = (min_ask + max_bid) * 0.5;
                  } else if (isFinite(min_ask)) {
                        this.currentMarkPrice = document.title = min_ask;
                  } else if (isFinite(max_bid)) {
                        this.currentMarkPrice = document.title = max_bid;
                  } else {
                        this.currentMarkPrice = document.title = '';
                  }

            },
            onItemClick(item){
                  this.$root.$emit('setOrder', item)
            },
            select(val){
                  this.groupByNumber = val;
                  this.buyOrders = this.groupBy(this.buyOrders);
                  this.sellOrders = this.sellOrdersGroupBy();
            },
            groupBy(array) {
                  const buyOrdersLength = array.length;
                  let finalResults = [];
                  let i = buyOrdersLength - 1;
                  const priceInteger = Math.trunc(array[i].price);
                  let maxPrice = priceInteger - (priceInteger % Number(this.groupByNumber)) +
                  Number(this.groupByNumber);
                  while (i >= 0) {
                        let amountSum = 0;
                        let j = i;
                        while (j >= 0 && array[j].price <= maxPrice) {
                              amountSum += array[j].amount;
                              j--;
                        }
                        i = j;
                        finalResults.unshift({
                              price: maxPrice,
                              amount: amountSum,
                        });
                        maxPrice += Number(this.groupByNumber);
                  }
                  console.log(finalResults)
                  return finalResults;
            },
            sellOrdersGroupBy() {
                  const sellOrders = this.sellOrders.filter((order) => order.side === "sell");
                  const sortedSellOrders = sellOrders.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
                  if (Number(this.groupByNumber)) {
                        return this.groupBy(sortedSellOrders);
                  }
                  console.log(sortedSellOrders)
                  return sortedSellOrders;
            }
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
      beforeDestroy() {
            this.connection.close();
      },
};
</script>

<style>

.current-mark-price {
      margin: 25px 0;
}
</style>