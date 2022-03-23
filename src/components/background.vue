<template>
<div>
  <div class="">
    <header v-show="!middleshow"  id="header">
    <div class="left_btn" >
    <btnvue :url="'/china/index'" :name="'国内概况'"></btnvue>
    <btnvue :url="'/china/detailed'" :name="'详细信息'"></btnvue>
    <btnvue :url="'/china/predict'" :name="'预测实情'"></btnvue>
  </div>
   
  <h1>疫情可视化平台</h1>
  <div class="right_btn">
    <div @click="click(1)">
      <rightbtn :url="'/china/index'" :name="'国内疫情'" >

    </rightbtn>
    </div>
    <div @click="click(2)">
      <rightbtn :url="'/world/index'" :name="'世界疫情'">
     
    </rightbtn>
    </div>
    
  </div>

  
  
</header>
  </div>

  <div v-show="middleshow" id="middletitle" class="middletitle_fixed">
   <div class="middle_title_div">
      <div class="middle_title">疫情可视化平台</div>
    <el-button @click="show3 = !show3" class="middle_btn"><i class="el-icon-s-operation"></i></el-button>

   </div>
    <div >
      <el-collapse-transition>
        <div v-show="show3" class="transition_div">
           <router-link to="/china/index">
          <div class="transition-box">
           国内概况
          </div>
          </router-link>
            <router-link to="/china/detailed">
          <div class="transition-box">
           详细信息
          </div>
          </router-link>
            <router-link to="/china/predict">
          <div class="transition-box">
           预测实情
          </div>
          </router-link>
            <router-link to="/china/index">
          <div class="transition-box">
           国内疫情
          </div>
          </router-link>
            <router-link to="/world/index">
          <div class="transition-box">
           世界疫情
          </div>
          </router-link>
        </div>
      </el-collapse-transition>
    </div>
  </div>
</div>
</template>

<script>
import "../assets/js/flexible"
import btnvue from "./btn/btn.vue"
import rightbtn from "./btn/rightbtn.vue"
export default {
  components: {
    btnvue,
    rightbtn
  },data() {
    return {
      show:true,
      show3:false,
      middleshow:false,
    }
  },
  mounted() {
    if (document.documentElement.offsetWidth<768) {
      this.middleshow=true
      window.addEventListener('scroll',this.handleScroll,true)
    }else{

    }
  },
  methods: {
    handleScroll2(){
      let scrollTop = document.documentElement.scrollTop;
      if (scrollTop>50) {
        $("#header").addClass("header_fixed");
      }else{
        $("#header").removeClass("header_fixed");
      }
      console.log(scrollTop);
    },
    handleScroll(){
      let scrollTop = document.documentElement.scrollTop;
      if (scrollTop>50) {
        $("#middletitle").addClass("middletitle_fixed");
      }else{
        $("#middletitle").removeClass("middletitle_fixed");
      }
      console.log(scrollTop);
    },
    click(value){
      console.log(value)
      this.show=value
    }
  },
}
</script>

<style lang="scss" scoped>
.header_fixed{
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 999;
  background: rgb(6, 22, 74);
}
//手机端导航
.middle_title_div{
    height: 3.8rem;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
.middle_btn{
  float: right;
  height: 1.8rem;
  width: 1.5rem;
  margin: 0.5rem;
  line-height: 1rem;
  position: absolute;
  right: 0;
  display: flex;
    justify-content: center;
    align-items: center;
}
.middle_title{
    display: flex;
    justify-content: center;
    align-items: center;
  height: 100%;
  font-size: 1.5rem;
  color: #fff;
}

}
.transition_div{
  width: 95%;
  margin: auto;
 a{
      color: #fff;
    text-decoration: none;
    font-size: 1.2rem;
    }
}
 .transition-box {
    margin-bottom: 10px;
    width: 100%;
    height: 2rem;
    text-align: center;
    border-bottom: #606266 solid 1px;
    color: #fff;
    box-sizing: border-box;
      display: flex;
    justify-content: center;
    align-items: center;
   
  }
.middletitle_fixed{
  position: fixed;
  top: 0;
  width: 100%;
   height: 3.8rem;
  background: #000000;
  z-index: 99;
  box-shadow: 0px 0px 2px 1px rgb(148, 147, 147);
  transform:all 2s linear;
  .transition_div{z-index: 99 !important;
  background: rgb(6, 22, 74);}
}


.left_btn {
  position: absolute;
  // left: 5vw;
}

.right_btn {
  position: absolute;
  right: 3%;
  top: 2%;
  div{
    display: inline-block;
  }
}

header {
  position: relative;
  height: 1.25rem;
  background: url("../assets/images/head_bg.png") no-repeat top center;
  background-size: 100% 100%;
}

header h1 {
  font-size: 0.475rem;
  color: #fff;
  text-align: center;
  line-height: 1rem;
}

header .showTime {
  position: absolute;
  top: 0;
  right: 0.375rem;
  line-height: 0.9375rem;
  font-size: 0.25rem;
  color: rgba(255, 255, 255, 0.7);
}

</style>
