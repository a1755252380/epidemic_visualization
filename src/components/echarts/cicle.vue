<template>
<div class="echart_div" ref="echartdiv">
    <div class="echarts_title">{{title}}</div>
  <div :id="divid"  :style="{width:width+'px',height:height+'px'}"></div>
</div>
</template>

<script>
export default {
    props: ['optiondata',"id","title"],
      data() {
        return {
          width:0,
          height:0,
          echart: null,
          timeoutloop:null
        }
      },
      destroyed() {
        clearInterval(this.timeoutloop)
      },
      mounted() {
     
          this.width=this.$refs.echartdiv.offsetWidth+20
            this.height=this.$refs.echartdiv.offsetHeight-20
            let that=this
            
        this.$nextTick(function () {
            that.createechart(that.divid)
            document.getElementById(that.divid).setAttribute('_echarts_instance_', '');

            that.activeLoop()
        });
        
      },
      methods: {
        activeLoop() {
    // 循环高亮显示   seriesIndex：1   外圈高亮
    let index = -1; // 高亮下标
    const dataLength = this.optiondata.series[1].data.length;
    this.timeoutloop = setInterval(() => {
        // 清除之前的高亮
        this.echart.dispatchAction({
            type: 'downplay',
            seriesIndex: 1,
            dataIndex: index,
        });
        this.echart.dispatchAction({
            type: 'hideTip',
            seriesIndex: 1,
            dataIndex: index,
        });
        index = (index + 1) % dataLength;
        // 当前下标高亮
        this.echart.dispatchAction({
            type: 'highlight',
            seriesIndex: 1,
            dataIndex: index,
        });
        this.echart.dispatchAction({
            type: 'showTip',
            seriesIndex: 1,
            dataIndex: index,
        });
    }, 2000);
    // 鼠标划入
    this.echart.on('mouseover', (e) => {
        // 停止定时器，清除之前的高亮
        clearInterval(this.timeoutloop);
        this.echart.dispatchAction({
            type: 'downplay',
            seriesIndex: 1,
            dataIndex: index,
        });
        this.echart.dispatchAction({
            type: 'hideTip',
            seriesIndex: 1,
            dataIndex: index,
        });
    });
    // 鼠标离开
    this.echart.on('mouseout', (e) => {
       this. activeLoop();
    });
}
,
        createechart(id) {
          // 基于准备好的dom，初始化echarts实例
          this.echart = this.$echarts.init(document.getElementById(id));

          // 指定图表的配置项和数据
          var option = this.option;

          // 使用刚指定的配置项和数据显示图表。
          this.echart.setOption(option);
                  window.onresize = function () {
          this.echart.resize();
        };
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
  height: 100%;
  
}
</style>
