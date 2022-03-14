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
