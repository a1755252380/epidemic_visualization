<template>
<div class="echart_div" ref="echartdiv">
  <div class="echarts_title">
    {{ title }}
    <div class="btn_div">
      <el-tooltip content="全屏显示" placement="bottom">
        <el-button @click="bigshow"><i class="el-icon-full-screen"></i></el-button>
      </el-tooltip>
      <!-- <el-tooltip content="全屏显示" placement="bottom">
        <el-button @click="bigshow"><i class="el-icon-full-screen"></i></el-button>
      </el-tooltip>
      <el-tooltip content="全屏显示" placement="bottom">
        <el-button @click="bigshow"><i class="el-icon-full-screen"></i></el-button>
      </el-tooltip> -->
    </div>
  </div>
  <div :id="divid" :style="{ width: width + 'px', height: height + 'px' }"></div>
  <el-dialog :visible.sync="centerDialogVisible" width="60%" center class="dialog " :title="this.title">
    <div style="width:100%;height:70vh" class="panel " ref="bigshow">
        <div class="panel-footer"></div>
      <div :id="'big'+this.divid"  :style="{ width: bigwidth + 'px', height: bigheight + 'px' }"></div>
       
    </div>
    
  </el-dialog>
</div>
</template>

<script>
export default {
  props: ["optiondata", "id", "title"],
  data() {
    return {
      width: 0,
      height: 0,
      echart: null,
      bigechart: null,
      centerDialogVisible: false,
      bigwidth:0,
      bigheight:0,
    };
  },
  mounted() {
    this.width = this.$refs.echartdiv.offsetWidth;
    this.height = this.$refs.echartdiv.offsetHeight - 20;
    let that = this;

    this.$nextTick(function () {
      that.createechart(that.divid);
    });
  },
  methods: {
    //全屏显示
    bigshow(id) {
    
      if (this.centerDialogVisible) {
        this.centerDialogVisible = false;
      } else {
        this.centerDialogVisible = true;
         setTimeout(() => {
     this.$message({
          message: '稍等...',
          type: 'success'
        });
 }, 100);
setTimeout(() => {

   this.bigwidth = this.$refs.bigshow.offsetWidth;
      this.bigheight = this.$refs.bigshow.offsetHeight ;
     setTimeout(() => {
          this.createbigechart("big"+this.divid)
     }, 500);
}, 500);
     
      }
    },

    //
    createechart(id) {
      // 基于准备好的dom，初始化echarts实例
      this.echart = this.$echarts.init(document.getElementById(id));
      document.getElementById(id).setAttribute("_echarts_instance_", "");

      // 指定图表的配置项和数据
      var option = this.option;

      // 使用刚指定的配置项和数据显示图表。
      this.echart.setOption(option);
      window.onresize = function () {
        this.echart.resize();
      };
    },
     createbigechart(id) {
      // 基于准备好的dom，初始化echarts实例
      this.bigechart = this.$echarts.init(document.getElementById(id));
      document.getElementById(id).setAttribute("_echarts_instance_", "");

      // 指定图表的配置项和数据
      var option = this.option;

      // 使用刚指定的配置项和数据显示图表。
      this.bigechart.setOption(option);
      window.onresize = function () {
        this.bigechart.resize();
      };
    },
  },
  computed: {
    option: {
      get() {
        return this.optiondata;
      },
    },
    divid: {
      get() {
        return this.id;
      },
    },
  },
};
</script>

<style lang="scss" scoped>
.echart_div {
  width: 100%;
  height: 100%;
  .dialog{
    overflow: hidden;
    z-index: 99;
    margin-top: 0;
  }
  .echarts_title {
    position: relative;

    .btn_div {
      position: absolute;
      right: 4%;
      top: 0;
    }
  }
}
/deep/ .el-dialog{
   border: 1px solid rgba(25, 186, 139, 0.17);
    background: rgb(16, 31, 81) url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAeAAAAFNAQMAAADimC7mAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAAGUExURQAAAGWE4vqQbh8AAAACdFJOUwAX9UBI/wAAAORJREFUeNrt2rEJwkAAheGnWFg6QXAQC8dK6QbZwEnsUzqEpVU67cROESEQ9Dz5rjAgpvr4r5CXZJt5skp2WY78WCTrzHI/lb5c6UGF6pMvD6e+azbt0+MynPtu//DlsWsO7fXll6hUhQpVaaqJdxgqVaFCVZSq5B2GSlWoUE091d5hqlIVKlRv7rCxD1SqQoWqNNXEOwyVqlCh+rn/9L91h6FSFSpUthWqUhUq2wrbClWhQmVbgUpVqFDZVqBSFSpUthWqUhUq2wrbClWhQmVbgUpVqFDZVqBSFSpUthWqQvXXVDeeUfX257CIIwAAAABJRU5ErkJggg==);
    padding:  0.18rem;
    margin-top: 10vh !important;
    
}
/deep/.el-dialog__title{
color: #fff !important;
}
/deep/ .el-button {
  padding: 2px;
  background: transparent;
  border: none;

  color: rgb(54, 245, 252);
}
.panel::before {
  position: absolute;
  top: 0;
  left: 0;
  content: "";
  width: 10px;
  height: 10px;
  border-top: 2px solid #02a6b5;
  border-left: 2px solid #02a6b5;
  border-radius: 20%;
}
.panel::after {
  position: absolute;
  top: 0;
  right: 0;
  content: "";
  width: 10px;
  height: 10px;
  border-top: 3px solid #02a6b5;
  border-right: 2px solid #02a6b5;
  border-radius: 20%;
}
.panel .panel-footer {
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
}
.panel .panel-footer::before {
  position: absolute;
  bottom: 0;
  left: 0;
  content: "";
  width: 10px;
  height: 10px;
  border-bottom: 2px solid #02a6b5;
  border-left: 2px solid #02a6b5;
  border-radius: 20%;
}
.panel .panel-footer::after {
  position: absolute;
  bottom: 0;
  right: 0;
  content: "";
  width: 10px;
  height: 10px;
  border-bottom: 2px solid #02a6b5;
  border-right: 2px solid #02a6b5;
  border-radius: 20%;
}
</style>
