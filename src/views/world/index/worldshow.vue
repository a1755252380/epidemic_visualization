<template>
  <div class="mapdiv">
    <worldbackgroundVue class="back"></worldbackgroundVue>
    <mapVue></mapVue>
  </div>
</template>
<script>
import mapVue from '../../world/index/map.vue'
import worldbackgroundVue from './world_background.vue'

export default {
  components:{
    mapVue,
    worldbackgroundVue
  }
}
</script>
<style lang="scss" scoped>
.mapdiv{
  width:100%;
  height:75vh;
  position: relative;
  .back{
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
  }
}
</style>