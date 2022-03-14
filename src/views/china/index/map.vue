<template>
<div class="about" ref="mapdiv">
  <div @click="comechina" v-show="btnshow">
      <btnvue :name="'←'" :url="'#'" class="come_btn"></btnvue>
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
  data() {
    return {
      count: 0,
      myChart: null,
      name: "",
      width: 0,
      height: 0,
      btnshow:false,
      provienchart:null,
      //地图数据
      mapdata:[{name:'上海',value:289},{name:'云南',value:52},{name:'内蒙古',value:305},{name:'北京',value:66},{name:'台湾',value:5642},{name:'吉林',value:10},{name:'四川',value:58},{name:'天津',value:10},{name:'宁夏',value:0},{name:'安徽',value:2},{name:'山东',value:38},{name:'山西',value:8},{name:'广东',value:454},{name:'广西',value:305},{name:'新疆',value:0},{name:'江苏',value:124},{name:'江西',value:0},{name:'河北',value:4},{name:'河南',value:28},{name:'浙江',value:386},{name:'海南',value:0},{name:'湖北',value:27},{name:'湖南',value:6},{name:'澳门',value:1},{name:'甘肃',value:11},{name:'福建',value:78},{name:'西藏',value:0},{name:'贵州',value:0},{name:'辽宁',value:177},{name:'重庆',value:1},{name:'陕西',value:0},{name:'青海',value:0},{name:'香港',value:15138},{name:'黑龙江',value:11},],
      //地区数据
      proviendata:[{name:'境外输入',value:289},{name:'境外来沪',value:0},{name:'静安',value:0},{name:'地区待确认',value:0},{name:'浦东',value:0},{name:'青浦',value:0},{name:'松江',value:0},{name:'宝山',value:0},{name:'黄浦',value:0},{name:'长宁',value:0},{name:'奉贤',value:0},{name:'外地来沪',value:0},{name:'嘉定',value:0},{name:'徐汇',value:0},{name:'崇明',value:0},{name:'金山',value:0},{name:'虹口',value:0},{name:'杨浦',value:0},{name:'普陀',value:0},{name:'闵行',value:0},{name:'境外输入',value:24},{name:'红河',value:10},{name:'德宏州',value:10},{name:'昆明',value:5},{name:'西双版纳州',value:5},{name:'文山州',value:3},{name:'临沧',value:2},{name:'曲靖',value:0},{name:'楚雄州',value:0},{name:'保山市',value:0},{name:'玉溪',value:0},{name:'昭通市',value:0},{name:'大理',value:0},{name:'普洱',value:0},{name:'丽江市',value:0},{name:'地区待确认',value:-7},{name:'呼和浩特',value:277},{name:'包头',value:20},{name:'呼伦贝尔',value:5},{name:'巴彦淖尔',value:3},{name:'阿拉善盟',value:0},{name:'通辽',value:0},{name:'境外输入',value:0},{name:'锡林郭勒',value:0},{name:'鄂尔多斯',value:0},{name:'乌兰察布',value:0},{name:'赤峰',value:0},{name:'兴安盟',value:0},{name:'乌海',value:0},{name:'丰台',value:112},{name:'朝阳',value:88},{name:'海淀',value:71},{name:'西城',value:60},{name:'境外输入',value:59},{name:'大兴',value:35},{name:'外地来京',value:23},{name:'房山',value:19},{name:'昌平',value:19},{name:'东城',value:13},{name:'通州',value:12},{name:'密云',value:7},{name:'涉奥闭环人员',value:4},{name:'怀柔',value:4},{name:'石景山',value:3},{name:'延庆',value:1},{name:'顺义',value:1},{name:'门头沟',value:1},{name:'地区待确认',value:-466},{name:'地区待确认',value:5642},{name:'境外输入',value:10},{name:'吉林',value:0},{name:'通化',value:0},{name:'长春',value:0},{name:'松原',value:0},{name:'四平',value:0},{name:'白城',value:0},{name:'公主岭',value:0},{name:'辽源',value:0},{name:'延边',value:0},{name:'梅河口市',value:0},{name:'境外输入',value:37},{name:'成都',value:21},{name:'德阳',value:0},{name:'自贡',value:0},{name:'宜宾',value:0},{name:'泸州',value:0},{name:'绵阳',value:0},{name:'雅安',value:0},{name:'内江',value:0},{name:'攀枝花',value:0},{name:'乐山',value:0},{name:'地区待确认',value:0},{name:'广元',value:0},{name:'遂宁',value:0},{name:'凉山',value:0},{name:'甘孜',value:0},{name:'阿坝',value:0},{name:'资阳',value:0},{name:'眉山',value:0},{name:'巴中',value:0},{name:'达州',value:0},{name:'广安',value:0},{name:'南充',value:0},{name:'境外输入',value:10},{name:'东丽区',value:0},{name:'河东区',value:0},{name:'河西区',value:0},{name:'西青区',value:0},{name:'河北区',value:0},{name:'滨海新区',value:0},{name:'津南区',value:0},{name:'待确认',value:0},{name:'红桥区',value:0},{name:'南开区',value:0},{name:'北辰区',value:0},{name:'宝坻区',value:0},{name:'和平区',value:0},{name:'宁河区',value:0},{name:'外地来津',value:0},{name:'武清区',value:0},{name:'地区待确认',value:0},{name:'中卫',value:0},{name:'银川',value:0},{name:'吴忠',value:0},{name:'境外输入',value:0},{name:'固原',value:0},{name:'石嘴山',value:0},{name:'宁东管委会',value:0},{name:'境外输入',value:2},{name:'滁州',value:0},{name:'六安',value:0},{name:'合肥',value:0},{name:'阜阳',value:0},{name:'宣城',value:0},{name:'池州',value:0},{name:'亳州',value:0},{name:'宿州',value:0},{name:'黄山',value:0},{name:'安庆',value:0},{name:'铜陵',value:0},{name:'淮北',value:0},{name:'马鞍山',value:0},{name:'淮南',value:0},{name:'蚌埠',value:0},{name:'芜湖',value:0},{name:'境外输入',value:36},{name:'青岛',value:1},{name:'济南',value:1},{name:'潍坊',value:0},{name:'烟台',value:0},{name:'济宁',value:0},{name:'枣庄',value:0},{name:'淄博',value:0},{name:'日照',value:0},{name:'泰安',value:0},{name:'威海',value:0},{name:'临沂',value:0},{name:'德州',value:0},{name:'聊城',value:0},{name:'滨州',value:0},{name:'菏泽',value:0},{name:'晋中',value:6},{name:'太原',value:1},{name:'忻州',value:1},{name:'大同',value:0},{name:'运城',value:0},{name:'境外输入',value:0},{name:'晋城',value:0},{name:'长治',value:0},{name:'朔州',value:0},{name:'临汾',value:0},{name:'阳泉',value:0},{name:'吕梁',value:0},{name:'境外输入',value:369},{name:'深圳',value:84},{name:'珠海',value:35},{name:'东莞',value:27},{name:'云浮',value:7},{name:'惠州',value:6},{name:'广州',value:5},{name:'中山',value:3},{name:'梅州',value:2},{name:'河源',value:1},{name:'佛山',value:0},{name:'清远',value:0},{name:'湛江',value:0},{name:'汕尾',value:0},{name:'汕头',value:0},{name:'揭阳',value:0},{name:'江门',value:0},{name:'肇庆',value:0},{name:'阳江',value:0},{name:'茂名',value:0},{name:'韶关',value:0},{name:'潮州',value:0},{name:'地区待确认',value:-85},{name:'百色',value:210},{name:'境外输入',value:91},{name:'防城港',value:3},{name:'南宁',value:1},{name:'柳州',value:0},{name:'地区待确认',value:0},{name:'北海',value:0},{name:'来宾',value:0},{name:'崇左',value:0},{name:'河池',value:0},{name:'桂林',value:0},{name:'钦州',value:0},{name:'玉林',value:0},{name:'贵港',value:0},{name:'贺州',value:0},{name:'梧州',value:0},{name:'伊犁州',value:0},{name:'兵团第四师',value:0},{name:'喀什',value:0},{name:'乌鲁木齐',value:0},{name:'地区待确认',value:0},{name:'昌吉州',value:0},{name:'兵团第九师',value:0},{name:'吐鲁番',value:0},{name:'第八师石河子',value:0},{name:'六师五家渠',value:0},{name:'兵团第十二师',value:0},{name:'巴州',value:0},{name:'第七师',value:0},{name:'阿克苏',value:0},{name:'苏州',value:103},{name:'境外输入',value:17},{name:'无锡',value:3},{name:'南通',value:1},{name:'扬州',value:0},{name:'常州',value:0},{name:'地区待确认',value:0},{name:'南京',value:0},{name:'宿迁',value:0},{name:'淮安',value:0},{name:'盐城',value:0},{name:'徐州',value:0},{name:'连云港',value:0},{name:'镇江',value:0},{name:'泰州',value:0},{name:'上饶',value:0},{name:'九江',value:0},{name:'境外输入',value:0},{name:'南昌',value:0},{name:'赣州',value:0},{name:'新余',value:0},{name:'抚州',value:0},{name:'吉安',value:0},{name:'萍乡',value:0},{name:'宜春',value:0},{name:'鹰潭',value:0},{name:'景德镇',value:0},{name:'赣江新区',value:0},{name:'廊坊',value:6},{name:'雄安新区',value:5},{name:'衡水',value:5},{name:'保定',value:2},{name:'秦皇岛',value:0},{name:'定州',value:0},{name:'石家庄',value:0},{name:'辛集市',value:0},{name:'邢台',value:0},{name:'境外输入',value:0},{name:'沧州',value:0},{name:'张家口',value:0},{name:'唐山',value:0},{name:'邯郸',value:0},{name:'承德',value:0},{name:'地区待确认',value:-14},{name:'周口',value:15},{name:'许昌',value:15},{name:'郑州',value:15},{name:'境外输入',value:11},{name:'安阳',value:4},{name:'信阳',value:3},{name:'商丘',value:2},{name:'平顶山',value:1},{name:'三门峡',value:1},{name:'漯河',value:0},{name:'驻马店',value:0},{name:'洛阳',value:0},{name:'濮阳',value:0},{name:'开封',value:0},{name:'南阳',value:0},{name:'济源示范区',value:0},{name:'新乡',value:0},{name:'焦作',value:0},{name:'鹤壁',value:0},{name:'地区待确认',value:-39},{name:'杭州',value:141},{name:'境外输入',value:122},{name:'宁波',value:110},{name:'绍兴',value:11},{name:'金华',value:2},{name:'省十里丰监狱',value:0},{name:'台州',value:0},{name:'地区待确认',value:0},{name:'丽水',value:0},{name:'舟山',value:0},{name:'嘉兴',value:0},{name:'湖州',value:0},{name:'温州',value:0},{name:'衢州',value:0},{name:'海口',value:0},{name:'境外输入',value:0},{name:'三亚',value:0},{name:'儋州',value:0},{name:'万宁',value:0},{name:'东方',value:0},{name:'澄迈县',value:0},{name:'昌江县',value:0},{name:'保亭',value:0},{name:'琼海',value:0},{name:'临高县',value:0},{name:'陵水县',value:0},{name:'乐东',value:0},{name:'文昌',value:0},{name:'定安县',value:0},{name:'琼中县',value:0},{name:'武汉',value:22},{name:'境外输入',value:5},{name:'仙桃',value:0},{name:'荆门',value:0},{name:'荆州',value:0},{name:'黄冈',value:0},{name:'鄂州',value:0},{name:'十堰',value:0},{name:'孝感',value:0},{name:'天门',value:0},{name:'黄石',value:0},{name:'襄阳',value:0},{name:'潜江',value:0},{name:'恩施州',value:0},{name:'神农架',value:0},{name:'随州',value:0},{name:'咸宁',value:0},{name:'宜昌',value:0},{name:'境外输入',value:5},{name:'邵阳',value:1},{name:'益阳',value:0},{name:'长沙',value:0},{name:'地区待确认',value:0},{name:'湘潭',value:0},{name:'湘西自治州',value:0},{name:'张家界',value:0},{name:'株洲',value:0},{name:'娄底',value:0},{name:'怀化',value:0},{name:'永州',value:0},{name:'郴州',value:0},{name:'常德',value:0},{name:'岳阳',value:0},{name:'衡阳',value:0},{name:'地区待确认',value:1},{name:'境外输入',value:11},{name:'定西',value:0},{name:'张掖',value:0},{name:'地区待确认',value:0},{name:'嘉峪关',value:0},{name:'天水',value:0},{name:'陇南',value:0},{name:'兰州',value:0},{name:'平凉',value:0},{name:'庆阳',value:0},{name:'白银',value:0},{name:'甘南州',value:0},{name:'临夏',value:0},{name:'金昌',value:0},{name:'境外输入',value:78},{name:'厦门',value:0},{name:'漳州',value:0},{name:'地区待确认',value:0},{name:'莆田',value:0},{name:'泉州',value:0},{name:'宁德',value:0},{name:'龙岩',value:0},{name:'南平',value:0},{name:'三明',value:0},{name:'福州',value:0},{name:'拉萨',value:0},{name:'铜仁',value:0},{name:'安顺',value:0},{name:'遵义',value:0},{name:'境外输入',value:0},{name:'贵阳',value:0},{name:'六盘水',value:0},{name:'毕节',value:0},{name:'黔南州',value:0},{name:'黔东南州',value:0},{name:'黔西南州',value:0},{name:'葫芦岛',value:167},{name:'境外输入',value:9},{name:'沈阳',value:3},{name:'朝阳市',value:0},{name:'大连',value:0},{name:'营口',value:0},{name:'铁岭',value:0},{name:'抚顺',value:0},{name:'本溪',value:0},{name:'丹东',value:0},{name:'鞍山',value:0},{name:'锦州',value:0},{name:'盘锦',value:0},{name:'阜新',value:0},{name:'辽阳',value:0},{name:'地区待确认',value:-2},{name:'境外输入',value:1},{name:'奉节县',value:0},{name:'巴南区',value:0},{name:'两江新区',value:0},{name:'九龙坡区',value:0},{name:'高新区',value:0},{name:'沙坪坝区',value:0},{name:'江津区',value:0},{name:'綦江区',value:0},{name:'荣昌区',value:0},{name:'大足区',value:0},{name:'江北区',value:0},{name:'丰都县',value:0},{name:'潼南区',value:0},{name:'铜梁区',value:0},{name:'南岸区',value:0},{name:'万州区',value:0},{name:'云阳县',value:0},{name:'渝中区',value:0},{name:'垫江县',value:0},{name:'长寿区',value:0},{name:'石柱县',value:0},{name:'渝北区',value:0},{name:'涪陵区',value:0},{name:'忠县',value:0},{name:'彭水县',value:0},{name:'合川区',value:0},{name:'开州区',value:0},{name:'巫溪县',value:0},{name:'大渡口区',value:0},{name:'巫山县',value:0},{name:'万盛经开区',value:0},{name:'酉阳县',value:0},{name:'璧山区',value:0},{name:'永川区',value:0},{name:'武隆区',value:0},{name:'梁平区',value:0},{name:'城口县',value:0},{name:'黔江区',value:0},{name:'秀山县',value:0},{name:'咸阳',value:0},{name:'渭南',value:0},{name:'延安',value:0},{name:'西安',value:0},{name:'地区待确认',value:0},{name:'境外输入',value:0},{name:'汉中',value:0},{name:'安康',value:0},{name:'宝鸡',value:0},{name:'铜川',value:0},{name:'商洛',value:0},{name:'榆林',value:0},{name:'韩城',value:0},{name:'杨凌',value:0},{name:'西宁',value:0},{name:'海东',value:0},{name:'海北州',value:0},{name:'地区待确认',value:15138},{name:'牡丹江',value:6},{name:'鸡西',value:3},{name:'境外输入',value:2},{name:'地区待确认',value:0},{name:'齐齐哈尔',value:0},{name:'黑河',value:0},{name:'绥化',value:0},{name:'哈尔滨',value:0},{name:'大庆',value:0},{name:'大兴安岭',value:0},{name:'双鸭山',value:0},{name:'鹤岗',value:0},{name:'七台河',value:0},{name:'伊春',value:0},{name:'佳木斯',value:0},]
,
      //点击的省份
      pro:""
      
    };
  },
  components:{
    btnvue
  },
  methods: {
    //返回中国地图
    comechina(){
      this.btnshow=false;
      this.provienchart.clear()
      this.getMap3d()
    },


    /**省份地图 */
    createprovins(){
       let that =this
        var option = {

         tooltip: {
                                show: true,
                                formatter: (params) => {
                                   var value=params.value;
										if(isNaN(value)){
											value=0
										}
										return params.name+"<br /><span>本土确诊人数：<span />"+"："+value
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
              start: 50,
              label: '>100'
            }, {
              start: 40,
              end: 50,
            },
            {
              start: 30,
              end: 40
            },
            {
              start: 20,
              end: 30
            },
            {
              start: 10,
              end: 20
            },
            {
              start: 1,
              end: 10,
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
            name: 'map',
            coordinateSystem: 'geo3D',
            map: this.pro,
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
            data: this.proviendata
          }
        ]
      };
       
        this.provienchart = this.$echarts.init(document.getElementById("map"));
        let gdMap=require('/public/json/' + this.pro + '.json')
         this.$echarts.registerMap(this.pro, gdMap);
        console.log(gdMap)
    
      
        document.getElementById("map").setAttribute('_echarts_instance_', '');
       
      // this.$echarts.registerMap('china', china)
     

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
      let that =this
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
       
                            that.pro= that.pyChinese(parm.name)
                            console.log( that.pro)
                             that.myChart.clear()
                             that.btnshow=true
                                that.createprovins();
                                

                        });
      // window.addEventListener("resize", function () {
      //   that.myChart.resize();
      // });
    },
    pyChinese(pro){
	var str = '';
	switch(pro){
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
.come_btn{
  position: absolute;
  left: 0;
  top: 0;
}
</style>
