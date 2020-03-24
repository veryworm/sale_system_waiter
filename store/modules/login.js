import {  Userapi, Orderapi} from '../../utiles/apiController.js'
import { post_array, post_json, get, post} from '../../http/axios.js'
import { setToken, getToken, removeToken } from '../../utiles/auth.js'
export default {
	namespaced:true,
	state:{
		token:getToken(),
		info:{},
		// 订单分类
		ordersort1:[],
		refreshWaiterData:[]
	},
	getters:{
		
	},
	mutations:{
		refreshInfo(state,info){
			state.info = info
		},
		refreshWaiterOrder(state,refreshWaiterData){
			state.refreshWaiterData = refreshWaiterData
		},
		refreshOrderSort(state,currentAllOrder){
			if(currentAllOrder.length!==0){
				let ordersort1 = [
					// length要为一个字符串类型,否则length会未定义
					{
						name:'待接单',
						imgsrc:'../../static/waiting_pay.png',
						length:""
					},
					{
						name:'已完成',
						imgsrc:'../../static/have_finished.png',
						length:""
					},
					{
						name:'全部订单',
						imgsrc:'../../static/all_order.png',
						length:""
					}
				]
				
				// 待接单
				let watingListLength = currentAllOrder.filter((item)=>{
					return item.status == '待接单'
				})
				ordersort1[0].length = watingListLength.length
				
				// 已完成
				let haveFinishLength = currentAllOrder.filter((item)=>{
					return item.status == '已完成'
				}) 
				ordersort1[1].length = haveFinishLength.length
				console.log(ordersort1,'ss')
				
				// 全部
				ordersort1[2].length = currentAllOrder.length
				state.ordersort1 = ordersort1
			}
		}
		// refreshWaiterData(state,refreshWaiterData){
		// 	state.refreshWaiterData = refreshWaiterData
		// }
	},
	actions:{
		async Login({commit,dispatch},payload){
			let response = await post_json(Userapi.UserLogin.api,payload)
			let token = response.data.token
			setToken(token)
			await dispatch("info1",token)
		},
		// 根据token拿info
		async info1({commit,dispatch},token){
			let response = await get(Userapi.Userinfo.api,{token})
			commit("refreshInfo",response.data)
			dispatch('findAllOrder',response.data.id)
			return response.data
		},
		// 根据waiterId拿所有与之相符的订单
		async findAllOrder({commit,dispatch,rootState,state},status){
			let response = await get(Orderapi.OrderFindAll.api)
			for(let i=0;i<rootState.product.productsImg.length;i++){
				response.data[i].photo = rootState.product.productsImg[i].photo
			}
			// 过滤出与当前顾客id所有的订单
			if(typeof(status) == "number"){
				let currentAllOrder = response.data.filter((item)=>{
					// 这里的status为id
					return item.waiterId == state.info.id
				})
				commit("refreshWaiterOrder",currentAllOrder)
				// // 未评价订单数量
				// let notCommentNumber = response.data.filter((item)=>{
				// 	return item.customerId == rootState.user.info.id && item.status ==  "已完成"
				// })
				// await dispatch("findAllComments",notCommentNumber)
				commit("refreshOrderSort",currentAllOrder)
			}else{
				// 过滤出与当前顾客订单状态相符的订单
				let currentCustomerOrder = response.data.filter((item)=>{
					return item.customerId == state.info.id && item.status ==  status
				})
				commit("refreshWaiterOrder",currentCustomerOrder)
			}
		}
		
		
		// async waiterFindAll({commit,dispatch},id){
		// 	let response = await get(Customerapi.CustomerFind.api)
		// 	let newresponse = response.data.filter((item)=>{
		// 		return item.id == id
		// 	})
		// 	commit("refreshWaiterData", newresponse)
		// },
		// async logout({commit}){
		// 	await post(Userapi.UserLogout.api);
		// 	removeToken();
		// 	commit('refreshToken','');
		// 	commit('refreshInfo',{});
		// }
	}
}