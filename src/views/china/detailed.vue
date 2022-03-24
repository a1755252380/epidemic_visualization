<template>
<div class="detailed" ref="aa">
  <el-row :gutter="10" class="top"  >
    <el-col :xs="24" :sm="24" :md="24" :lg="16" :xl="16"  >
      <el-row :gutter="10">
        <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
           <echartdivVue >
        <lineVue :optiondata="line1" :id="'line4'" :title="'现有无症状感染者数量'"></lineVue>
      </echartdivVue>
        </el-col>
         <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
            <echartdivVue>
        <lineVue :optiondata="line2" :id="'line1'" :title="'国内疫情治愈率趋势'"></lineVue>
      </echartdivVue>
         </el-col>
      </el-row>
       <el-row :gutter="10">
        <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
           <echartdivVue style="margin-top:1vh">
        <cicle2Vue :optiondata="cicle" :id="'cicle'" :title="'国内疫情现有确诊人数对比'"></cicle2Vue>
      </echartdivVue>
        </el-col>
         <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
            <echartdivVue style="margin-top:1vh">
        <lineVue :optiondata="line3" :id="'line3'" :title="'国内疫情致死率趋势'"></lineVue>
      </echartdivVue>
         </el-col>
      </el-row>
    </el-col>
    <el-col :xs="24" :sm="24" :md="24" :lg="8" :xl="8">
     <topdivVue >
        <barVue :optiondata="bar" :id="'bar1'" :title="'世界各国疫情数据对比'"></barVue>
      </topdivVue>
    </el-col>
    
  </el-row>

</div>
</template>

<script>
import echartdivVue from '@/components/echarts/echart_div.vue'
import lineVue from '@/components/echarts/line.vue'
import topdivVue from './detailed/top_div.vue'
import cicle2Vue from '../../components/echarts/cicle2.vue'
import barVue from '../../components/echarts/bar.vue'

