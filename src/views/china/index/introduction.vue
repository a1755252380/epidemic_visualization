<template>
<div class="introduction" ref="introduction">

  <el-row :gutter="0" class="table_title">
    <el-col :xs="3" :sm="3" :md="3" :lg="3" :xl="3">省份</el-col>
    <el-col :xs="5" :sm="5" :md="5" :lg="5" :xl="5">城市</el-col>
    <el-col :xs="5" :sm="3" :md="3" :lg="3" :xl="3">新增</el-col>
    <el-col :xs="3" :sm="3" :md="3" :lg="3" :xl="3">现有</el-col>
    <el-col :xs="5" :sm="5" :md="5" :lg="5" :xl="5">地区风险</el-col>
    <el-col :xs="5" :sm="5" :md="5" :lg="5" :xl="5">新增时间</el-col>
  </el-row>
  <div class="swiper-container" id="rotation" :style="{width:width+'px',height:height+'px'}">
    <div class="swiper-wrapper">
      <div class="swiper-slide" v-for="(item, index) in tabledata" :key="index">
        <el-row :gutter="0">
          <el-col :xs="3" :sm="3" :md="3" :lg="3" :xl="3">{{item.province}}</el-col>
          <el-col :xs="5" :sm="5" :md="5" :lg="5" :xl="5">{{item.city}}</el-col>
          <el-col :xs="3" :sm="3" :md="3" :lg="3" :xl="3">{{item.confirmAdd}}</el-col>
          <el-col :xs="3" :sm="3" :md="3" :lg="3" :xl="3">{{item.nowConfirm}}</el-col>
          <el-col :xs="5" :sm="5" :md="5" :lg="5" :xl="5">{{item.grade}}</el-col>
          <el-col :xs="5" :sm="5" :md="5" :lg="5" :xl="5">{{item.date}}</el-col>
        </el-row>
      </div>

    </div>
  </div>
</div>
</template>

<script>
import {
  Swiper,
  Navigation,
  Pagination,
  Autoplay
} from 'swiper'
export default {
  data() {
    return {
      width: 0,
      height: 0,
      tabledata: [ {
        'confirmAdd': 0,
        'grade': '全部低风险',
        'date': '02 / 05',
        'city': '云浮',
        'nowConfirm': 7,
        'province': '广东'
      }, {
        'confirmAdd': 0,
        'grade': '全部低风险',
        'date': '02 / 02',
        'city': '衡水',
        'nowConfirm': 5,
        'province': '河北'
      }, {
        'confirmAdd': 0,
        'grade': '部分中风险',
        'date': '02 / 22',
        'city': '牡丹江',
        'nowConfirm': 6,
        'province': '黑龙江'
      }, {
        'confirmAdd': 0,
        'grade': '全部低风险',
        'date':' 02 / 23',
        'city': '安阳',
        'nowConfirm': 4,
        'province': '河南'
      }, {
        'confirmAdd': 0,
        'grade': '全部低风险',
        'date': '02 / 06',
        'city': '廊坊',
        'nowConfirm': 6,
        'province': '河北'
      }, {
        'confirmAdd': 0,
        'grade': '全部低风险',
        'date': '01 / 29',
        'city': '保定',
        'nowConfirm': 2,
        'province': '河北'
      }, {
        'confirmAdd': 0,
        'grade': '全部低风险',
        'date': '02 / 13',
        'city': '济南',
        'nowConfirm': 1,
        'province': '山东'
      }, {
        'confirmAdd': 0,
        'grade': '全部低风险',
        'date': '01 / 27',
        'city': '珠海',
        'nowConfirm': 35,
        'province': '广东'
      }, {
        'confirmAdd': 0,
        'grade': '部分中风险',
        'date':' 01 / 30',
        'city': '西双版纳州',
        'nowConfirm': 5,
        'province': '云南'
      }, {
        'confirmAdd': 0,
        'grade': '全部低风险',
        'date':' 01 / 25',
        'city': '雄安新区',
        'nowConfirm': 5,
        'province': '河北'
      },  ]
    }
  },
  mounted() {

    this.width = this.$refs.introduction.offsetWidth - 10
    this.height = this.$refs.introduction.offsetHeight - 30
    Swiper.use([Autoplay, Navigation, Pagination]);
    this.$nextTick(() => {
      //实现按钮点击切换以及轮播的效果

      new Swiper('#rotation', {
        direction: "vertical",
        loop: true,
        slidesPerView:5,
        centeredSlides: true,
        spaceBetween: 10,
        // grabCursor: true,

        autoplay: {
          delay: 1000,
          disableOnInteraction: false,

        },

      });
    })

  },

}
</script>

<style lang="scss" scoped>
@import url("../../../../node_modules/swiper/swiper-bundle.css");

.introduction {
  
  width: 100%;
  height: 100%;
  // padding: 0.08rem;
  position: relative;

}

.swiper-slide {
  text-align: center;
  font-size: 0.20rem;
    border-radius: 10px;
  background-color: rgb(93, 106, 216);
  padding: 5px;
  line-height:25px;
  color: #ffffff;

}

.swiper-slide-active,
.swiper-slide-duplicate-active {
  transform: scale(1);
}

//表格标题抬头
.table_title {
  position: relative;
  // top: 1vh;
  font-size: 15px;
  color: #ffffff;
  
  padding: 1vh;
  z-index: 99;
  background: rgb(21, 52, 146);
}
</style>
