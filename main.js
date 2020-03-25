import Vue from 'vue'
import App from './App'
import store from './store'
import moment from 'moment'
Vue.config.productionTip = false

// 注册时间过滤器
Vue.filter('datefmt',function(val){
  if(val){
     return moment(val).format('YYYY-MM-DD HH:mm:ss')
  }
    return val;   
})

App.mpType = 'app'

const app = new Vue({
    ...App,
	store
})
app.$mount()
