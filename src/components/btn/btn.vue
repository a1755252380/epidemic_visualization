<template>
  <div class="btn_div">
    <router-link :to="url">
       
    <button class="corner-button">
 <span>{{name}}</span>
  
</button></router-link>
  </div>
</template>
<script>
export default {
  props:['url','name']
}
</script>
<style lang="scss" scoped>
.btn_div{
  padding: 00.15rem;
  margin-left: 0.5rem;
  display: inline-block;
}
.btn_div, .btn_div::before, .btn_div::after {
  box-sizing: inherit;
}


.corner-button {
  font-family: 'Lato', sans-serif;
  letter-spacing: .002rem;
  cursor: pointer;
  background: transparent;
  border: 0.05rem solid currentColor;
  padding: 0.1rem 0.2rem;
  font-size: 0.1rem;
 
  position: relative;
  transition: color 0.3s;
     color: rgb(118, 150, 255) !important;
}
.corner-button:hover {
  color: rgb(28, 243, 232);
}
.corner-button:hover::before {
  width: 0;
}
.corner-button:hover::after {
  height: 0;
}
.corner-button:active {
  border-width: 0.02rem;
}
.corner-button span {
  position: relative;
  z-index: 2;
}
.corner-button::before, .corner-button::after {
  content: '';
  position: absolute;
  background: rgb(12, 26, 70);
  z-index: 1;
  transition: all 0.3s;
}
.corner-button::before {
  width: calc(100% - 0.3rem);
  height: calc(101% + 0.24rem);
  top: -0.13rem;
  left: 50%;
  -webkit-transform: translateX(-50%);
          transform: translateX(-50%);
}
.corner-button::after {
  height: calc(100% - 0.3rem);
  width: calc(101% + 0.4rem);
  left: -0.2rem;
  top: 50%;
  -webkit-transform: translateY(-50%);
          transform: translateY(-50%);
}

</style>