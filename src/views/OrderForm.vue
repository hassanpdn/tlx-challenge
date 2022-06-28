<template>
      <base-card class="order-form">
            <number-control class="number-input" v-model="order.price" icon="usdCoin" label="Price:" :step="5" :min="0"></number-control>
            <number-control class="number-input" v-model="order.amount" icon="angleRight" label="Quantity:" :step="10" :min="0"></number-control>
            <div class="side-selection">
                  <btn icon="arrowDown" @click="insertOrder('sell')" class="sell" variant="danger" title="sell"/>
                  <btn icon="arrowUp" @click="insertOrder('buy')" class="buy" variant="success" title="buy"/>
            </div>
      </base-card>
</template>

<script>
      //Components
      import BaseCard from '@/components/base/BaseCard';
      import NumberControl from '@/components/base/BaseNumberControlInput';
      import Btn from '@/components/base/BaseButton'

      //Services
      import {insertNewOrder} from '@/services/orders.service'

      export default {
            name: 'order-form',
            components: {BaseCard, NumberControl, Btn},
            data(){
                  return {
                        order: {
                              price: 0,
                              amount: 0,
                              side: ''
                        },
                        selectedOrder: {},
                        insertedOrder: {}
                  }
            },
            methods: {
                  setOrder(src) {
                        const res = {};
                        Object.keys(this.order)
                              .forEach(k => res[k] = (src[k] ?? this.order[k]));
                        this.order = Object.assign({}, this.order, res)
                  },
                  async insertOrder(type){
                        this.order.side = type;
                        const res = await(insertNewOrder(this.order));
                        this.insertedOrder = res.data?.order;
                        this.$root.$emit('notify', {state: res.data.result ? 'success' : 'danger', message: res.data.result || 'Invalid price'})
                  }
            },
            mounted(){
                  this.$root.$on('setOrder', this.setOrder)
            },
            beforeDestroy(){
                  this.$root.$off('setOrder')
            }
      }
</script>

<style>

.order-form {
      margin-top: 58px;
      width: 50%
}

@media screen and (max-width: 48em) {   
      .order-form {
            width: 100%;
      }
}

@media screen and (min-width: 76em) {   
      .order-form {
            width: 30%;
      }
}


.number-input {
      margin-top: 15px;
}

.side-selection {
      display: flex;
      justify-content: space-between;
      margin: 0px auto; 
      text-align: center;
}

.sell, .buy {
      padding-right: 7px;
      padding-left: 7px;
      width: calc(50% - 10px);
}
</style>