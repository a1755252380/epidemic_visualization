<template>
  <div style="width:100%;height:100%">
    <backgroundVue></backgroundVue>
    <router-view></router-view>
  </div>
</template>
<script>
import backgroundVue from '@/components/background.vue'

export default {
  components:{
    backgroundVue
  },
  mounted() {
   
  },
}
</script>
<style lang="scss" scoped>

</style>
