<template>
  <div class="rightbtn"> 
    <div class="btn-wrapper">
  <div class="btn-wrapper__container">
    <div class="btn-inner">
      <router-link :to="url" class="btn-inner__text">{{name}}</router-link>
    </div>
  </div>
</div>
  </div>
</template>
<script>
export default {
  props:['url','name']
}
</script>
<style lang="scss" scoped>

.rightbtn{
  display: inline-block;
  margin: 0 0.3rem;

}


.btn-wrapper {
  width: 2rem;
  height: 00.5rem;
  position: relative;
}
.btn-wrapper:hover .btn-inner {
  top: 2px;
  transform: scale(1, 1);
  cursor: pointer;
}
.btn-wrapper__container {
  border-bottom: 2px solid #15B5E2;
  position: absolute;
  width: 100%;
  height: 100%;
}
.btn-wrapper__container:before, .btn-wrapper__container:after {
  border-bottom: 2px solid #15B5E2;
  width: 96%;
  left: 2%;
  bottom: -5px;
  content: "";
  position: absolute;
}
.btn-wrapper__container:after {
  width: 92%;
  left: 4%;
  bottom: -8px;
}
.btn-wrapper__container .btn-inner {
  width: 104.2%;
  height: 100%;
  position: absolute;
  top: 10px;
  left: -2.1%;
  border: 2px solid #15B5E2;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: 'Source Code Pro', monospace;
  letter-spacing: 1px;
  text-transform: uppercase;
  font-size: 14px;
  background: #10131C;
  transform: scale(0.96, 0.96);
  transition: all .3s;
  z-index: 4;
  color: #15B5E2;
}
.btn-wrapper__container .btn-inner__text {
  text-decoration: none;
  color: #15B5E2;
}

</style>