<template>
      <base-card class="order-book full-width" title="Order Book">
            <template slot="cardHeader">
                  <div class="card-fix-header">
                        <span>Order Book</span>
                        <base-select v-model="groupByNumber" @select="select" :list="prices"></base-select>
                  </div>
            </template>
            <base-table @rowClick="onItemClick" ref="sellOrders" :items="sellOrdersGroupBy" :headers="headers"></base-table>
            <base-card class="current-mark-price">Mark: {{priceSeperator(currentMarkPrice) || '- - -'}}</base-card>
            <base-table @rowClick="onItemClick" ref="buyOrders" :items="buyOrdersGroupBy" :headers="headers"></base-table>
      </base-card>
</template>

<script>

// Components
import BaseCard from "@/components/base/BaseCard.vue";
import BaseTable from "@/components/base/BaseTable.vue";
import BaseSelect from "@/components/base/BaseSelect.vue";

// Helpers
import { priceSeperator } from "@/helpers/helpers";
import { webSocket } from "@/services/ws";

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
                  currentMarkPrice: 0,

                  // Select state
                  prices: [10, 20, 30, 40],
                  groupByNumber: null
            };
      },
      computed: {
            buyOrdersGroupBy() {
                  const buyOrders = this.items.filter((order) => order.side === "buy");
                  const sortedBuyOrders = this.sortOrders(buyOrders);
                  if (Number(this.groupByNumber)) {
                        return this.groupBy(sortedBuyOrders);
                  }
                  return sortedBuyOrders;
            },
            sellOrdersGroupBy() {
                  const sellOrders = this.items.filter((order) => order.side === "sell");
                  const sortedSellOrders = this.sortOrders(sellOrders);
                  if (Number(this.groupByNumber)) {
                        return this.groupBy(sortedSellOrders);
                  }
                  return sortedSellOrders;
            }
      },
      methods: {
            priceSeperator,
            averageCalculation() {
                  const min_ask = Math.min(
                        ...this.sellOrdersGroupBy.map((o) => o.price)
                  );
                  const max_bid = Math.max(
                        ...this.buyOrdersGroupBy.map((o) => o.price)
                  );

                  if (isFinite(min_ask) && isFinite(max_bid)) {
                        this.currentMarkPrice = document.title = ((min_ask + max_bid) * 0.5).toFixed(2);
                  } else if (isFinite(min_ask)) {
                        this.currentMarkPrice = document.title = min_ask.toFixed(2);
                  } else if (isFinite(max_bid)) {
                        this.currentMarkPrice = document.title = max_bid.toFixed(2);
                  } else {
                        this.currentMarkPrice = document.title = '';
                  }

            },
            sortOrders(arr){
                  return arr.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
            },
            onItemClick(item){
                  this.$root.$emit('setOrder', item)
            },
            select(val){
                  this.groupByNumber = val;
            },
            groupBy(array) {
                  const buyOrdersLength = array.length;
                  let finalResults = [];
                  let i = buyOrdersLength - 1;
                  const priceInteger = Math.trunc(array[i].price);
                  let maxPrice = priceInteger - (priceInteger % Number(this.groupByNumber)) + Number(this.groupByNumber);
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
                  return finalResults;
            },
            handleOrdersInsertion(arr){
                  if(arr.existing) {
                        this.items = arr.existing;
                  } 
                  if(arr.delete) {
                        this.items = this.items.filter(order => !arr.delete.includes(order.id))
                  }
                  if(arr.insert) {
                        this.items.push(...arr.insert)
                  }
            },
            startSocket(){
                  console.log("Starting connection to WebSocket Server");
                  this.connection = webSocket;
                  this.connection.onopen = function (event) {
                        console.log(event);
                        console.log("Successfully connected to WebSocket");
                  };

                  this.connection.onmessage = ({ data }) => {
                        const message = JSON.parse(data);
                        this.handleOrdersInsertion(message);
                        this.averageCalculation();
                  };
            }
      },
      created() {
            this.startSocket();

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