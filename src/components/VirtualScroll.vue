<template>
      <div class="root" ref="root" :style="rootStyle">
            <div class="viewport" ref="viewport" :style="viewportStyle">
                  <div class="spacer" ref="spacer" :style="spacerStyle">
                        <table class="table">
                              <thead>
                                    <tr>
                                          <th v-for="(header, index) in headers" :key="`header-${index}`" class="row-number">{{header.title}}</th>
                                    </tr>
                              </thead>
                              <tbody>
                                    <tr v-for="(item , i) in items.length < 10 ? items : visibleItems" :key="`item-${i}`" :class="item.side === 'buy' ? 'buy-item':'sell-item'" @click="handleRowClick(item)">
                                          <td :class="{'sell': item['side'] === 'sell' && header.value === 'price', 'buy': item['side'] === 'buy' && header.value === 'price'}" v-for="(header, j) in headers" :key="`header-${j}`">
                                                {{priceSeperator(item[header.value].toFixed(2))}}
                                          </td>
                                    </tr>
                              </tbody>
                        </table>
                  </div>
            </div>
      </div>
</template>

<script>
      import passiveSupportMixin from "@/mixins/passiveSupportMixin";
      import {priceSeperator} from '@/helpers/helpers';

      export default {
            name: "virtual-scroll",
            mixins: [passiveSupportMixin],
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
            data() {
                  return {
                        rootHeight: 200,
                        rowHeight: 30,
                        scrollTop: 0,
                        nodePadding: 20,
                  };
            },
            computed: {
                  viewportHeight() {
                        return (this.itemCount * this.rowHeight) < 100 ? 150 : this.itemCount * this.rowHeight;
                  },
                  startIndex() {
                        let startNode =
                              Math.floor(this.scrollTop / this.rowHeight) -
                              this.nodePadding;
                        startNode = Math.max(0, startNode);
                        return startNode;
                  },
                  visibleNodeCount() {
                        let count =
                              Math.ceil(this.rootHeight / this.rowHeight) +
                              2 * this.nodePadding;
                        count = Math.min(this.itemCount - this.startIndex, count);
                        return count;
                  },
                  visibleItems() {
                        return this.items.slice(
                              this.startIndex,
                              this.startIndex + this.visibleNodeCount
                        );
                  },
                  itemCount() {
                        return this.items.length;
                  },
                  offsetY() {
                        return this.startIndex * this.rowHeight;
                  },
                  spacerStyle() {
                        return {
                              transform: "translateY(" + this.offsetY + "px)",
                        };
                  },
                  viewportStyle() {
                        return {
                              overflow: "hidden",
                              height: this.viewportHeight + "px",
                              position: "relative",
                        };
                  },
                  rootStyle() {
                        return {
                              height: this.rootHeight + "px",
                              overflow: "auto",
                        };
                  },
            },
            methods: {
                  priceSeperator,
                  scrollToBottom(element){
                        const elem = element || document.getElementsByClassName('table')[0];
                        elem.scrollIntoView({block: 'end'});
                  },
                  handleRowClick(item){
                        this.$emit('rowClick', {price: item.price.toFixed(2), amount: item.amount.toFixed(2), side: item.side})
                  },
                  handleScroll() {
                        this.scrollTop = this.$refs.root.scrollTop;
                  },
                  calculateInitialRowHeight() {
                        const children = this.$refs.spacer.children;
                        let largestHeight = 0;
                        for (let i = 0; i < children.length; i++) {
                              if (children[i].offsetHeight > largestHeight) {
                                    largestHeight = children[i].offsetHeight;
                              }
                        }
                        return largestHeight;
                  },
            },
            mounted() {
                  this.$refs.root.addEventListener(
                        "scroll",
                        this.handleScroll,
                        this.doesBrowserSupportPassiveScroll()
                              ? { passive: true }
                              : false
                  );
                  // Calculate that initial row height dynamically
                  const largestHeight = this.calculateInitialRowHeight();
                  this.rowHeight =
                        typeof largestHeight !== "undefined" && largestHeight !== null
                              ? largestHeight
                              : 30;
            },
            updated(){
                  const container = document.getElementsByClassName('table')[0];
                  this.scrollToBottom(container);
            },
            destroyed() {
                  this.removeEventListener("scroll", this.handleScroll);
            }
      };
</script>

<style>
      .viewport {
            background: #fefefe;
            overflow-y: auto;
      }

      .spacer > div {
            padding: 0.5rem 0rem;
            border: 1px solid #f5f5f5;
      }
      table {
            position: relative;
            width: 100%;
            border-collapse: collapse; 
            text-align: left;
      }
      th, td {
            width: 50%;
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
      tbody tr:nth-child(even) {
            background: var(--table-row-bg);
      }
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

      .root::-webkit-scrollbar {
            width: 10px;
            height: 10px;
            display: block;
      }

      .root::-webkit-scrollbar-thumb {
            border-radius: 5px;
      }

      .root::-webkit-scrollbar-thumb {
            background: #ddd;
            border-radius: 5px;
      }
</style>