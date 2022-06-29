<template>
      <div>
            <label for="base-select">{{label}}</label>
            <select @change="selectOption" id="base-select" class="select">
                  <option value="null" selected>Select a group size</option>
                  <option v-for="(item, index) in list" :key="`option-${index}`" :value="item" class="select-dropdown__list-item">{{item}}</option>
            </select>
      </div>   
</template>

<script>
      export default {
            name: 'base-select',
            props: {
                  list: {
                        type: Array,
                        default: () => {[]}
                  },
                  label:{
                        type: String,
                        default: ''
                  }
            },
            methods: {
                  selectOption(e){
                        this.$emit('select', e.target.value)
                  }
            }
      }
</script>

<style>
      .select {
            font-size: 12px;
            border: none;
            background: var(--gray);
            border-radius: 5px;
            padding: 8px;
            color: var(--white);
            cursor: pointer;
      }
      .select:focus {
            border: 1px solid var(--light-gray);
      }
      .select:focus-visible {
            outline: none;
      }
</style>