<template>
  <div class="hello">
    <div class="map1"></div>
     <div class="map2"></div>
      <div class="map3"></div>
  </div>
</template>

<script>

export default {
  name: 'HelloWorld',


 
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.hello{
  width: 80%;
  height: 80%;
  position: absolute;
  left:10%;
  top: 20%;
  overflow: hidden;
  z-index: -1;
}
.map1,  .map2,  .map3{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 6.475rem;
    height: 6.475rem;
    background: url("../../../assets/img/map.png") no-repeat;
    background-size: 100% 100%;
    opacity: 0.3;
}
 .map2 {
    width: 8.0375rem;
    height: 8.0375rem;
    background-image: url("../../../assets/img/lbx.png");
    opacity: 0.6;
    animation: rotate 15s linear infinite;
    z-index: 2;
}
 .map3 {
    width: 7.075rem;
    height: 7.075rem;
    background-image: url("../../../assets/img/lbx.png");
    animation: rotate1 10s linear infinite;
}
@keyframes rotate {
  from {
    transform: translate(-50%, -50%) rotate(0deg);
  }
  to {
    transform: translate(-50%, -50%) rotate(360deg);
  }
}
@keyframes rotate1 {
  from {
    transform: translate(-50%, -50%) rotate(0deg);
  }
  to {
    transform: translate(-50%, -50%) rotate(-360deg);
  }
}
</style>
