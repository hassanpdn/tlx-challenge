<template>
      <div id="table" class="table-container">
            <table class="table">
                  <thead>
                        <tr>
                              <th v-for="(header, index) in headers" :key="`header-${index}`" class="row-number">{{header.title}}</th>
                        </tr>
                  </thead>
                  <tbody>
                        <tr v-for="(item , i) in items" :key="`item-${i}`" :class="item.side === 'buy' ? 'buy-item':'sell-item'" @click="handleRowClick(item)">
                              <td :class="{'sell': item['side'] === 'sell' && header.value === 'price', 'buy': item['side'] === 'buy' && header.value === 'price'}" v-for="(header, j) in headers" :key="`header-${j}`">
                                    {{priceSeperator(item[header.value].toFixed(2))}}
                              </td>
                        </tr>
                  </tbody>
            </table>
      </div>
</template>

<script>
import {priceSeperator} from '@/helpers/helpers';
export default {
      name: "datatable",
      props: {
            items: {
                  type: Array,
                  default: () => {[]}
            },
            headers: {
                  type: Array,
                  default: () => {[]}
            }
      },
      methods: {
            priceSeperator,
            scrollToBottom(element){
                  const elem = element || document.getElementsByClassName('table')[0];
                  elem.scrollIntoView({block: 'end'});
            },
            handleRowClick(item){
                  this.$emit('rowClick', item)
            }
      },
      updated(){
            const container = document.getElementsByClassName('table')[0];
            this.scrollToBottom(container);
      }
};
</script>

<style>
      .table-container {
            width: 100%;
            height: 200px;
            max-height: 200px;
            overflow: auto;
      }
      table {
            position: relative;
            width: 100%;
            border-collapse: collapse; 
            text-align: left;
      }
      th, td {
            padding: 10px;
      }
      tr th {
            background: var(--table-head-bg);
            color: var(--table-color);
      }
      th {
            background: var(--white);
            position: sticky;
            top: 0;
            box-shadow: 0 2px 2px -1px rgba(0, 0, 0, 0.4);
      }
      tbody tr {
            cursor: pointer;
      }
      /* tbody tr:nth-child(even) {
            background: var(--table-row-bg);
      } */
      tbody tr .sell {
            color: var(--danger);
      }
      tbody tr .buy {
            color: var(--success);
      }
      @media (hover: hover) {
            tbody tr .buy:hover, tbody tr .sell:hover{
                  color: var(--white);
            }
            tbody tr.sell-item:hover {
                  color: var(--white);
                  background-color: #efbebe;
            }
            tbody tr.buy-item:hover {
                  color: var(--white);
                  background-color: #7aad7a;
            }
      }
      @media (hover: none) {
            tbody tr .buy:active, tbody tr .sell:active{
                  color: var(--white);
            }
            tbody tr.sell-item:active {
                  color: var(--white);
                  background-color: #efbebe;
            }
            tbody tr.buy-item:active {
                  color: var(--white);
                  background-color: #7aad7a;
            }
      }

      .table-container::-webkit-scrollbar {
            width: 10px;
            height: 10px;
            display: block;
      }

      .table-container::-webkit-scrollbar-thumb {
            border-radius: 5px;
      }

      .table-container::-webkit-scrollbar-thumb {
            background: #ddd;
            border-radius: 5px;
      }
</style>
