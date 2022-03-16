<template>
  <div style="width:99%">
 
    <el-row :gutter="10">
        <el-col :xs="24" :sm="24" :md="24" :lg="18" :xl="18">
            <countdownVue></countdownVue>
            <worldshowVue></worldshowVue>
        </el-col>
     <el-col :xs="24" :sm="24" :md="24" :lg="6" :xl="6">
        <echartdivVue>
<lineVue :id="'line2'" :title="'世界疫情累计趋势'" :optiondata="line1"></lineVue>
        </echartdivVue>
        <echartdivVue style="margin-top:0.18rem">
<lineVue :id="'line1'" :title="'世界疫情新增趋势'" :optiondata="line2"></lineVue>
        </echartdivVue>
     </el-col>
    </el-row>
  </div>
</template>
<script>
import echartdivVue from '../../components/echarts/echart_div.vue'
import lineVue from '../../components/echarts/line.vue'
import countdownVue from '../world/index/countdown.vue'
import worldshowVue from './index/worldshow.vue'

export default {
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
    },
    start:90,
    end:100
  }],
    xAxis: {
      type: "category",
      boundaryGap: false,
      data: this.$store.state.world.time,
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
      // boundaryGap: [0, '100%'],
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
        data:this.$store.state.world.time_dead
      },


       {
      // symbol: 'none',
        name: "累计治愈",
        type: "line",
//      stack: "总量",
        // 是否让线条圆滑显示
        smooth: true,
        data:this.$store.state.world.time_heal
      }, {
      // symbol: 'none',
        name: "累计确诊",
        type: "line",
//      stack: "总量",
        // 是否让线条圆滑显示
        smooth: true,
        data:this.$store.state.world.time_confirm
      },
    ]
},
     line2:{
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
    },
     start:90,
    end:100
  }],
    xAxis: {
      type: "category",
      boundaryGap: false,
      data: this.$store.state.world.time,
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
      // boundaryGap: [0, '100%'],
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
        data:this.$store.state.world.time_newadddead
      },


       {
      // symbol: 'none',
        name: "累计治愈",
        type: "line",
//      stack: "总量",
        // 是否让线条圆滑显示
        smooth: true,
        data:this.$store.state.world.time_newaddheal
      }, {
      // symbol: 'none',
        name: "累计确诊",
        type: "line",
//      stack: "总量",
        // 是否让线条圆滑显示
        smooth: true,
        data:this.$store.state.world.time_newaddconfirm
      },
    ]
},
    }
  },
  components:{countdownVue
  ,echartdivVue,
  lineVue,
  worldshowVue
  }
}
</script>
<style lang="scss" scoped>

</style>