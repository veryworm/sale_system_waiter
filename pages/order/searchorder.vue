<template>
	<view class="content">
		<view class="status_bar">
			  <!-- 这里是状态栏 -->
		</view>
		<view> 
			<view class="head" style="background-color: #bcdfff; padding: 5px 10px 5px 5px;">
				<view class="leftIcon">
					<img style="width: 20px; height: 20px; margin-top: 12upx;" src="./orderImg/back.png" @click="backbeforepage" alt="">
				</view>  
				<img style="width: 16px; height: 16px; position: absolute; top: 13px; left: 45px;" src="./orderImg/search.png" alt="">
				<input class="order_input" @confirm="searchOrder" placeholder="根据订单号搜索订单" type="text">
			</view>
		</view>
		<view v-if="haveOrder1" class="order_status_sort">
			 <view v-for="item in searchOrderData.length!==0?searchOrderData:[]" :key="item.id" class="waiting_confirm">
			 	<view class="order_one_header">
					<ul>
						<li><img src="../../static/goods_logo.png" alt=""></li>
						<li>{{item.name}}</li>
						<li></li>
						<li></li>
					</ul>
				</view>
				<view class="product_totalMessage">
					<ul>
						<li><img style="width: 85px; height: 70px; border-radius: 10px;" :src="item.proto" alt=""></li>
						<li>{{item.orderId}}</li>
						<li>{{item.nunmber}}</li>
						<li>{{item.name}}</li>
						<li>¥{{item.price}}</li>
					</ul>
				</view>
			 </view>
		</view>
		<view v-if="haveOrder" class="hideView">
			<p class="hideView_text">没有此订单号,请重新搜索</p>
		</view>
	</view>
</template>

<script>
	import uniNavBar from "@/components/uni-nav-bar/uni-nav-bar.vue"
	import uniSearchBar from "@/components/uni-search-bar/uni-search-bar.vue"
	import { Orderapi } from '../../utiles/apiController.js'
	import { mapState, mapActions, mapGetters , mapMutations } from 'vuex'
	export default {
		components: {
			uniNavBar,
			uniSearchBar
		},
		data(){
			return {
				pp:true,
				pp1:false
			}
		},
		computed:{
			...mapState('login',['searchOrderData']),
			haveOrder(){
				return this.pp
			},
			haveOrder1(){
				return this.pp1
			}
		},
		methods:{
			...mapActions('login',['searchOrderHandler']),
			searchOrder(e){
				this.searchOrderHandler(e.detail.value)
				.then(()=>{
					this.pp = false
					this.pp1 = true
				})
				.catch(()=>{
				    this.pp = true
					this.pp1 = false
				})
			},
			backbeforepage(){
				uni.navigateTo({
					url:'./orderstatus'
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.content{
		background-color: #F2F2F2;
		padding-bottom: 500px;
	}
	.head::after{
		content: "";
		display: block;
		clear: both;
	}
	.leftIcon{
		float: left;
		margin-right: 10px;
	}
	.pp{
		text-align: center;
	}
	.order_input{
		border-radius: 100px;
		color: #1f1f1f; 
		background-color: #f8f8f8; 
		padding: 5px 5px 5px 30px; 
		margin-left: 20px;
	}
	.order_search{
		width: 16px; 
		height: 16px; 
		float: right;
		margin-top: 6px;
		position: absolute; 
		top: 5px; 
		right: 0;
		margin-right: 10px;
	}
	.order_status_sort{
		background-color: #ffffff;
		margin-top: 10px;
	}
	.status_bar {
	    height: var(--status-bar-height);
	    width: 100%;
	}
	.waiting_confirm{
		padding: 0 10px 10px 10px;
	}
	.order_one_header{
		line-height: 1.7em;
	}
	.order_one_header>ul{
		list-style: none;
		margin: 0;
		padding: 0;
	}
	.order_one_header>ul::after{
		content: "";
		display: block;
		clear: both;
	}
	.order_one_header>ul>li{
		float: left;
		font-size: 14px;
		
	}
	.order_one_header>ul>li:nth-child(2){
		margin-left: 5px;
		font-weight: 550;
	}
	.order_one_header>ul>li:nth-child(4){
		float: right;
		margin-right: 15px;
	}
	.order_one_header>ul>li:nth-child(3){
		float: right;
	}
	.product_totalMessage>ul{
		list-style: none;
		margin: 0;
		padding: 0;
	}
	.product_totalMessage>ul::after{
		content: "";
		display: block;
		clear: both;
	}
	.product_totalMessage>ul>li{
		font-size: 14px;
	}
	.product_totalMessage>ul>li:nth-child(1){
		width: 25%;
		height: 70px;
		border-radius: 10px;
		float: left;
	}
	.product_totalMessage>ul>li:nth-child(2){
		float: left;
		margin-left: 10px;
		font-size: 12px;
	}
	.product_totalMessage>ul>li:nth-child(3){
		text-align: right;
		font-size: 12px;
	}
	.product_totalMessage>ul>li:nth-child(4){
		font-size: 14px;
		float: left;
		margin-left: 10px;
	}
	.product_totalMessage>ul>li:nth-child(5){
		float: right;
		font-size: 17px;
	}
	.hideView{
		width: 100%;
		height: 99vh;
		text-align: center;
	}
	.hideView_text{
		font-size: 16px;
	}
</style>
