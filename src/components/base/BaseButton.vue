<template>
      <button :class="variant" :disabled="disabled" @click="callback($event)">
            <span>{{title}}</span>
      </button>
</template>

<script>
export default {
      name: "btn",
      props: {
            variant: {
                  type: String,
                  default: 'normal'
            },
            title: {
                  type: String
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
      button {
            padding: 7px 14px;
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
      button:hover {
            box-shadow: 0 3px 21px -7px var(--gray);
            transition: ease .3s;
      }
</style>
