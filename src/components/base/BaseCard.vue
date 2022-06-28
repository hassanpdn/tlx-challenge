<template>
      <div class="card">
            <div v-if="title || $slots.cardHeader" class="card-header">
                  <slot v-if="$slots.cardHeader" name="cardHeader"></slot>
                  <span class="title" v-else-if="title"> {{title}} </span>
            </div>
            <div class="card-body">
                  <slot/>
            </div>
      </div>
</template>

<script>
      export default {
            name: 'Card',
            props : {
                  title: {
                        type: String,
                        default: ''
                  }
            }
      }
</script>

<style>
      .card {
            position: relative;
            display: flex;
            justify-content: space-between;
            flex-direction: column;
            border-radius: 0;
            border-color: rgba(102,119,136,.2);
            min-width: 0;
            word-wrap: break-word;
            background-color: #fff;
            background-clip: border-box;
            border: 1px solid rgba(0,0,0,.125);
      }

      .card-header {
            display: flex;
            justify-content: space-between;
            border-bottom: 1px solid rgba(0,0,0,.04);
            padding: 0.75rem 1.25rem;
            margin-bottom: 0;
            font-size: var(--font-size-lg);
      }
      
      .card-header:first-child {
            border-radius: calc(0.25rem - 1px) calc(0.25rem - 1px) 0 0;
      }

      .card-body {
            flex: 1 1 auto;
            padding: 1.25rem;
      }
</style>