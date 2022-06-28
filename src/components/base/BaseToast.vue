<template>
      <div class="toaster">
            <transition-group name="toasts-list" tag="div" class="toasts-wrapper">
                  <div class="toast-item" v-for="toast in toasts" :key="`toast-number-${toast.id}`" :class="toast.state">
                        {{toast.message}}
                        <span class="remove-toast" @click="removeToast(toast.id)">
                              <img style="width:10px" src="@/assets/images/svg/cancel.svg" alt="">
                        </span>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 232.5 232.5" width="50" height="50" class="timer">
                              <circle cx="116.125" cy="116.125" r="106.125" fill="none" stroke="rgba(255,255,255,0.7)" stroke-width="10"/>
                              <circle cx="116.125" cy="116.125" r="106.125" fill="none" :class="`stroke-${toast.state}`" stroke-width="10" stroke-dasharray="670" :stroke-dashoffset="670  - toast.offset" stroke-linecap="round"/>
                        </svg>
                  </div>
            </transition-group>
      </div>
</template>

<script>
import { generateUniqueId } from '@/helpers/helpers';

      export default {
            name: 'Toast',
            components: {},
            data(){
                  return {
                        toasts: []
                  }
            },
            methods: {
                  addToast(payload){
                        if (!(payload.message && payload.message.length > 0)) return;
                        let new_id = generateUniqueId(5);
                        let new_item = {
                              state: payload.state,
                              message: payload.message,
                              time: payload.time,
                              offset: 670,
                              id: new_id,
                        };
                        this.toasts.splice(0, 0, new_item);
                        var int = window.setInterval(() => {
                              let vision = this.toasts.find(obj => obj.id === new_id);
                              if (vision) {
                                    vision.offset = vision.offset - 1;
                                    if (vision.offset <= 0) {
                                          vision.offset = 0;
                                          window.clearInterval(int);
                                          this.removeToast(new_id);
                                          if (typeof new_item.callback === "function") new_item.callback();
                                    }
                              } else {
                                    window.clearInterval(int);
                                    this.removeToast(new_id);
                                    if (typeof new_item.callback === "function") new_item.callback();
                              }
                        }, new_item.time / 670);
                  },
                  removeToast(id) {
                        this.toasts = this.toasts.filter(i => i.id !== id)
                  },
                  removeFirstItem(){
                        this.toasts = this.toasts.slice(1)
                  }
            },
            mounted(){
                  this.$root.$on('notify', this.addToast)
            }
      }
</script>

<style>
      .toaster {
            display: flex;
            flex-wrap: wrap;
            align-items: center;
            justify-content: center;
            width: 380px;
            max-width: 98%;
            position: fixed;
            top: 15px;
            left: 50%;
            transform: translateX(-50%);
            z-index: 9999999;

      }
      .toasts-list-enter-active, .toasts-list-leave-active {
            transition: all 500ms;
      }

      .toasts-list-enter, .toasts-list-leave-to {
            opacity: 0;
            top: -15px;
      }

      .toasts-list-enter-to, .toasts-list-leave {
            opacity: 1;
            top: 0;
      }

      .toasts-wrapper {
            width: 100%;
      }

      .toast-item {
            position: relative;
            padding: 12px 40px 12px 48px;
            border-radius: 10px;
            font-size: 90%;
            line-height: 1.7em;
            margin-bottom: 5px;
      }

      .toast-item.success {
            background: var(--success);
            color: var(--white);

      }

      .toast-item.danger, .toast-item.error {
            background: var(--danger);
            color: var(--white);

      }

      .toast-item.warning {
            background: var(--warning);
            color: var(--white);

      }

      .toast-item.info {
            background: var(--info);
            color: var(--white);
      }

      .timer {
            position: absolute;
            top: 50%;
            left: 5px;
            width: 33px;
            height: 33px;
            transform: translateY(-50%);

      }

      .stroke-error {
            stroke: var(--danger);
      }

      .stroke-success {
            stroke: var(--success);
      }

      .stroke-warning {
            stroke: var(--warning);
      }

      .stroke-info {
            stroke: var(--info);
      }

      .time-bar {
            position: absolute;
            bottom: 0;
            height: 3px;
            left: 0;
            width: 100%;
            background: rgba(0, 0, 0, 0.3);
      }

      .remove-toast {
            display: flex;
            width: 22px;
            height: 22px;
            align-items: center;
            justify-content: center;
            position: absolute;
            top: 50%;
            right: 10px;
            border-radius: 50%;
            background: rgba(0, 0, 0, 0.15);
            transform: translateY(-50%);
            cursor: pointer;
      }

      .remove-toast .icon {
            width: 8px;
            filter: invert(1);
      }
</style>
