<template>
  <div class="map">
      <chinabackgroundVue></chinabackgroundVue>
      <mapVue></mapVue>
  </div>
</template>
<script>
import chinabackgroundVue from './china_background.vue';
import mapVue from './map.vue';

export default {
   components:{
      chinabackgroundVue,
      mapVue
    }
}
</script>
<style lang="scss" scoped>
.map{
  width: 100%;
  height: 75vh;
}
</style>