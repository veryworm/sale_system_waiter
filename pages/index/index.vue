<template>
	<view class="content">
		<view class="status_bar">
			  <!-- 这里是状态栏 -->
		</view>
		<view style="background-color: #bcdfff; padding: 5px 10px 5px 5px;"> 
			<img style="width: 16px; height: 16px; position: absolute; top: 13px; left: 10px;" src="../../static/search.png" alt="">
			<input style="border-radius: 100px; color: #1f1f1f; background-color: #f8f8f8; padding: 5px 5px 5px 30px;" @confirm="searchOrder" placeholder="根据订单号搜索订单" type="text">
		</view>
		<view class="my_header">
			<view class="my_image">
				<img style="width: 60px; height:60px ; border-radius: 50%;" :src="info.avatar" alt="">
			</view>
			<view class="my_name">
				<text v-if="info.id!== undefined">
					{{info.name}}
				</text>
				<text @click="toLoginOrRegister" v-else>
					<text>登录/注册 ></text>
				</text>
			</view>
		</view>
		<view class="my_order_total">
			<ul>
				<li @click="toOrderStatus(item,index)" v-for="(item,index) in ordersort1" :key="item.name">
					<view style="position: relative; left: 80%;">
						<uni-badge :text="item.length" size="small" type="error" :inverted="false"></uni-badge>
					</view>
					<img style="width:20px; height: 20px;" :class="item.length==''||item.length=='0'?'onePadding':''" :src="item.imgsrc" alt=""> <br>
					{{item.name}}
				</li>
			</ul>
		</view>
	</view>
</template>

<script>
	import uniNavBar from "@/components/uni-nav-bar/uni-nav-bar.vue"
	import uniSearchBar from "@/components/uni-search-bar/uni-search-bar.vue"
	import uniBadge from "@/components/uni-badge/uni-badge.vue"
	import uniSegmentedControl from "@/components/uni-segmented-control/uni-segmented-control.vue"
	import { mixStatus } from '../../store/modules/mix.js'
	import { mapState, mapActions, mapGetters , mapMutations } from 'vuex'
	export default {
		mixins:[mixStatus],
		components: {
			uniNavBar,
			uniSearchBar,
			uniSegmentedControl,
			uniBadge,
		},
		data() {
			return {
				current: 0
			}
		},
		computed:{
			...mapState("login",["info","ordersort1","refreshWaiterData"])
		},
		created() {
			this.allrefreshtoken()
			this.searchProducts()
			this.findAllOrder()
		},
		onLoad() {

		},
		methods: {
			...mapActions('login',['info1','findAllOrder']),
			...mapActions('product',['searchProducts']),
			// 跳转登录
			toLoginOrRegister(){
				uni.navigateTo({
					url:"../login/login"
				})
			},
			toOrderStatus(item,index){
				item.index = index
				uni.navigateTo({
					url:'../order/orderstatus?item='+JSON.stringify(item)
				})
			},
			searchOrder(){
				
			}
		}
	}
</script>

<style>
	.content {
		background-color: #C0C0C0;
		padding-bottom: 10px;
	}
	.img1{
		width: 50px;
		height: 50px;
		background-color: #4CD964;
		border-radius: 50%;
	}
	.status_bar {
	      height: var(--status-bar-height);
	      width: 100%;
	}
	.my_header{
		padding: 5px 10px 20px 10px;
		/* background-image:url('../../static/obscureimg.jpg'); */
		background: linear-gradient(to right, rgba(183, 206, 255, 0), rgba(81, 173, 162, 1));
	}
	.my_image{
		border-radius: 50%;
		float: left;
		width: 18%;
		height: 60px;
		// background-color: #007AFF;
	}
	.my_header::after{
		content: "";
		display: block;
		clear: both;
	}
	.my_name{
		color: #FFFFFF;
		margin-left: 60px;
		font-size: 16px;
	}
	.my_order_total{
		margin-top: 10px; 
		background-color: #FFFFFF;
		padding: 5px 0 5px 0;
		border-radius: 10px;
	}
	.my_order_total>ul{
		list-style: none;
		margin: 0;
		padding: 0 0 10px 10px;
	}
	.my_order_total>ul::after{
		content: "";
		display: block;
		clear: both;
	}
	.my_order_total>ul>li{
		float: left;
		width: 18%;
		font-size: 12px;
		text-align: center;
		line-height: 1.5em;
	}
	.other_message{
		margin-top: 10px;
		background-color: #FFFFFF;
		padding: 10px;
		border-radius: 10px;
	}
	.onePadding{
		padding-top: 20px;
	}
</style>
