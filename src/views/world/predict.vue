<template>
  <div class="predict">
    <el-row :gutter="10">
      <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
          <predictechartVue>
<predictlineVue :id="'line1'" :title="'未来一周新增死亡人数'" :x="predict1.time" :y="predict1.dead" :begin="predict1.begintime" :end="predict1.endtime"></predictlineVue>
          </predictechartVue>
      </el-col>
      <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
        <predictechartVue>
<predictlineVue :id="'line2'" :title="'未来一周新增确诊人数'" :x="predict2.time" :y="predict2.comfirm" :begin="predict2.begintime" :end="predict2.endtime"></predictlineVue>
          </predictechartVue>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import predictechartVue from '@/components/echarts/predict_echart.vue'
import predictlineVue from './predict/predictline.vue'

export default {
  components:{
    predictechartVue,predictlineVue
  },
  data() {
    return {
      predict1:this.$store.state.worldpredict,
 predict2:this.$store.state.worldpredict,
    }
  },
}
</script>
<style lang="scss" scoped>
.predict{
  width:99.5%;
  // height:100%;
}
</style>