<template>
      <div id="app">
            <order-book></order-book>
            <order-form></order-form>
            <toaster></toaster>
      </div>
</template>

<script>
// Components
import OrderBook from '@/views/OrderBook';
import OrderForm from '@/views/OrderForm';

export default {
      name: "App",
      components: { OrderBook, OrderForm }
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
