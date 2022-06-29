<template>
      <base-card class="order-book full-width" title="Order Book">
            <template slot="cardHeader">
                  <div class="card-fix-header">
                        <span>Order Book</span>
                        <base-select v-model="selectedSize" @select="sizeSelection" :list="prices"></base-select>
                  </div>
            </template>
            <virtual-scroll id="sell-v-scroller" @rowClick="onItemClick" :headers="headers" :items="sellOrders"></virtual-scroll>
            <base-card class="current-mark-price">Mark: {{priceSeperator(currentMarkPrice) || '- - -'}}</base-card>
            <virtual-scroll @rowClick="onItemClick" :headers="headers" :items="buyOrders"></virtual-scroll>
      </base-card>
</template>

<script>

// Components
import VirtualScroll from '@/components/VirtualScroll';
import BaseCard from "@/components/base/BaseCard.vue";
import BaseSelect from "@/components/base/BaseSelect.vue";

// Helpers
import { priceSeperator } from "@/helpers/helpers";
import { webSocket } from "@/services/ws";

export default {
      name: "index",
      components: { VirtualScroll, BaseCard, BaseSelect },
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
                  selectedSize: null
            };
      },
      computed: {
            buyOrders() {
                  const buyItems = this.items.filter((order) => order.side === "buy");
                  const sortedBuyItems = this.sortArray(buyItems);
                  if (Number(this.selectedSize)) return this.groupOrdersBySelectedSize(sortedBuyItems);
                  return sortedBuyItems;
            },
            sellOrders() {
                  const sellItems = this.items.filter((order) => order.side === "sell");
                  const sortedBuyItems = this.sortArray(sellItems);
                  if (Number(this.selectedSize)) return this.groupOrdersBySelectedSize(sortedBuyItems)
                  return sortedBuyItems;
            }
      },
      methods: {
            priceSeperator,
            averageCalculation() {
                  const min_ask = Math.min(
                        ...this.sellOrders.map((o) => o.price)
                  );
                  const max_bid = Math.max(
                        ...this.buyOrders.map((o) => o.price)
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
            sortArray(arr){
                  return arr.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
            },
            onItemClick(item){
                  this.$root.$emit('setOrder', item)
            },
            sizeSelection(val){
                  if(val) this.selectedSize = parseInt(val);
                  var container = this.$el.querySelector("#sell-v-scroller");
                  container.scrollTop = container.scrollHeight;
            },
            groupOrdersBySelectedSize(array) {
                  const ordersLength = array.length, groupedArray = [];
                  let index = ordersLength - 1;
                  const priceInteger = Math.trunc(array[index].price);
                  let maxPrice = priceInteger - (priceInteger % Number(this.selectedSize)) + Number(this.selectedSize);
                  while (index >= 0) {
                        let amountSum = 0;
                        let j = index;
                        while (j >= 0 && array[j].price <= maxPrice) {
                              amountSum += array[j].amount;
                              j--;
                        }
                        index = j;
                        groupedArray.unshift({
                              price: maxPrice,
                              amount: amountSum,
                        });
                        maxPrice += Number(this.selectedSize);
                  }
                  return groupedArray;
            },
            handleOrdersInsertion(arr){
                  if(arr.existing) {
                        this.items = arr.existing;
                  } 
                  if(arr.delete) {
                        this.items = this.items.filter(order => !arr.delete.includes(order.id));
                  }
                  if(arr.insert) {
                        this.items.push(...arr.insert)
                  }
            },
            startSocket(){
                  console.log("Starting connection to WebSocket Server");
                  this.connection = webSocket;
                  this.openSocketConnection();
            },
            openSocketConnection(){
                  this.connection.onopen = function (event) {
                        console.log(event);
                        console.log("Successfully connected to WebSocket");
                  }
                  this.handleOnMessageSocket();
            },
            handleOnMessageSocket(){
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