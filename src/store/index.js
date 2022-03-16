import Vue from 'vue'
import Vuex from 'vuex'
import axios from "axios"
Vue.use(Vuex)

export default new Vuex.Store({
  state: {

    isLogin:false,
      //控制是否等待
    loading:false,
    //总数
    nowconfirm:0,
    sum_confirm: 0,
    sum_dead: 0,
    sum_heal:0,
    //地区待确定
    placesum: 0,
    //境外输入
    outinputsum: 0,
    //无症状感染者
    nownoInfect:0,

    //中国地图
    chinamap: {
      china: [],
      city:[]
    },
    //中国累计数据
    china: {
      addtime: [],
      time:[],
      comfirmadd: [],
      confirm: [],
      dead: [],
      deadadd: [],
      heal: [],
      healadd: [],
      
    },
    chinaday: {
      time: [],
      deadrate: [],
      healrate: [],
      importedcase:[]
    },
    //近况列表数据
    tabledata: [
     
    ],
    
    //近60天无症状感染者现有数据
    noinfect: {
      time: [],
      noinfectadd:[]
    },

    //中国预测数据
    chinapredict: {
      time: [],
      comfirm: [],
      heal: [],
      dead: [],
      endtime: "",
      begintime:""
    },
    //世界各国数据对比
    worldtop: {
      name: [],
      comfirm: [],
      heal: [],
      dead: [],
    },

    //世界数据
    worldmap: [],
    
    //世界预测
    worldpredict: {
      time: [],
      comfirm: [],
      heal: [],
      dead: [],
      endtime: "",
      begintime:""
    },
    world_nowconfirm:0,
    world_sum_confirm: 0,
    world_sum_dead: 0,
    world_sum_heal: 0,
    world: {
      time: [],
      time_confirm: [],
      time_dead: [],
      time_heal: [],
      time_newaddconfirm: [],
      time_newadddead: [],
      time_newaddheal:[]
    }
  },
  mutations: {
    //获取数据
    async getdata (state, a) { 
      //中国地图
      await a.$myRequest({url:"/data/china",method:"GET"}).then((res) => {
     
        let data = res.data
        state.nownoInfect=  data.nownoInfect
        state.outinputsum= data. nowoutinput
          state.placesum=data.nowplace
        console.log(data)
        state.sum_confirm = data.sum_confirm
        state.sum_dead = data.sum_dead
        state.sum_heal = data.sum_heal
        state.nowconfirm = data.nowconfirm
        //chinadaylist数据表的  死亡率与治愈率
        for (let i = 0; i < data.chinadaylisttime.length; i++) {
          let time=data.chinadaylisttime[i].substring(0,4)+"-"+data.chinadaylisttime[i].substring(4,6)+"-"+data.chinadaylisttime[i].substring(6,8)
         state. chinaday.time.push(time),
         state. chinaday. deadrate.push(data.deadrate[i]),
         state. chinaday. healrate.push(data.healrate[i]),
         state. chinaday.importedcase.push(data.importedcase[i])
         
          
        }
        //中国省份数据
        for (let i = 0; i < data.china_province.length; i++) {
          let china = { name: data.china_province[i], value: data.china_province_nowConfirm[i] }
            state.chinamap.china.push(china)
        }

        //中国城市数据
        for (let i = 0; i < data.china_city.length; i++) {
          let china = { name: data.china_city[i], value: data.china_city_nowConfirm[i] }
            state.chinamap.city.push(china)
        }

        //新增数据
        for (let i = 0; i < data.time2.length; i++) {
          let time=data.time2[i].substring(0,4)+"-"+data.time2[i].substring(4,6)+"-"+data.time2[i].substring(6,8)
          state.china.addtime.push(time)
          state.china.comfirmadd.push(data.comfirmadd[i])
          state.china.deadadd.push(data.deadadd[i])
          state.china.healadd.push(data.healadd[i])
        }
        // console.log( state.china.time)
         //累计数据
         for (let i = 0; i < data.time.length; i++) {
        
          state.china.time.push(data.time[i])
          state.china.confirm.push(data.confirm[i])
          state.china.dead.push(data.dead[i])
          state.china.heal.push(data.heal[i])
        }
        

        //近况列表数据
        for (let i = 0; i < data.table_num; i++) { 
          let a = {
            'city':data.table_city[i],
            'confirmAdd':data.table_confirmAdd[i],
            'date':data.table_date[i],
            'grade':data.table_grade[i],
            'nowConfirm':data.table_nowConfirm[i],
            'province':data.table_province[i]
          }
          state.tabledata.push(a)
       
        }
        console.log(state.tabledata)
        
      })

      //详细概况
      await a.$myRequest({ url: "/data/chinaMore", method: "GET" }).then((res) => { 
        let da = res.data
        for (let index = 0; index < da.noinfect.length; index++) {
          state.noinfect.time.push(da.time[index])
          state.noinfect.noinfectadd.push(da.noinfect[index])
        }
      })
      //top概况
      await a.$myRequest({ url: "/data/world-top10", method: "GET" }).then((res) => { 
        let da = res.data
        for (let index = 0; index < da.confirm_name.length; index++) {
          state.worldtop.name.push(da.confirm_name[index])
          state.worldtop.comfirm.push(da.confirm_value[index])
          state.worldtop.dead.push(da.dead_value[index])
          state.worldtop.heal.push(da.heal_value[index])
        }
      })
      //中国预测数据
      await a.$myRequest({ url: "/data/china-yc", method: "GET" }).then((res) => {
        for (let index = 0; index < res.data.time.length; index++) {
          let time=res.data.time[index].substring(0,4)+"-"+res.data.time[index].substring(4,6)+"-"+res.data.time[index].substring(6,8)
            state.chinapredict.time.push(time)
            state.chinapredict.comfirm.push(res.data.yc_confirm[index])
            state.chinapredict.heal.push(res.data.yc_heal[index])
            state.chinapredict.dead.push( res.data.yc_dead[index])
            
          }
          state.chinapredict.begintime= res.data.time_begin5.substring(0,4)+"-"+res.data.time_begin5.substring(4,6)+"-"+res.data.time_begin5.substring(6,8)
          state.chinapredict.endtime= res.data.time_end5.substring(0,4)+"-"+res.data.time_end5.substring(4,6)+"-"+res.data.time_end5.substring(6,8)
       
      })
      //世界预测数据
      await a.$myRequest({ url: "/data/world-yc", method: "GET" }).then((res) => {
        for (let index = 0; index < res.data.time.length; index++) {
          let time=res.data.time[index].substring(0,4)+"-"+res.data.time[index].substring(4,6)+"-"+res.data.time[index].substring(6,8)
            state.worldpredict.time.push(time)
            state.worldpredict.comfirm.push(res.data.yc_confirm[index])
            state.worldpredict.heal.push(res.data.yc_heal[index])
            state.worldpredict.dead.push( res.data.yc_dead[index])
            
          }
          state.worldpredict.begintime= res.data.time_begin5.substring(0,4)+"-"+res.data.time_begin5.substring(4,6)+"-"+res.data.time_begin5.substring(6,8)
          state.worldpredict.endtime= res.data.time_end5.substring(0,4)+"-"+res.data.time_end5.substring(4,6)+"-"+res.data.time_end5.substring(6,8)
       
      })
      //世界数据
      await a.$myRequest({ url: "/data/world", method: "GET" }).then((res) => {
        let data = res.data
        state.world_sum_confirm=data.sum_comfirm
        state.world_sum_dead=data.sum_dead
        state.world_sum_heal = data.sum_heal
        state.world_nowconfirm=data.sum_comfirm-data.sum_dead-data.sum_heal
        for (let index = 0; index < data.contry.length; index++) {
          let da = {
            "name": data.contry[index],
            "value":data.nowconfirm[index],
          }
          state.worldmap.push(da)
        }
        for (let i = 0; i < data.time.length; i++) {
          let time=res.data.time[i].substring(0,4)+"-"+res.data.time[i].substring(4,6)+"-"+res.data.time[i].substring(6,8)
           
          state.world.time.push(time),
          state.world.time_confirm.push(data.time_confirm[i]),
          state.world.time_dead.push(data.time_dead[i]),
          state.world.time_heal.push(data.time_heal[i]),
          state.world.  time_newaddconfirm.push(data.time_newaddconfirm[i]),
          state.world.time_newadddead.push(data.time_newadddead[i]),
          state.world.time_newaddheal.push(data.time_newaddheal[i])
        }
     
      })
      console.log(  state.worldmap)
      a.$router.push("/china/index")
    }
  },
  actions: {
  },
  modules: {
  }
})
