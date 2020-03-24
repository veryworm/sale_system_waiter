<template>
	<view class="content">
		<view class="status_bar">
			  <!-- 这里是状态栏 -->
		</view>
		<view style="background-color: #bcdfff; padding: 5px 10px 5px 5px;"> 
			<img style="width: 16px; height: 16px; position: absolute; top: 13px; left: 10px;" src="../../static/search.png" alt="">
			<input style="border-radius: 100px; color: #1f1f1f; background-color: #f8f8f8; padding: 5px 5px 5px 30px;" @confirm="searchOrder" placeholder="根据订单号搜索订单" type="text">
		</view>
		<!-- <view class="order_status">
			<view v-if="current==0||current ==1 || current ==2 || current ==4" class="waiting_confirm">
			 	<view v-for="item in currentCustomerOrder" :key="item.id" class="total_order">
			 		<view class="order_one_header">
						<view v-if="item.status !== '已完成' && item.status !== '待服务' && item.status !== '待评价'" class="order_detail">
							<ul>
								<li>
									<text>正在出库</text>
								</li>
								<li>
									<img  style="width: 14px; height: 14px; margin-right: 6px;" src="../../static/frieghtcar.png" alt="">
									您的订单已进入第三方卖家车库，准备出库 </br>
									<text style="color: #808080; font-size: 13px;">
										{{item.orderTime | datefmt}}
									 </text>
								 </li>
							</ul>
						</view>
						<ul>
							<li><img src="../../static/goods_logo.png" alt=""></li>
							<li></li>
							<li></li>
							<li>{{item.status}}</li>
						</ul>
					</view>
					<view class="product_totalMessage">
						<ul>
							<li><img style="width: 90px; height: 70px;" :src="item.photo?item.photo : '../../static/loadfailed.gif'" alt=""></li>
							<li>{{item.id}}</li>
							<li>{{item.orderTime | datefmt}}</li>
							<li>名字</li>
							<li>¥{{item.total}}</li>
							<li><button v-if="item.status=='待服务'" @click="gotGoods(item.id)" class="mini-btn" size="mini">确认收货</button></li>
						</ul>
					</view>
			 	</view>
			 </view>
		</view> -->
	</view>
</template>

<script>
	import { mapState, mapActions, mapGetters , mapMutations } from 'vuex'
	export default {
		data() {
			return {
				orderstatus:0,
				current: 0,
				items: ['待接单','已完成','全部订单']
			}
		},
		created() {
			this.loadIndex()
			// this.findAllOrder('待派单')
		},
		computed:{
			
		},
		onLoad(val) {
			// if(val.item!==undefined && val.item!==null &&val.item!==""){
			// 	let newval = JSON.parse(val.item)
			// 	this.orderstatus = newval.index
			// 	this.findAllOrder(newval.name)
			// }
		},
		methods: {
			...mapActions('order',['findAllOrder']),
			searchOrder(){
				
			}
		}
	}
</script>

<style>
	.content{
		padding-bottom: 10px;
	}
</style>
