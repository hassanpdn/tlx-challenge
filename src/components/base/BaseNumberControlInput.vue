<template>
      <div class="control number">
            <button class="decrement-button" :class="{'active-state' : state === 'decrement'}" :disabled="decrementDisabled" @click="decrement">−</button>
            <button class="increment-button" :class="{'active-state' : state === 'increment'}" :disabled="incrementDisabled" @click="increment">+</button>
            <label class="label" for="number-control">{{label}}</label>
            <div class="input-icons">
                  <BaseIcon class="icon" :icon="icon" />
                  <input id="number-control"
                        type="number"
                        :disabled="inputDisabled"
                        :min="min"
                        :max="max"
                        :step="step"
                        @change="setTwoNumberDecimal"
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
                  state: ''
            };
      },

      watch: {
            value(val) {
                  this.currentValue = val;
            },
            currentValue(val) {
                  this.$emit("input", val);
            }
      },

      methods: {
            setTwoNumberDecimal() {
                  console.log(this.currentValue)
            },
            increment() {
                  if (this.disabled || this.incrementDisabled) {
                        return;
                  }

                  let newVal = this.currentValue + 1 * this.step;
                  this.decrementDisabled = false;
                  this.state = 'increment'

                  this._updateValue(newVal);
            },
            decrement() {
                  if (this.disabled || this.decrementDisabled) {
                        return;
                  }

                  let newVal = this.currentValue + -1 * this.step;
                  this.incrementDisabled = false;
                  newVal === this.min ? this.state = '' : this.state ='decrement'

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
.active-state {
      color: var(--white);
      background: var(--gray);
}
.control.number {
      display: inline-flex;
      position: relative;
      width: 100%;
      max-width: calc(180 / 16 * 1rem);
}
.label {
      position: absolute;
      top: -20px;
      font-size: var(--font-size-sm);
}
.decrement-button, .increment-button {
      border: 0px solid var(--light-gray);
      border-left-width: 1px;
      border-radius: 0;
      position: absolute;
      top: 0.0625rem;
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
input:hover,
input:active,
input:focus {
      border-color: var(--green);
      color: var(--green);
      outline: none;
}

input:hover {
      border: .5px solid var(--green);
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
      border-radius: 3px;
      font-size: 0.875rem;
      flex: 1 0;
      line-height: 1.65;
      height: 2.5em;
      margin: 0 auto;
      padding-left: 0.5rem;
      padding-right: calc(82 / 16 * 1rem);
      text-align: left;
      width: 100%;
      max-width: 100%;
      vertical-align: top;
}
input::-webkit-inner-spin-button,
input::-webkit-outer-spin-button {
      -webkit-appearance: none;
      margin: 0;
}
</style>