export default {
  components: {
    echartdivVue,
    lineVue,
    topdivVue,
cicle2Vue,
barVue
  },
  data() {
    return {
      height:88,
      line1: {
        color: ["#FF1C77", "#00f2f1", "#ed3f35"],
        tooltip: {
          // 通过坐标轴来触发
          trigger: "axis"
        },
        // legend: {
        //   // 距离容器10%
        //   right: "10%",
        //   // 修饰图例文字的颜色
        //   textStyle: {
        //     color: "#4c9bfd"
        //   }
        //   // 如果series 里面设置了name，此时图例组件的data可以省略
        //   // data: ["邮件营销", "联盟广告"]
        // },
        grid: {
          top: "5%",
          left: "1%",
          right: "2%",
          bottom: "15%",
          show: true,
          borderColor: "#012f4a",
          containLabel: true
        },
        dataZoom: [{
          bottom: "3%",
          textStyle: {
            color: "#fff"
          },
          start:90,
          end:100,
        }],
        xAxis: [
        {
            type: 'category',
            axisTick: {
                show: false,
            },
            // interval: 1,
            axisLabel: {
                color: 'rgba(36, 173, 254, 1)',
                // fontSize:"1rem"
            },
            axisLine: {
                show: false
            },
            data: this.$store.state.noinfect.time,
        }
    ],
    yAxis: [
        {
            type: 'value',
            name: '',
            min: 0,
            // max: 100,
            // interval: 20,
            axisLabel: {
                formatter: '{value} '
            },
            axisLabel: {
                textStyle: {
                    //坐标轴颜色
                    color: 'rgba(36, 173, 254, 1)',
                    // fontSize:"1rem"
                }
            },
            //坐标轴线样式
            splitLine: {
                show: true,
                lineStyle: {
                    type: 'solid', //solid实线;dashed虚线
                    color: 'rgba(36, 173, 254, 0.2)'
                }
            },
        },
        {
            type: 'value',
            name: '',
            // min: 0,
            // max: 100,
            // interval: 20,
            axisLabel: {
                formatter: '{value}'
            },
            axisLabel: {
                textStyle: {
                    //坐标轴颜色
                    color: 'rgba(36, 173, 254, 1)',
                    // fontSize:"1rem"
                }
            },
            //坐标轴线样式
            splitLine: {
                show: true,
                lineStyle: {
                    type: 'solid',
                    color: 'rgba(36, 173, 254, 0.2)'
                }
            },
        }
    ],
    series: [
        {
            name: "现有无症状感染者数量",
            data: this.$store.state.noinfect.noinfectadd,
            type: 'line',
            smooth: true, //true曲线; false折线
            itemStyle: {
                normal: {
                    color: '#ffc600', //改变折线点的颜色
                    lineStyle: {
                        color: '#ffc600', //改变折线颜色
                        // type: 'solid'
                    }
                }
            },
            areaStyle: {
                //折线图颜色半透明
                color: {
                    type: 'linear',
                    x: 0,
                    y: 0,
                    x2: 0,
                    y2: 1,
                    colorStops: [{
                        offset: 0, color: 'rgba(255,198,0, 0.5)' // 0% 处的颜色
                    }, {
                        offset: 1, color: 'rgba(255,198,0, 0.1)' // 100% 处的颜色
                    }],
                    global: false // 缺省为 false
                }
            }
        },
        
    ]
      },
      line2:{
  color: ['#80FFA5', '#00DDFF', '#37A2FF', '#FF0087', '#FFBF00'],
 
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'cross',
      label: {
        backgroundColor: '#6a7985'
      }
    },
 valueFormatter: (value) =>value+"%"
  },
dataZoom: [{
          bottom: "3%",
          textStyle: {
            color: "#fff"
          },
          start:60,
          end:100,
        }],
  // toolbox: {
  //   feature: {
  //     saveAsImage: {},
  //      dataView:{
       
  //      },
  //      magicType: {
  //       type: ['line', 'bar']
  //   }
  //   }
  // },
  grid: {
    left: '3%',
    right: '4%',
    top:"5%",
    bottom: '15%',
    containLabel: true
  },
  xAxis: [
    {
      type: 'category',
      boundaryGap: false,
      data: this.$store.state.chinaday.time,
        axisLabel: {
                textStyle: {
                    //坐标轴颜色
                    color: 'rgba(36, 173, 254, 1)',
                    // fontSize:"1rem"
                }
            },
            //坐标轴线样式
            splitLine: {
                show: true,
                lineStyle: {
                    type: 'solid', //solid实线;dashed虚线
                    color: 'rgba(36, 173, 254, 0.2)'
                }
            },
    }
  ],
  yAxis: [
    {
      type: 'value',
        axisLabel: {
                textStyle: {
                    //坐标轴颜色
                    color: 'rgba(36, 173, 254, 1)',
                    // fontSize:"1rem"
                }
            },
            //坐标轴线样式
            splitLine: {
                show: true,
                lineStyle: {
                    type: 'solid', //solid实线;dashed虚线
                    color: 'rgba(36, 173, 254, 0.2)'
                }
            },
    }
  ],
  series: [
    {
      name: '治愈率',
      type: 'line',
      stack: 'Total',
      smooth: true,
      lineStyle: {
        width: 0
      },
      showSymbol: false,
      areaStyle: {
        opacity: 0.6,
        color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
          {
            offset: 0,
            color: 'rgb(128, 255, 165)'
          },
          {
            offset: 1,
            color: 'rgb(1, 191, 236)'
          }
        ])
      },
      emphasis: {
        focus: 'series'
      },
      data: this.$store.state.chinaday.healrate
    },
    
  ]
},
    line3:{
  color: [ '#FF0087', '#FFBF00'],
 
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'cross',
      label: {
        backgroundColor: '#6a7985'
      }
    },
   valueFormatter: (value) =>value+"%"
  },
