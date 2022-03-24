<template>
<div class="about" ref="mapdiv">
  <div @click="comechina" v-show="btnshow">
    <btnvue :name="'←'" :url="''" class="come_btn"></btnvue>
  </div>

  <div id="map" class="main" :style="{width:width+'px',height:height+'px'}"></div>
</div>
</template>

<script>
// import '../../../node_modules/echarts-gl/src/component/geo3D'
require("@/assets/js/china.js")
import btnvue from "@/components/btn/btn.vue"
import axios from "axios"

export default {
  props:['tablechoose'],
  watch:{
    tablechoose(newvalue,oldvalue){
      this.pro=this.pyChinese(newvalue)
      this.createprovins()
    }
  },
  data() {
    return {
      count: 0,
      myChart: null,
      name: "",
      width: 0,
      height: 0,
      btnshow: false,
      provienchart: null,
      //地图数据
      mapdata: this.$store.state.chinamap.china, //地区数据
      proviendata: this.$store.state.chinamap.city,
      //点击的省份
      pro: ""

    };
  },
  components: {
    btnvue
  },
  methods: {
    //返回中国地图
    comechina() {
      this.btnshow = false;
      this.provienchart.clear()
      this.getMap3d()
    },

    /**省份地图 */
    createprovins() {
      let that = this
        that.btnshow = true
      var option = {
        tooltip: {
          show: true,
          formatter: (params) => {
            var value = params.value;
            if (isNaN(value)) {
              value = 0
            }
            return params.name + "<br /><span>本土确诊人数：<span />" + "：" + value
          },
        },
        visualMap: {
          textStyle: {
            color: "#A9B9CB"
          },
          inactiveColor: '#d5d4d4',
          left: '5%',
          bottom: 'bottom',
          splitList: [{
              start: 100,
              label: '>100'
            }, {
              start: 80,
              end: 100
            }, {
              start: 60,
              end: 80
            }, {
              start: 40,
              end: 60
            }, {
              start: 20,
              end: 40
            }, {
              start: 1,
              end: 20,
            }, {
              start: 0,
              end: 0,
            },

          ],
          color: ['#370504', '#910607',
            '#F01F1B', '#E03355', '#FF6F6F', '#0D523B'
          ],
          show: true
        },

        series: [

          //画线

          {
            type: 'map',
            map: this.pro,
            roam: true,
            itemStyle: {
              areaColor: '#fff',
              borderWidth: 0.6,
              borderColor: '#A9B9CB'
            },
            label: {
              show: true,
              textStyle: {
                color: '#000', //地图初始化区域字体颜色
                fontSize: 12,
                opacity: 1,
                backgroundColor: 'rgba(0,0,0,0)'
                //backgroundColor: 'rgba(53,171,199,0)'
              },
            },
            emphasis: { //当鼠标放上去  地区区域是否显示名称
              label: {
                show: true,
                textStyle: {
                  color: '#000',
                  fontSize: 12,
                  backgroundColor: 'rgba(0,23,11,0)'
                }
              }
            },
            //shading: 'lambert',

            data: that.proviendata
          }
        ]
      };


      //获取中国地图的echarts实例
      this.provienchart = this.$echarts.init(document.getElementById("map"));
      //读取echarts地图记录地理数据的json文件
      let gdMap = require('/public/json/' + this.pro + '.json')
      //将位置信息echarts实例化
      this.$echarts.registerMap(this.pro, gdMap);
      // console.log(gdMap)
      //渲染echarts图像
      document.getElementById("map").setAttribute('_echarts_instance_', '');
      this.provienchart.setOption(option);

      // window.addEventListener("resize", function () {
      //   that.provienchart.resize();
      // });
    },

    /**
     * 中国地图
     */

    getMap3d() {
      this.myChart = this.$echarts.init(document.getElementById("map"));
      document.getElementById("map").setAttribute('_echarts_instance_', '');
      let that = this
      // this.$echarts.registerMap('china', china)
      var option = {

        tooltip: {
          show: true,
          formatter: (params) => {
            // var q = creatediv(params.name);

            // console.log(params)
            var value = params.value;
            if (isNaN(value)) {
              value = 0
            }
            return params.name + "<br /><span>现有确诊人数：<span />" + "：" + value;

          },
        },
        visualMap: {
          textStyle: {
            color: "#A9B9CB"
          },
          inactiveColor: '#d5d4d4',
          left: '1%',
          bottom: 'bottom',
          splitList: [{
              start: 100,
              label: '>100'
            }, {
              start: 80,
              end: 100,
            },
            {
              start: 60,
              end: 80
            },
            {
              start: 40,
              end: 60
            },
            {
              start: 20,
              end: 40
            },
            {
              start: 1,
              end: 20,
            },
            {
              start: 0,
              end: 0,
            },

          ],
          color: ['#370504', '#910607',
            '#F01F1B', '#E03355', '#FF6F6F', '#0D523B'
          ],
          show: true
        },
        geo3D: {

        },
        series: [

          //画线

          {
            type: 'map3D',
            name: 'map',
            coordinateSystem: 'geo3D',
            map: 'china',
            roam: true,
            itemStyle: {
              areaColor: 'rgb(5,101,123)',
              opacity: 1,
              borderWidth: 0.8,
              borderColor: 'rgb(62,215,213)'
            },
            label: {
              show: true,
              textStyle: {
                color: '#000', //地图初始化区域字体颜色
                fontSize: 12,
                opacity: 0.5,
                backgroundColor: 'rgba(0,0,0,0)'
                //backgroundColor: 'rgba(53,171,199,0)'
              },
            },
            emphasis: { //当鼠标放上去  地区区域是否显示名称
              label: {
                show: true,
                textStyle: {
                  color: '#000',
                  fontSize: 12,
                  backgroundColor: 'rgba(0,23,11,0)'
                }
              }
            },
            //shading: 'lambert',
            light: { //光照阴影
              main: {
                color: '#fff', //光照颜色
                intensity: 1.2, //光照强度
                //shadowQuality: 'high', //阴影亮度
                shadow: false, //是否显示阴影
                alpha: 55,
                beta: 20

              },
              ambient: {
                intensity: 0.8
              }
            },

            effect: {
              show: true,
              trailWidth: 4,
              trailOpacity: 0.5,
              trailLength: 0.3,
              constantSpeed: 5
            },

            lineStyle: {
              width: 0.2,
              opacity: 0.05
            },
            data: that.mapdata
          }
        ]
      };
      this.myChart.setOption(option);
      this.myChart.on('click', function (parm) {

        that.pro = that.pyChinese(parm.name)
        console.log(that.pro)
        that.myChart.clear()
      
        that.createprovins();

      });
      // window.addEventListener("resize", function () {
      //   that.myChart.resize();
      // });
    },
    pyChinese(pro) {
      var str = '';
      switch (pro) {
        case '黑龙江':
          str = 'heilongjiang';
          break;
        case '河北':
          str = 'hebei';
          break;
        case '甘肃':
          str = 'gansu';
          break;
        case '云南':
          str = 'yunnan';
          break;
        case '四川':
          str = 'sichuan';
          break;
        case '吉林':
          str = 'jilin';
          break;
        case '辽宁':
          str = 'liaoning';
          break;
        case '青海':
          str = 'qinghai';
          break;
        case '陕西':
          str = 'shanxi';
          break;
        case '河南':
          str = 'henan';
          break;
        case '山东':
          str = 'shandong';
          break;
        case '山西':
          str = 'shanxi';
          break;
        case '安徽':
          str = 'anhui';
          break;
        case '湖北':
          str = 'hubei';
          break;
        case '湖南':
          str = 'hunan';
          break;
        case '江苏':
          str = 'jiangsu';
          break;
        case '贵州':
          str = 'guizhou';
          break;
        case '浙江':
          str = 'zhejiang';
          break;
        case '江西':
          str = 'jiangxi';
          break;
        case '广东':
          str = 'guangdong';
          break;
        case '福建':
          str = 'fujian';
          break;
        case '台湾':
          str = 'taiwan';
          break;
        case '海南':
          str = 'hainan';
          break;
        case '广西':
          str = 'guangxi';
          break;
        case '内蒙古':
          str = 'neimenggu';
          break;
        case '宁夏':
          str = 'ningxia';
          break;
        case '新疆':
          str = 'xinjiang';
          break;
        case '西藏':
          str = 'xizang';
          break;
        case '澳门':
          str = 'aomen';
          break;
        case '北京':
          str = 'beijing';
          break;
        case '上海':
          str = 'shanghai';
          break;
        case '香港':
          str = 'xianggang';
          break;
        case '天津':
          str = 'tianjin';
          break;
        case '重庆':
          str = 'chongqing';
          break;
        default:
          str = '';
          break;
      }
      return str;
    }
  },
  mounted() {
    this.width = this.$refs.mapdiv.offsetWidth
    this.height = this.$refs.mapdiv.offsetHeight
    let that = this
    this.$nextTick(() => {
      // console.log(this.$echarts.init(document.getElementById("map")))

      that.getMap3d();
    });
  },

}
</script>

<style lang="scss" scoped>
.about {
  width: 100%;
  height: 100%;
  position: relative;
}

.come_btn {
  position: absolute;
  left: 0;
  top: 0;
}
</style>
