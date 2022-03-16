<template>
  <div style="width:100%;height:100%">
    <backgroundCopyVue></backgroundCopyVue>
    <router-view></router-view>
  </div>
</template>
<script>
import backgroundCopyVue from '../components/bdworld.vue'

export default {
  components:{backgroundCopyVue}
}
</script>
<style lang="scss" scoped>

</style>