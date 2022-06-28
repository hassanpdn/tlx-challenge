<template>
      <button class="btn" :class="variant" :disabled="disabled" @click="callback($event)">
            <span>{{title}}</span>
            <BaseIcon place="button" class="icon" :icon="icon" />
      </button>
</template>

<script>
import BaseIcon from '@/components/base/BaseIcon'
export default {
      name: "btn",
      components: {BaseIcon},
      props: {
            variant: {
                  type: String,
                  default: 'normal'
            },
            icon: {
                  type: String,
                  default: ''
            },
            title: {
                  type: String,
                  default: ''
            },
            disabled: {
                  type: Boolean,
                  default: false
            },
      },
      methods: {
            callback: function (e) {
                  this.$emit("click", e);
            },
      },
};
</script>

<style>
      .btn {
            position: relative;
            display: flex;
            justify-content: center;
            align-items: center;
            border: 1px solid transparent;
            color: var(--darker-gray);
            border-radius: var(--radius-sm);
            cursor: pointer;
      }
      button.disabled {
            cursor: not-allowed;
      }
      button.danger {
            background-color: var(--danger);
            color: var(--white);
      }
      button.success {
            background-color: var(--success);
            color: var(--white);
      }
      button.info {
            background-color: var(--info);
            color: var(--white);
      }
      button.warning {
            background-color: var(--warning);
            color: var(--white);
      }

      @media (hover: hover) {
            button:hover {
                  box-shadow: 0 3px 21px -7px var(--gray);
                  transition: ease .3s;
            }
      }

      @media (hover: none) {
            button:active {
                  box-shadow: 0 3px 21px -7px var(--gray);
                  transition: ease .3s;
            }
      }
</style>
