import {  Userapi, Orderapi, Commentapi, Productapi} from '../../utiles/apiController.js'
import { post_array, post_json, get, post} from '../../http/axios.js'
import { setToken, getToken, removeToken } from '../../utiles/auth.js'
export default {
	namespaced:true,
	state:{
		token:getToken(),
		info:{},
		// 订单分类
		ordersort1:[],
		currentWaiterOrder:[],
		refreshCommentOfVoidData:[],
		allContent:[],
		searchOrderData:[]
	},
	getters:{
		
	},
	mutations:{
		refreshInfo(state,info){
			state.info = info
		},
		refreshWaiterOrder(state,currentWaiterOrder){
			state.currentWaiterOrder = currentWaiterOrder
		},
		// 刷新
		refreshCommentOfVoid(state,refreshCommentOfVoidData){
			state.refreshCommentOfVoidData = refreshCommentOfVoidData
		},
		refreshallContent(state,allContent){
			state.allContent = allContent
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
						name:'服务评价',
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
				
				// 评价内容
				if(state.allContent!==undefined){
					let noCommentLength = state.allContent.filter((item)=>{
						return item.iscontent !== true
					}) 
					ordersort1[2].length = noCommentLength.length
				}
				
				// 全部
				ordersort1[3].length = currentAllOrder.length
				state.ordersort1 = ordersort1
			}
		},
		refreshSearchOrder(state,searchOrderData){
			state.searchOrderData = searchOrderData
		}
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
			return response.data
		},
		// 根据waiterId拿所有与之相符的订单
		async findAllOrder({commit,dispatch,rootState,state},status){
			let response = await get(Orderapi.OrderFindAll.api)
			for(let i=0;i<rootState.product.productsImg.length;i++){
				response.data[i].photo = rootState.product.productsImg[i].photo
			}
			// 过滤出与当前顾客id所有的订单
			if(status==undefined){
				let currentWaiterOrder = response.data.filter((item)=>{
					return item.waiterId == state.info.id
				})
				commit("refreshWaiterOrder",currentWaiterOrder)
				commit("refreshOrderSort",currentWaiterOrder)
			}else{
				// 过滤出与当前顾客订单状态相符的订单
				let currentWaiterOrder = response.data.filter((item)=>{
					return item.waiterId == state.info.id && item.status ==  status
				})
				
				let CommentNumber = response.data.filter((item)=>{
					return item.waiterId == state.info.id && item.status ==  "已完成"
				})
				
				await dispatch("findAllComments",CommentNumber)
				commit("refreshWaiterOrder",currentWaiterOrder)
			}
		},
		async serviceComplete({commit},id){
			let response= await get(Orderapi.OrderserviceComplete.api+id)
			return response
		},
		// 查评论
		async findAllComments({commit},myitem){
			// myitem为已完成订单项的数据
			let arr = [];
			let response = await get(Commentapi.CommentFind.api)
			// 双重遍历,第一次拿到完成订单orderId与订单评论完成的orderId, 第二次循环把通过的值push到arr里
			for(let item3 of myitem){
				let result = response.data.filter((item)=>{
					return item.orderId !== null && item.orderId == item3.id
				})
				for(let item4 of result){
					arr.push(item4)
				}
			}
			commit("refreshCommentOfVoid",arr)
			// 把已完成订单和评价完的订单的数据做一次整合
			let arr1 = []
			myitem.forEach(i => {
			    arr.forEach(j => {
			        if (i.id == j.orderId){
			            i.iscontent = true
						arr1.push(myitem)
			        }
			    })
			})
			commit("refreshallContent",arr1[0])
		},
		// 根据id搜索订单
		async searchOrderHandler({commit,dispatch},id){
			let response = await get(Orderapi.OrderFindById.api+id)
			dispatch("findProduct",response.data)
		},
		async findProduct({commit,dispatch},searchOrderData){
			let response = await get(Productapi.ProductFindAll.api)
			let arr1 = []
			// 因为搜到的数据没有产品的图片和产品的name,这里过滤出来与product的id相同的数据,然后拼接到搜到的数据中
			searchOrderData.forEach(i => {
			    response.data.forEach(j => {
			        if (i.productId == j.id){
			            i.name = j.name
						i.proto = j.photo
						arr1.push(i)
			        }
			    })
			})
			commit("refreshSearchOrder",arr1)
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