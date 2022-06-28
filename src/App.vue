<template>
      <div id="app">
            <order-book></order-book>
            <order-form></order-form>
            <toaster></toaster>
      </div>
</template>

<script>
// Components
import OrderBook from '@/components/OrderBook';
import OrderForm from '@/components/OrderForm';

export default {
      name: "App",
      components: {OrderForm, OrderBook }
};
</script>

<style>
#app {
      position: relative;
      display: flex;
      align-items: center;
      flex-direction: column;
      height: 100vh;
      padding: 30px;
}
</style>
