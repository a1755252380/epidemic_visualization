<template>
<div class="echart_div" ref="echartdiv">
  <div class="echarts_title">{{title}}</div>
  <div :id="divid"  :style="{width:width+'px',height:height+'px'}"></div>
</div>
</template>

<script>
export default {
    props: ['x',"id","title",'y','end','begin'],
      data() {
        return {
          width:0,
          height:0,
          echart: null
        }
      },
      mounted() {
     
          this.width=this.$refs.echartdiv.offsetWidth
            this.height=this.$refs.echartdiv.offsetHeight-20
            let that=this
            
        this.$nextTick(function () {
            that.createechart(that.divid)
           
        });
        
      },
      methods: {
        createechart(id) {
         
          // 基于准备好的dom，初始化echarts实例
          this.echart = this.$echarts.init(document.getElementById(id));
         document.getElementById(id).setAttribute('_echarts_instance_', '');

          // 指定图表的配置项和数据
          var option = {
  
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'cross'
    }
  },
  toolbox: {
    show: true,
    feature: {
      saveAsImage: {}
    }
  },
  xAxis: {
    type: 'category',
    boundaryGap: false,
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
    // prettier-ignore
    data: this.x },
  yAxis: {
    type: 'value',
    axisLabel: {
      formatter: '{value} '
    },
    axisPointer: {
      snap: true
    },
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
       splitLine :{show:false}
  },
  visualMap: {
    show: false,
    dimension: 0,
    
    pieces: [
     
      {  gt: 100,
       
        color: 'red',
        
      },
      {
       gt: 0,
        lte: 100,
       color: '#5478C6'
      }
    ]
  },
  series: [
    {
      name: '新增人数',
      type: 'line',
        smooth: 0.6,
      lineStyle: {
        width: 3
      },
      smooth: true,
      // prettier-ignore
      data: this.y,
           markArea: {
        itemStyle: {
          color: 'rgba(255, 173, 177, 0.4)',
           width: 5
        },
        data: [
         
          [
            {
              name: '预测',
              xAxis: this.begin
            },
            {
              xAxis:this.end
            }
          ]
        ]
      }
    }
  ]
};

          // 使用刚指定的配置项和数据显示图表。
          this.echart.setOption(option);
            
        }
      },
      computed: {
        option: {
          get() {
            return this.optiondata
          }
        },
         divid: {
          get() {
            return this.id
          }
        }
      }
}
</script>

<style lang="scss" scoped>
.echart_div {
  width: 100%;
  height:100%;
}
</style>
