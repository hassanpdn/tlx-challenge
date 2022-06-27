<template>
      <div id="app">
            <order-book></order-book>
      </div>
</template>

<script>

import OrderBook from '@/components/OrderBook';
export default {
      name: "App",
      components: {OrderBook}
};
</script>

<style>
#app {
      position: relative;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;
}
</style>
