<template>
<div class="introduction" ref="introduction">

  <el-row :gutter="0" class="table_title">
    <el-col :xs="3" :sm="3" :md="3" :lg="3" :xl="3">省份</el-col>
    <el-col :xs="4" :sm="4" :md="4" :lg="4" :xl="4">城市</el-col>
    <el-col :xs="5" :sm="3" :md="3" :lg="3" :xl="3">新增</el-col>
    <el-col :xs="3" :sm="3" :md="3" :lg="3" :xl="3">现有</el-col>
    <el-col :xs="6" :sm="6" :md="6" :lg="6" :xl="6">地区风险</el-col>
    <el-col :xs="5" :sm="5" :md="5" :lg="5" :xl="5">新增时间</el-col>
  </el-row>
  <div class="swiper-container" id="rotation" :style="{width:width+'px',height:height+'px'}">
    <div class="swiper-wrapper">
      <div class="swiper-slide" v-for="(item, index) in tabledata" :key="index">
        <el-row :gutter="0">
          <el-col :xs="3" :sm="3" :md="3" :lg="3" :xl="3">{{item. province}}</el-col>
          <el-col :xs="4" :sm="4" :md="4" :lg="4" :xl="4">{{item. city}}</el-col>
          <el-col :xs="3" :sm="3" :md="3" :lg="3" :xl="3">{{item. confirmAdd}}</el-col>
          <el-col :xs="3" :sm="3" :md="3" :lg="3" :xl="3">{{item. nowConfirm}}</el-col>
          <el-col :xs="6" :sm="6" :md="6" :lg="6" :xl="6">{{item. grade}}</el-col>
          <el-col :xs="5" :sm="5" :md="5" :lg="5" :xl="5">{{item. date}}</el-col>
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
      tabledata:  this.$store.state.tabledata
    }
  },
  mounted() {

    this.width = this.$refs.introduction.offsetWidth - 10
    this.height = this.$refs.introduction.offsetHeight - 30
    Swiper.use([Autoplay, Navigation, Pagination]);
    this.$nextTick(() => {
      //实现按钮点击切换以及轮播的效果

     setTimeout(() => {
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
     }, 500);
    })

  },
  watch:{
    tabledata(newval,oldval){
   
      this.$forceUpdate()
    }
  }
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
  line-height:35px;
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
