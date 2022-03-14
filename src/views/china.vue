<template>
  <div style="width:99%">
    <el-row :gutter="10">
       
 
      <el-col :xs="24" :sm="24" :md="24" :lg="6" :xl="6">
      
          <echartdivVue>
              <lineVue :optiondata="line1"  :id="'line1'" :title="'国内疫情累计概况'"></lineVue>
          </echartdivVue>
        
    
           <echartdivVue style="  margin-top: 0.1875rem;">
              <lineVue :optiondata="line2" :id="'line2'" :title="'国内疫情新增概况'" ></lineVue>
          </echartdivVue>
          
  
      </el-col>
       <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
       
          <countdownVue></countdownVue>
<mapshow></mapshow>
       </el-col>
        <el-col :xs="24" :sm="24" :md="24" :lg="6" :xl="6">
          
          <echartdivVue>
                <cicleVue :optiondata="cicle" :id="'cicle'"  :title="'疫情数据占比'"></cicleVue>
           
          </echartdivVue>
        
           <echartdivVue style="  margin-top: 0.1875rem;">
           <introductionVue></introductionVue>
          </echartdivVue>
        </el-col>
    </el-row>
  </div>
</template>
<script>
import lineVue from '@/components/echarts/line.vue'
import echartdivVue from '@/components/echarts/echart_div.vue'
import countdownVue from './china/index/countdown.vue'
import mapshow from './china/index/mapshow.vue'
import introductionVue from './china/index/introduction.vue'
import cicleVue from '@/components/echarts/cicle.vue'

export default {
    components:{
      lineVue,
      echartdivVue,
      countdownVue,
      mapshow,
      introductionVue,
      cicleVue
    },
    data() {
      return {
        id:0,
        //曲线1
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
//曲线2
line2:{
  
    color:   ['#00DDFF', '#FF0087', '#FFBF00'],
   
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'cross',
            label: {
                backgroundColor: '#6a7985'
            }
        }
    },
    legend: {
        data: ['新增治愈病例','新增确诊病例','新增死亡病例'],
        // 修饰图例文字的颜色
      textStyle: {
        color: "#4c9bfd"
      }
    },
   dataZoom: [{
    bottom: "3%",
    textStyle:{
      color:"#fff"
    }
  }],
    grid: {
        left: '1%',
        right: '7%',
        bottom: '15%',
        top:"12%",
        containLabel: true
    },
    xAxis: [
        {
            type: 'category',
            boundaryGap: false,
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
         	 axisLine:{
                         lineStyle:{
          color:"#f4f4f4"
        }
                    },
            axisLabel: {
        lineStyle:{
          color:"#f4f4f4"
        }
      },
            
        }
    ],
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
    series: [


        {
            name: '新增治愈病例',
            type: 'line',
            smooth: true,
            lineStyle: {
                width: 0
            },
            showSymbol: false,
            areaStyle: {
                opacity: 0.8,
                color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                    offset: 0,
                    color: 'rgba(128, 255, 165)'
                }, {
                    offset: 1,
                    color: 'rgba(1, 191, 236)'
                }])
            },
            emphasis: {
                focus: 'series'
            },
            data: [120, 200, 150, 80, 70, 110, 130],
        },


        {
            name: '新增确诊病例',
            type: 'line',
            smooth: true,
            lineStyle: {
                width: 0
            },
            showSymbol: false,
            areaStyle: {
                opacity: 0.8,
                color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                    offset: 0,
                    color: 'rgba(255, 0, 135)'
                }, {
                    offset: 1,
                    color: 'rgba(135, 0, 157)'
                }])
            },
            emphasis: {
                focus: 'series'
            },
            data: [120, 200, 150, 80, 70, 110, 130]
        },
        {
            name: '新增死亡病例',
            type: 'line',
            smooth: true,
            lineStyle: {
                width: 0
            },
            showSymbol: false,
            label: {
                show: true,
                position: 'top'
            },
            areaStyle: {
                opacity: 0.8,
                color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                    offset: 0,
                    color: 'rgba(255, 191, 0)'
                }, {
                    offset: 1,
                    color: 'rgba(224, 62, 76)'
                }])
            },
            emphasis: {
                focus: 'series'
            },
            data: [120, 200, 150, 80, 70, 110, 130]
        }

        
    ]
}
,
//饼图
cicle:{
  

    color: ['#1aa3ff', '#04f9fa', '#16bd87', '#c961ff', '#7cfc12'],
    tooltip: {
        trigger: 'item',
        formatter: '{b}：{c} ({d}%)',
      
    },
    legend: {
        bottom: '3%',
        itemWidth: 10,
        itemHeight: 10,
        textStyle: {
            color: '#fff',
            fontSize: '14',
        },
    },
    series: [
        // 内圈
        {
            type: 'pie',
            center: ['50%', '50%'],
            radius: ['45.5%', '35.5%'],
            silent: true, //取消高亮
            label: { show: false, position: 'center' },
            data: [{
        value: 137,
        name: '数学',
    },
    {
        value: 103,
        name: '语文',
    },
    {
        value: 124,
        name: '英语',
    },
    {
        value: 180,
        name: '理综',
    }],
        },
        // 外圈
        {
            type: 'pie',
            center: ['50%', '50%'],
            radius: ['55%', '75%'],
            label: { show: false, position: 'center' },
            emphasis: {
                label: {
                    show: true,
                    fontSize: 15,
                    lineHeight: 45,
                    formatter: (params) => {
                        return '{name|' + params.name + '}\n{value|' + params.value + '}';
                    },
                    
                    rich: {
                        name: {
                            color: '#fff',
                        },
                        value: {
                            color: '#04F9FA',
                        },
                    },
                },
            },
            data: [{
        value: 137,
        name: '数学',
    },
    {
        value: 103,
        name: '语文',
    },
    {
        value: 124,
        name: '英语',
    },
    {
        value: 180,
        name: '理综',
    }],
        },
    ],



},

//地图
mapdata:{}
      }
    },
}
</script>
<style lang="scss" scoped>

</style>