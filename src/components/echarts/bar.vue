<template>
<div class="echart_div" ref="echartdiv">
  <div class="echarts_title">
    {{ title }}
    <div class="btn_div">
      <el-tooltip content="全屏显示" placement="bottom">
        <el-button @click="bigshow"><i class="el-icon-full-screen"></i></el-button>
      </el-tooltip>
   <el-tooltip content="保存成图片" placement="bottom">
        <el-button @click="downloadpicture"><i class="el-icon-download"></i></el-button>
      </el-tooltip>
       <!-- 数据视图  目前只支持折线图 -->
      <!-- <el-tooltip content="数据展示" placement="bottom">
        <el-button @click="datashow"><i class="el-icon-document"></i></el-button>
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

  <!-- 数据视图  目前只支持折线图 -->
    <!-- <el-dialog :visible.sync="datashowdiv" width="60%" center class="dialog " :title="this.title">
    <div style="width:100%;height:70vh" class="panel " ref="bigshow">
        <div class="panel-footer"></div>
       <el-table
    :data="this.table.data"
    :height="bigheight"
    border
    style="width: 100%">
    <el-table-column
      prop="time"
    
      label="时间"
    >
    </el-table-column>
    <el-table-column
     
      v-for="(item, index) in this.table.name" :key="index"
      :label="item"
      :prop="item"
    >
    </el-table-column>
   
  </el-table>
    </div>
    
  </el-dialog> -->
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

      //数据视图
      table:{
        name:[],
        data:[]
      },
      datashowdiv:false
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
    //保存成图片
     //下载成图片
     downloadpicture(){
     let str= this.echart.getDataURL({
            pixelRatio: 2,
            backgroundColor: 'rgb(21, 38, 90)'
        });
        this.downloadFile(str,this.divid)
    },
    //下载base64图片
    downloadFile(content, fileName) { //下载base64图片
    var base64ToBlob = function(code) {
        let parts = code.split(';base64,');
        let contentType = parts[0].split(':')[1];
        let raw = window.atob(parts[1]);
        let rawLength = raw.length;
        let uInt8Array = new Uint8Array(rawLength);
        for(let i = 0; i < rawLength; ++i) {
            uInt8Array[i] = raw.charCodeAt(i);
        }
        return new Blob([uInt8Array], {
            type: contentType
        });
    };
    let aLink = document.createElement('a');
    let blob = base64ToBlob(content); //new Blob([content]);
    let evt = document.createEvent("HTMLEvents");
    evt.initEvent("click", true, true); //initEvent 不加后两个参数在FF下会报错  事件类型，是否冒泡，是否阻止浏览器的默认行为
    aLink.download = fileName;
    aLink.href = URL.createObjectURL(blob);
    aLink.click();
},

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
    datashow(){
      console.log(this.echart._model.option)
      //获取x轴数据
      //  console.log(this.echart._model.option.xAxis[0].data)
      //  this.table.time=this.echart._model.option.xAxis[0].data
        // console.log(this.echart._model.option.series)
    if (this.datashowdiv) {
        this.datashowdiv = false;
      } else {
        this.datashowdiv = true;
         setTimeout(() => {
     this.$message({
          message: '稍等...',
          type: 'success'
        });
 }, 100);
    let s=[]
        for (let index = 0; index < this.echart._model.option.series.length; index++) {
          let da=[]
          // console.log(this.echart._model.option.series[index].name)
          //数据名称
          this.table.name.push(this.echart._model.option.series[index].name)
         for (let index2 = 0; index2 < this.echart._model.option.series[index].data.length; index2++) {
            da.push(this.echart._model.option.series[index].data[index2])
        }
        s.push(da)   
          }
        
        console.log(s)
        for (let index = 0; index < s[0].length; index++) {
         let da= {
            time: this.echart._model.option.xAxis[0].data[index],
         
          }
          for (let i = 0; i < s.length; i++) {
           da[this.table.name[i]]=s[i][index]
          }
          this.table.data.push(da)
        }
        console.log(this.table)
setTimeout(() => {

   this.bigwidth = this.$refs.bigshow.offsetWidth;
      this.bigheight = this.$refs.bigshow.offsetHeight ;
     
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
  computed: {//计算属性   实时监听传递的option配置项信息
    option: {//动态option配置项
      get() {
        return this.optiondata;
      },
    },
    divid: {//使用自定义id  防止id冲突导致无法渲染
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
