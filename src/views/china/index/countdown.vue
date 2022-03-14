<template>
<div>
  <div class="no">
    <div class="no-hd">
      <ul>
        <li v-for="(item, index) in num" :key="index" :id="'num'+index">
          <span  class="timer counter" :data-to="item" data-speed="1500"> </span>
         </li>

      </ul>
    </div>
    <div class="no-bd">
      <ul>
        <li>现有确诊</li>
        <li>累计确诊</li>
       
      </ul>
    </div>
  </div>
</div>
</template>

<script>
import    '@/assets/js/countUp'
export default {
  data() {
    return {
      num: [333, 12364],
    
    }
  },
  mounted() {
   this.$nextTick(()=>{
  $(window).ready(function () {
            $('.timer').each(count); 
            function count(options) {
                var $this = $(this);
                options = $.extend({}, options || {}, $this.data('countToOptions') || {});
                $this.countTo(options);
            }
            $(".math").removeClass("timer");
        })

   })
  },
}
</script>

<style lang="scss" scoped>
.no {
  background: rgba(101, 132, 226, 0.1);
  padding: 0.1875rem;
}

.no .no-hd {
  position: relative;
  border: 1px solid rgba(25, 186, 139, 0.17);
}

.no .no-hd::before {
  content: "";
  position: absolute;
  width: 30px;
  height: 10px;
  border-top: 2px solid #02a6b5;
  border-left: 2px solid #02a6b5;
  top: 0;
  left: 0;
}

.no .no-hd::after {
  content: "";
  position: absolute;
  width: 30px;
  height: 10px;
  border-bottom: 2px solid #02a6b5;
  border-right: 2px solid #02a6b5;
  right: 0;
  bottom: 0;
}

.no .no-hd ul {
  display: flex;
}

.no .no-hd ul li {
  position: relative;
  flex: 1;
  text-align: center;
  height: 1rem;
  line-height: 1rem;
  font-size: 0.875rem;
  // color: #ffeb7b;
  padding: 0.05rem 0;
  font-family: electronicFont;
  font-weight: bold;
}
.no .no-hd ul li:nth-child(1) {
 
  color: #fa1a1a;
  
}
.no .no-hd ul li:nth-child(2) {
 
  color: #ecce21;
  
}
.no .no-hd ul li:nth-child(3) {
 
  color: #28f815;
  
}
.no .no-hd ul li:nth-child(4) {
 
  color: #acabaa;
  
}

.no .no-hd ul li:first-child::after {
  content: "";
  position: absolute;
  height: 50%;
  width: 1px;
  background: rgba(255, 255, 255, 0.2);
  right: 0;
  top: 25%;
}

.no .no-hd ul li:nth-child(2)::after {
  content: "";
  position: absolute;
  height: 50%;
  width: 1px;
  background: rgba(255, 255, 255, 0.2);
  right: 0;
  top: 25%;
}

.no .no-hd ul li:nth-child(3)::after {
  content: "";
  position: absolute;
  height: 50%;
  width: 1px;
  background: rgba(255, 255, 255, 0.2);
  right: 0;
  top: 25%;
}

.no .no-bd ul {
  display: flex;
}

.no .no-bd ul li {
  flex: 1;
  height: 0.5rem;
  line-height: 0.5rem;
  text-align: center;
  font-size: 0.225rem;
  color: rgba(255, 255, 255, 0.7);
  padding-top: 0.125rem;
}
</style>