dataZoom: [{
          bottom: "3%",
          textStyle: {
            color: "#fff"
          },
          start:60,
          end:100,
        }],
  // toolbox: {
  //   feature: {
  //     saveAsImage: {}
  //   }
  // },
  grid: {
    left: '3%',
    right: '4%',
    top:"5%",
    bottom: '15%',
    containLabel: true
  },
  xAxis: [
    {
      type: 'category',
      boundaryGap: false,
      data: this.$store.state.chinaday.time,
        axisLabel: {
                textStyle: {
                    //坐标轴颜色
                    color: 'rgba(36, 173, 254, 1)',
                    // fontSize:"1rem"
                }
            },
            //坐标轴线样式
            splitLine: {
                show: true,
                lineStyle: {
                    type: 'solid', //solid实线;dashed虚线
                    color: 'rgba(36, 173, 254, 0.2)'
                }
            },
    }
  ],
  yAxis: [
    {
      type: 'value',
        axisLabel: {
                textStyle: {
                    //坐标轴颜色
                    color: 'rgba(36, 173, 254, 1)',
                    // fontSize:"1rem"
                }
            },
            //坐标轴线样式
            splitLine: {
                show: true,
                lineStyle: {
                    type: 'solid', //solid实线;dashed虚线
                    color: 'rgba(36, 173, 254, 0.2)'
                }
            },
    }
  ],
  series: [
    {
      name: '致死率',
      type: 'line',
      stack: 'Total',
      smooth: true,
      lineStyle: {
        width: 0
      },
      showSymbol: false,
      areaStyle: {
        opacity: 0.6,
            color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
          {
            offset: 0,
            color: 'rgb(255, 0, 135)'
          },
          {
            offset: 1,
            color: 'rgb(135, 0, 157)'
          }
        ])
     
      },
      emphasis: {
        focus: 'series'
      },
      data: this.$store.state.chinaday.deadrate
    },
    
  ]
},
cicle: {

     color: ['#A0CE3A', '#31C5C0', '#1E9BD1', '#0F347B', '#585247', '#7F6AAD', '#009D85', "rgba(250,250,250,0.3)"],
     tooltip:{
       show:true
     },
     grid: {
         bottom: 150,
         left: 100,
         right: '10%'
     },
     legend: {
         bottom: '0%',
         textStyle: {
            color: '#fff',
        },
        itemGap: 12,
        data:[{"name":"无症状感染者",'value':this.$store.state.nownoInfect},
             {"name":"境外输入感染者",'value':this.$store.state.outinputsum},
             {"name":"普通案例",'value':this.$store.state.nowconfirm-this.$store.state.nownoInfect-this.$store.state.outinputsum},
            ]
     },
     series: [
         // 主要展示层的
         {
             radius: ['30%', '61%'],
             center: ['50%', '50%'],
             type: 'pie',
             label: {
                 normal: {
                     show: true,
                     formatter:  function(parms){
                       console.log(parms)
                       return parms.seriesName+":"+parms.value+"人\n"+parms.percent+"%"
                     },
                     textStyle: {
                         fontSize: 14,

                     },
                    //  position: 'outside'
                 },
                 emphasis: {
                     show: true
                 }
             },
             labelLine: {
                 normal: {
                     show: true,
                     length: 30,
                     length2: 55
                 },
                 emphasis: {
                     show: true
                 }
             },
             name: "确诊人数",
             data: [{"name":"无症状感染者",'value':this.$store.state.nownoInfect},
             {"name":"境外输入感染者",'value':this.$store.state.outinputsum},
             {"name":"普通案例",'value':this.$store.state.nowconfirm-this.$store.state.nownoInfect-this.$store.state.outinputsum},
            ],

         },
         // 边框的设置
         {
             radius: ['25%', '24%'],
             center: ['50%', '50%'],
             type: 'pie',
             label: {
                 normal: {
                     show: false
                 },
                 emphasis: {
                     show: false
                 }
             },
             labelLine: {
                 normal: {
                     show: false
                 },
                 emphasis: {
                     show: false
                 }
             },
             animation: false,
             tooltip: {
                 show: false
             },
             data: [{
                 value: 1,
                 itemStyle: {
                     color: "rgba(250,250,250,0.3)",
                 },
             }],
         }, {
             name: '外边框',
             type: 'pie',
             clockWise: false, //顺时加载
             hoverAnimation: false, //鼠标移入变大
             center: ['50%', '50%'],
             radius: ['65%', '65%'],
             label: {
                 normal: {
                     show: false
                 }
             },
             data: [{
                 value: 9,
                 name: '',
                 itemStyle: {
                     normal: {
                         borderWidth: 2,
                         borderColor: '#0b5263'
                     }
                 }
             }]
         },
     ]
 },
      bar: {
    tooltip: {
        show: true,
    },
    grid: [
        {
            show: false,
            left: '1%',
            top: 0,
            bottom: 22,
            width: '15%',
        },
        {
            show: false,
            left: '20%',
            top: 0,
            bottom: 0,
            containLabel: true,
            width: '39%',
        },
        {
            show: false,
            right: '2%',
            top: 0,
            bottom: 0,
            containLabel: true,
            width: '39%',
        },
    ],
    xAxis: [
        {
            gridIndex: 0,
            show: false,
               max:5000000,
             textStyle: {
                    color: '#fff',
                    fontSize: 12,
                },
        },
        {
            gridIndex: 1,
            type: 'value',
               max:3000000,
               splitNumber:3,
            inverse: true,
            axisLine: {
                show: false,
            },
            axisTick: {
                show: false,
            },
            axisLabel: {
                show: true,
                verticalAlign: 'middle',
                textStyle: {
                    color: '#fff',
                    fontSize: 12,
                },
            },
            splitLine: {
                show: false,
            },
        },
        {
            gridIndex: 2,
            type: 'value',
             splitNumber:2,
            axisLine: {
                show: false,
            },
            axisTick: {
                show: false,
            },
            axisLabel: {
                show: true,
                verticalAlign: 'middle',
                textStyle: {
                    color: '#fff',
                    fontSize: 12,
                },
            },
            splitLine: {
                show: false,
            },
        },
    ],
    yAxis: [
        {
            gridIndex: 0,
            type: 'category',
            inverse: true,
            
            position: 'right',
            axisLine: {
                show: false,
            },
            axisTick: {
                show: false,
            },
             axisLabel: {
                show: true,
                textStyle: {
                    color: '#fff',
                    fontSize: 12,
                },
            },
            data: this.$store.state.worldtop.name.map(function (value) {
                return {
                    value: value,
                    textStyle: {
                        align: 'right',
                    },
                };
            }),
            
        },
        {
            gridIndex: 1,
            type: 'category',
            inverse: true,
            position: 'right',
            axisLine: {
                show: false,
            },
            axisTick: {
                show: false,
            },
            axisLabel: {
                show: false,
                margin: 8,
                textStyle: {
                    color: '#fff',
                    fontSize: 12,
                },
            },
            data: this.$store.state.worldtop.name,
        },
        {
            gridIndex: 2,
            type: 'category',
            inverse: true,
            position: 'left',
            axisLine: {
                show: false,
            },
            axisTick: {
                show: false,
            },
            axisLabel: {
                show: false,
                textStyle: {
                    color: '#fff',
                    fontSize: 12,
                },
            },
            data: this.$store.state.worldtop.name,
        },
    ],
    series: [
        {
            name: '现有确诊人数',
            type: 'bar',
            barGap: 20,
            barWidth: 20,
            xAxisIndex: 1,
            yAxisIndex: 1,
            showBackground: true,
            backgroundStyle: {
                color: 'rgba(180, 180, 180, 0.2)',
            },
            label: {
                normal: {
                    show: false,
                },
                emphasis: {
                    show: true,
                    position: 'left',
                    offset: [0, 0],
                    textStyle: {
                        color: '#fff',
                        fontSize: 14,
                    },
                },
            },
            itemStyle: {
                normal: {
                    barBorderRadius: [10, 0, 0, 10],
                    color: new this.$echarts.graphic.LinearGradient(0, 0, 1, 0, [
                        {
                            offset: 0,
                            color: '#e0c3fc',
                        },
                        {
                            offset: 1,
                            color: '#8ec5fc',
                        },
                    ]),
                },
            },
            data: this.$store.state.worldtop.comfirm,
        },

        {
            name: "死亡人数",
            type: 'bar',
            barGap: 20,
            barWidth: 20,
            xAxisIndex: 2,
            yAxisIndex: 2,
            showBackground: true,
            backgroundStyle: {
                color: 'rgba(180, 180, 180, 0.2)',
            },
            label: {
                normal: {
                    show: false,
                },
                emphasis: {
                    show: true,
                    position: 'right',
                    offset: [0, 0],
                    textStyle: {
                        color: '#fff',
                        fontSize: 14,
                    },
                },
            },
            itemStyle: {
                normal: {
                    barBorderRadius: [0, 10, 10, 0],
                    color: new this.$echarts.graphic.LinearGradient(0, 0, 1, 0, [
                        {
                            offset: 0,
                            color: '#66a6ff',
                        },
                        {
                            offset: 1,
                            color: '#89f7fe',
                        },
                    ]),
                },
            },
            data: this.$store.state.worldtop.dead,
        },
    ],
},


//数据视图数据
view:{
  name:"",
  data:[]
}

    
    }
  },
  mounted() {
  },
}
</script>

<style lang="scss" scoped>
.detailed {
  width: 100%;
  // height: 100%;

  .top {
    width: 100%;
  }

  .bottom {
    margin-top: 2vh;
    width: 100%;
  }
}
</style>
