<template>
      <div class="control number">
            <button class="decrement-button" :disabled="decrementDisabled" @click="decrement">−</button>
            <button class="increment-button" :disabled="incrementDisabled" @click="increment">+</button>
            <label class="label" for="number-control">{{label}}</label>
            <div class="input-icons">
                  <BaseIcon class="icon" :icon="icon" />
                  <input id="number-control"
                        type="number"
                        :disabled="inputDisabled"
                        :min="min"
                        :max="max"
                        :step="step"
                        v-model.number="currentValue"
                        @blur="currentValue = value"
                        @keydown.esc="currentValue = value"
                        @keydown.enter="currentValue = value"
                        @keydown.up.prevent="increment"
                        @keydown.down.prevent="decrement" class="input-field"
                  >
            </div>
      </div>
</template>

<script>
import BaseIcon from '@/components/base/BaseIcon'
export default {
      name: "number-control",
      components: {BaseIcon},
      props: {
            disabled: Boolean,
            max: {
                  type: Number,
                  default: Infinity,
            },
            min: {
                  type: Number,
                  default: -Infinity,
            },
            value: {
                  required: true,
            },
            step: {
                  type: Number,
                  default: 0.00,
            },
            label: {
                  type: String,
                  default: ''
            },
            icon: {
                  type: String,
                  default: ''
            },
      },

      data() {
            return {
                  currentValue: this.value,
                  decrementDisabled: false,
                  incrementDisabled: false,
                  inputDisabled: false,
            };
      },

      watch: {
            value(val) {
                  this.currentValue = val;
                  if(val) {
                        this.decrementDisabled = false;
                  } else {
                        this.currentValue = 0
                  }
            },
            currentValue(val) {
                  this.$emit("input", val);
            }
      },

      methods: {
            increment() {
                  if (this.disabled || this.incrementDisabled) {
                        return;
                  }

                  let newVal = this.currentValue + 1 * this.step;
                  this.decrementDisabled = false;

                  this._updateValue(newVal);
            },
            decrement() {
                  if (this.disabled || this.decrementDisabled) {
                        return;
                  }

                  let newVal = this.currentValue + -1 * this.step;
                  this.incrementDisabled = false;

                  this._updateValue(newVal);
            },
            _updateValue(newVal) {
                  const oldVal = this.currentValue;

                  if (oldVal === newVal || typeof this.value !== "number") {
                        return;
                  }
                  if (newVal <= this.min) {
                        newVal = this.min;
                        this.decrementDisabled = true;
                  }
                  if (newVal >= this.max) {
                        newVal = this.max;
                        this.incrementDisabled = true;
                  }
                  this.currentValue = newVal;
                  this.$emit("input", this.currentValue);
            },
      },

      mounted() {
            if (this.value == this.min) {
                  this.decrementDisabled = true;
            }
      },
};
</script>

<style>
.control.number {
      display: inline-flex;
      position: relative;
      width: 100%;
}
.label {
      position: absolute;
      top: -20px;
      font-size: var(--font-size-sm);
}
.decrement-button, .increment-button {
      position: absolute;
      top: 0.0625rem;
      border: 0px solid var(--light-gray);
      border-radius: 0;
      background-color: #fff;
      border-left-width: 1px;
      color: var(--dark-gray);
      font-weight: bold;
      width: 2.5rem;
      height: 2.375rem;
      cursor: pointer;
}
.input-icons .icon {
      position: absolute;
}
		
.input-icons {
      width: 100%;
      margin-bottom: 10px;
}

.icon {
      padding: 10px;
}

.input-field {
      width: 100%;
      padding: 10px 10px 10px 35px;
      text-align: left;
}
input:active,
input:focus {
      border-color: var(--green);
      color: var(--green);
      outline: none;
}

@media (hover: hover) {
      input:hover {
            border: .5px solid var(--green);
            border-color: var(--green);
            color: var(--green);
            outline: none;
      }
}

@media (hover: none) {
      input:active {
            border: .5px solid var(--green);
            border-color: var(--green);
            color: var(--green);
            outline: none;
      }
}

input:active,
input:focus {
      border: 0;
      box-shadow: 0 0 0 0.1rem var(--green);
}
input:disabled,
input.is-disabled {
      color: var(--gary);
      opacity: 1;
}
.increment-button {
      border-top-right-radius: 3px;
      border-bottom-right-radius: 3px;
      right: calc(1.5 / 14 * 1rem);
}
.decrement-button {
      right: calc(36.5 / 14 * 1rem);
}
input {
      border: 1px solid var(--light-gray);
      height: 2.5em;
      border-radius: 3px;
}
input::-webkit-inner-spin-button,
input::-webkit-outer-spin-button {
      -webkit-appearance: none;
      margin: 0;
}
</style>