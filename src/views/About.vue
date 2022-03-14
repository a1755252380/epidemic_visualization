<template>
  <div class="about">
    <div id="main " class="main" ref="myEchart"></div>
  </div>
</template>

<script>
import "echarts-gl"
require("../../node_modules/echarts/map/js/china");
import '../../node_modules/echarts-gl/src/component/geo3D'
let areaData = [
    { name: "黑龙江", value: [127.9688, 45.368] },
    { name: "内蒙古", value: [110.3467, 41.4899] },
    { name: "吉林", value: [125.8154, 44.2584] },
    { name: "北京", value: [116.4551, 40.2539] },
    { name: "辽宁", value: [123.1238, 42.1216] },
    { name: "河北", value: [114.4995, 38.1006] },
    { name: "天津", value: [117.4219, 39.4189] },
    { name: "山西", value: [112.3352, 37.9413] },
    { name: "陕西", value: [109.1162, 34.2004] },
    { name: "甘肃", value: [103.5901, 36.3043] },
    { name: "宁夏", value: [106.3586, 38.1775] },
    { name: "青海", value: [101.4038, 36.8207] },
    { name: "新疆", value: [87.9236, 43.5883] },
    { name: "西藏", value: [91.11, 29.97] },
    { name: "四川", value: [103.9526, 30.7617] },
    { name: "重庆", value: [108.384366, 30.439702] },
    { name: "山东", value: [117.1582, 36.8701] },
    { name: "河南", value: [113.4668, 34.6234] },
    { name: "江苏", value: [118.8062, 31.9208] },
    { name: "安徽", value: [117.29, 32.0581] },
    { name: "湖北", value: [114.3896, 30.6628] },
    { name: "浙江", value: [119.5313, 29.8773] },
    { name: "福建", value: [119.4543, 25.9222] },
    { name: "江西", value: [116.0046, 28.6633] },
    { name: "湖南", value: [113.0823, 28.2568] },
    { name: "贵州", value: [106.6992, 26.7682] },
    { name: "云南", value: [102.9199, 25.4663] },
    { name: "广东", value: [113.12244, 23.009505] },
    { name: "广西", value: [108.479, 23.1152] },
    { name: "海南", value: [110.3893, 19.8516] },
    { name: "上海", value: [121.4648, 31.2891] },
    { name: "台湾", value: [121.520076, 25.030724] },
];
export default {
    data() {
        return {
            count: 0,
            myChart: null,
            name: "",
            
        };
    },
    methods: {
        /**
         * 加载3D地图
         */
        getMap3d() {
             let myChart = this.$echarts.init(this.$refs.myEchart);

                        var option = {

                            tooltip: {
                                show: true,
                                formatter: (params) => {
                                    var q = creatediv(params.name);


                                    var value = params.value;
                                    if (isNaN(value)) {
                                        value = 0
                                    }
                                    return params.name + "<br /><span>总确诊人数：<span />" + "：" + value + "<br /><apan>其中境外输入感染者：<span />" + q;

                                },
                            },
                            visualMap: {
                                textStyle: {
                                    color: "#A9B9CB"
                                },
                                inactiveColor: '#d5d4d4',
                                left: '20%',
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
                                color: ['#95002F', '#ED003B',
                                    '#E03355', '#FF6F6F', '#FFBABA', '#ACADAC'
                                ],
                                show: true
                            },
                            geo3D: {

                            },
                            series: [

                                //画线

                                {
                                     type: 'map3D',
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
                                    light: { //光照阴影
                                        main: {
                                            color: '#fff', //光照颜色
                                            intensity: 1.2, //光照强度
                                            //shadowQuality: 'high', //阴影亮度
                                            shadow: false, //是否显示阴影
                                            alpha: 55,
                                            beta: 10

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
                                    data: this.areaData
                                }
                            ]
                        };
                        myChart.setOption(option);

                       
                        window.addEventListener("resize", function () {
                            myChart.resize();
                        });
        },
    },
    mounted() {
        this.$nextTick(() => {
            this.getMap3d();
        });
    },
}
</script>

<style lang="scss" scoped>
.about{
  width: 100%;
  height: 100%;
  .main {
  width: 1000px;
  height: 1000px;
}
}

</style>
