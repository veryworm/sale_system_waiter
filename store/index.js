import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import login from './modules/login'
// import order from './modules/order'
import waiter from './modules/waiter'
// import shopcar from './modules/shopcar'
import product from './modules/product'
// import {Categoryapi,Productapi} from "@/utiles/apiController.js"

const store = new Vuex.Store({
   state:{
	  
   },
   getters:{
	 
   },
   mutations:{
	   
   },
   actions:{
	 
   },
   modules: {
	   login,
	   product,
 //    user,
 //    order,
    waiter
    // shopcar
  }
})

export default store
