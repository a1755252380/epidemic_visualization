<template>
<div class="detailed">
  <el-row :gutter="10" class="top">
    <el-col :xs="24" :sm="24" :md="24" :lg="8" :xl="8">  <echartdivVue>
              <lineVue :optiondata="line1"  :id="'line1'" :title="'国内疫情累计概况'"></lineVue>
          </echartdivVue></el-col>
    <el-col :xs="24" :sm="24" :md="24" :lg="8" :xl="8">  <echartdivVue>
              <lineVue :optiondata="line1"  :id="'line2'" :title="'国内疫情累计概况'"></lineVue>
          </echartdivVue></el-col>
    <el-col :xs="24" :sm="24" :md="24" :lg="8" :xl="8">  <echartdivVue>
              <lineVue :optiondata="line1"  :id="'line3'" :title="'国内疫情累计概况'"></lineVue>
          </echartdivVue></el-col>
  </el-row>
  <el-row :gutter="10" class="bottom">
    <el-col :xs="24" :sm="24" :md="24" :lg="8" :xl="8">  <echartdivVue>
              <lineVue :optiondata="line1"  :id="'line4'" :title="'国内疫情累计概况'"></lineVue>
          </echartdivVue></el-col>
    <el-col :xs="24" :sm="24" :md="24" :lg="8" :xl="8">  <echartdivVue>
              <lineVue :optiondata="line1"  :id="'line5'" :title="'国内疫情累计概况'"></lineVue>
          </echartdivVue></el-col>
    <el-col :xs="24" :sm="24" :md="24" :lg="8" :xl="8">  <echartdivVue>
              <lineVue :optiondata="line1"  :id="'line6'" :title="'国内疫情累计概况'"></lineVue>
          </echartdivVue></el-col>
  </el-row>
</div>
</template>

<script>
import echartdivVue from '@/components/echarts/echart_div.vue'
import lineVue from '@/components/echarts/line.vue'

export default {
components:{
  echartdivVue,lineVue
},
data() {
  return {
        line1:{
    color: ["#FF1C77","#00f2f1", "#ed3f35"],
    tooltip: {
      // 通过坐标轴来触发
      trigger: "axis"
    },
    legend: {
      // 距离容器10%
      right: "10%",
      // 修饰图例文字的颜色
      textStyle: {
        color: "#4c9bfd"
      }
      // 如果series 里面设置了name，此时图例组件的data可以省略
      // data: ["邮件营销", "联盟广告"]
    },
    grid: {
      top: "10%",
      left: "1%",
      right: "4%",
      bottom: "15%",
      show: true,
      borderColor: "#012f4a",
      containLabel: true
    },
  dataZoom: [{
    bottom: "3%",
    textStyle:{
      color:"#fff"
    }
  }],
    xAxis: {
      type: "category",
      boundaryGap: false,
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      // 去除刻度
      axisTick: {
          lineStyle:{
          color:"#f4f4f4"
        },
        show: true},
      // 修饰刻度标签的颜色
      axisLabel: {
        color: "#fff"
      },
      // 去除x坐标轴的颜色
      axisLine: {
      	  lineStyle:{
          color:"#f4f4f4"
        },
        show: true,
      },
      
    },
    yAxis: {

      type: 'value',
      // 去除刻度
      axisTick: {
        show: true,
         lineStyle:{
          color:"#f4f4f4"
        }
      },
      // 修饰刻度标签的颜色
      axisLabel: {
        color: "#f4f4f4"
      }, axisLine: {
      	
        show: true,
         lineStyle:{
          color:"#f4f4f4"
        }
      },
      boundaryGap: [0, '100%'],
      // 修改y轴分割线的颜色
      splitLine: {
        lineStyle: {
          color: "#012f4a"
        }
      }
    },
  series:  [
      {
      // symbol: 'none',
        name: "累计死亡",
        type: "line",
//      stack: "总量",
        // 是否让线条圆滑显示
        smooth: true,
        data:[120, 132, 101, 134, 90, 230, 210]
      },


       {
      // symbol: 'none',
        name: "累计治愈",
        type: "line",
//      stack: "总量",
        // 是否让线条圆滑显示
        smooth: true,
        data:[220, 182, 191, 234, 290, 330, 310]
      }, {
      // symbol: 'none',
        name: "累计确诊",
        type: "line",
//      stack: "总量",
        // 是否让线条圆滑显示
        smooth: true,
        data:[150, 232, 201, 154, 190, 330, 410]
      },
    ]
},
  }
},
}
</script>

<style lang="scss" scoped>
.detailed {
  width: 100%;
  height: 100%;

  .top {
    width: 100%;
    height: 45vh;
    background: #000;
  }

  .bottom {
    margin-top: 2vh;
    width: 100%;
    height: 45vh;
    background: #000;
  }
}
</style>
