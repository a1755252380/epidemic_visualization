<template>
  <div id="app">
    <!-- <backgroundVue></backgroundVue> -->
    <!-- <remote-js src="https://cdn.jsdelivr.net/npm/echarts/map/js/china.js?v=1598903772045"></remote-js> -->
    <router-view></router-view>
  </div>
</template>
<script>
import backgroundVue from '@/components/background.vue'

export default {
  components: {
    // backgroundVue
    // 'remote-js': {
    //   render (createElement) {
    //     return createElement('script', { attrs: { type: 'text/javascript', src: this.src } });
    //   },
    //   props: {
    //     src: { type: String, required: true },
    //   },
    // },
  },

}

</script>

<style lang="scss">
@import url("../src/assets/css/html.css");
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  
}


</style>
