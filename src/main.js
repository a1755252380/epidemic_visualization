import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import * as echarts from 'echarts'
import $ from "jquery"
Vue.prototype.$echarts = echarts
import * as echartsGL from './assets/js/echarts-gl.min' // 引入echarts
Vue.prototype.$echartsGL = echartsGL // 引入组件（将echarts注册为全局）
Vue.config.productionTip = false

Vue.use(ElementUI,$);
new Vue({

  router,
  store,
  render: h => h(App)
}).$mount('#app')
