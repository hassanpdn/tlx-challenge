<template>
      <svg
            xmlns="http://www.w3.org/2000/svg"
            :viewBox="viewbox || '0 0 32 32'"
            class="icon"
            :class="{'is-button': place === 'button'}"
      >
            <path
                  v-for="(item, index) in paths"
                  :key="index"
                  :d="item.path"
                  :fill="place === 'button' ? '#fff' : item.fill ||'#000'"
                  opacity="1"
            >
            </path>
      </svg>
</template>

<script>

export default {
      name: "BaseIcon",
      data(){
            return {
                  icons : {
                        angleRight: {
                              viewbox: "0 0 256 512",
                              path: "M224.3 273l-136 136c-9.4 9.4-24.6 9.4-33.9 0l-22.6-22.6c-9.4-9.4-9.4-24.6 0-33.9l96.4-96.4-96.4-96.4c-9.4-9.4-9.4-24.6 0-33.9L54.3 103c9.4-9.4 24.6-9.4 33.9 0l136 136c9.5 9.4 9.5 24.6.1 34z",
                        },
                        usdCoin: {
                              viewbox: "0 0 256 512",
                              path: "M209.2 233.4l-108-31.6C88.7 198.2 80 186.5 80 173.5c0-16.3 13.2-29.5 29.5-29.5h66.3c12.2 0 24.2 3.7 34.2 10.5 6.1 4.1 14.3 3.1 19.5-2l34.8-34c7.1-6.9 6.1-18.4-1.8-24.5C238 74.8 207.4 64.1 176 64V16c0-8.8-7.2-16-16-16h-32c-8.8 0-16 7.2-16 16v48h-2.5C45.8 64-5.4 118.7.5 183.6c4.2 46.1 39.4 83.6 83.8 96.6l102.5 30c12.5 3.7 21.2 15.3 21.2 28.3 0 16.3-13.2 29.5-29.5 29.5h-66.3C100 368 88 364.3 78 357.5c-6.1-4.1-14.3-3.1-19.5 2l-34.8 34c-7.1 6.9-6.1 18.4 1.8 24.5 24.5 19.2 55.1 29.9 86.5 30v48c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16v-48.2c46.6-.9 90.3-28.6 105.7-72.7 21.5-61.6-14.6-124.8-72.5-141.7z",
                        },
                        arrowDown :{
                              viewbox: "0 0 32 32",
                              path: "M26.29 20.29 18 28.59V0h-2v28.59l-8.29-8.3-1.42 1.42 10 10a1 1 0 0 0 1.41 0l10-10z"
                        },
                        arrowUp :{
                              viewbox: "0 0 32 32",
                              path: "M26.71,10.29l-10-10a1,1,0,0,0-1.41,0l-10,10,1.41,1.41L15,3.41V32h2V3.41l8.29,8.29Z"
                        }
                  }
            }
      },
      props: {
            icon: {
                  type: String,
            },
            place : {
                  type: String,
                  default: 'input'
            }
      },
      computed: {
            paths: function () {
                  return Array.isArray(this.icons[this.icon].path)
                        ? this.icons[this.icon].path
                        : [{ path: this.icons[this.icon].path }];
            },
            viewbox: function () {
                  return this.icons[this.icon].viewbox;
            }
      },
};
</script>

<style>
      svg {
            width: 30px;
      }

      .is-button {
            transform: scale(1.5);
      }
</style>