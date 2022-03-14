<template>
<header>
  <div class="left_btn" v-show="show==1">
    <btnvue :url="'/china'" :name="'国内概况'"></btnvue>
    <btnvue :url="'/china/detailed'" :name="'详细信息'"></btnvue>
    <btnvue :url="'/china/predict'" :name="'预测实情'"></btnvue>
  </div>
   <div class="left_btn" v-show="show==2">
    <btnvue :url="'/world'" :name="'国际概况'"></btnvue>
    <btnvue :url="'/world/detailed'" :name="'详细信息'"></btnvue>
    <btnvue :url="'/world/predict'" :name="'预测实情'"></btnvue>
  </div>
  <h1>疫情可视化平台</h1>
  <div class="right_btn">
    <div @click="click(1)">
      <rightbtn :url="'/china'" :name="'国内疫情'" >

    </rightbtn>
    </div>
    <div @click="click(2)">
      <rightbtn :url="'/world'" :name="'世界疫情'">
     
    </rightbtn>
    </div>
    
  </div>

</header>
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
      show:true
    }
  },
  methods: {
    click(value){
      console.log(value)
      this.show=value
    }
  },
}
</script>

<style lang="scss" scoped>
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
