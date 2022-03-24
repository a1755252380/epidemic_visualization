<template>
<div class="echart_div" ref="echartdiv">
    <div class="echarts_title">{{title}}
       <div class="btn_div">
      <el-tooltip content="全屏显示" placement="bottom">
        <el-button @click="bigshow"><i class="el-icon-full-screen"></i></el-button>
      </el-tooltip>
         <el-tooltip content="保存成图片" placement="bottom">
        <el-button @click="downloadpicture"><i class="el-icon-download"></i></el-button>
      </el-tooltip>
      <!-- 
      <el-tooltip content="全屏显示" placement="bottom">
        <el-button @click="bigshow"><i class="el-icon-full-screen"></i></el-button>
      </el-tooltip> -->
    </div>
    </div>
  <div :id="divid"  :style="{width:width+'px',height:height+'px'}"></div>
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
    props: ['cicledata',"id","title"],
      data() {
        return {
          width:0,
          height:0,
          echart: null,
          timeoutloop:null,
          option:{},
             bigwidth:0,
      bigheight:0,
      centerDialogVisible:false,
      bigechart:null
        }
      },
      destroyed() {
        clearInterval(this.timeoutloop)
      },
      mounted() {
         this.width=this.$refs.echartdiv.offsetWidth
            this.height=this.$refs.echartdiv.offsetHeight-20
            this.option=this.cicledata
           
            this.$nextTick(()=>{
            
                  this.createcicle(this.divid);
                  this.activeLoop()
            
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
          
          this.createbigcicle("big"+this.divid)
     }, 500);
}, 500);
     
      }
    },
        activeLoop() {
    // 循环高亮显示   seriesIndex：1   外圈高亮
    let index = -1; // 高亮下标
    const dataLength = this.cicledata.series[1].data.length;
    this.timeoutloop = setInterval(() => {
        // 清除之前的高亮
        this.echart.dispatchAction({
            type: 'downplay',
            seriesIndex: 1,
            dataIndex: index,
        });
        this.echart.dispatchAction({
            type: 'hideTip',
            seriesIndex: 1,
            dataIndex: index,
        });
        index = (index + 1) % dataLength;
        // 当前下标高亮
        this.echart.dispatchAction({
            type: 'highlight',
            seriesIndex: 1,
            dataIndex: index,
        });
        this.echart.dispatchAction({
            type: 'showTip',
            seriesIndex: 1,
            dataIndex: index,
        });
    }, 2000);
    // 鼠标划入
    this.echart.on('mouseover', (e) => {
        // 停止定时器，清除之前的高亮
        clearInterval(this.timeoutloop);
        this.echart.dispatchAction({
            type: 'downplay',
            seriesIndex: 1,
            dataIndex: index,
        });
        this.echart.dispatchAction({
            type: 'hideTip',
            seriesIndex: 1,
            dataIndex: index,
        });
    });
    // 鼠标离开
    this.echart.on('mouseout', (e) => {
       this. activeLoop();
    });
}
,
         createcicle(id) {
         
          // 基于准备好的dom，初始化echarts实例
          this.echart = this.$echarts.init(document.getElementById(id));
         document.getElementById(id).setAttribute('_echarts_instance_', '');

          // 指定图表的配置项和数据
          var option =this.option;

          // 使用刚指定的配置项和数据显示图表。
          this.echart.setOption(option);
        //           window.onresize = function () {
        //   this.echart.resize();
        // };
        },
         createbigcicle(id) {
         
          // 基于准备好的dom，初始化echarts实例
          this.bigechart = this.$echarts.init(document.getElementById(id));
         document.getElementById(id).setAttribute('_echarts_instance_', '');

          // 指定图表的配置项和数据
          var option =this.option;

          // 使用刚指定的配置项和数据显示图表。
          this.bigechart.setOption(option);
        //           window.onresize = function () {
        //   this.echart.resize();
        // };
        }
      },
      computed: {
       
         divid: {
          get() {
            return this.id
          }
        }
      },
 
}
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
