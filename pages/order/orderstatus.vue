<template>
	<view class="content">
		<view class="status_bar">
			  <!-- 这里是状态栏 -->
		</view>
		<view style="background-color: #FFFFFF; padding: 5px 10px 5px 5px;"> 
			<ul class="head">
				<li><img style="width: 20px; height: 20px; margin-top: 12upx;" src="./orderImg/back.png" @click="backbeforepage" alt=""></li>
				<li>订单详情</li>
				<li><img @click="toSearchOrder" class="order_search" src="./orderImg/search.png" alt=""> </li>
			</ul>
		</view>
		<view style="background-color: #FFFFFF;	">
			<uni-segmented-control
			 :current="current" 
			 :orderstatus="orderstatus"
			 :values="items" 
			 @clickItem="onClickItem" 
			 style-type="text"  
			 active-color="#ff0000">
			 </uni-segmented-control>  
		</view>
		<view v-if="refreshOrderJoinAddressData!==undefined" class="order_status_sort">
			<view v-if="current==0||current == 1 || current ==3 " class="waiting_confirm">
			 	<view v-for="item in refreshOrderJoinAddressData" :key="item.id" class="total_order">
			 		<view class="order_one_header">
						<ul>
							<li><img src="../../static/goods_logo.png" alt=""></li>
							<li></li>
							<li></li>
							<li>{{item.status==undefined||null? '×'+item.number+'件':item.status}}</li>
						</ul>
					</view>
					<view class="product_totalMessage">
						<ul>
							<li><img style="width: 90px; height: 70px;" :src="item.photo!==''?item.photo : '../../static/loadfailed.gif'" alt=""></li>
							<li style="width: 200px;">订单编号：{{item.id}}</li> 
							<li style="color: #FF5500;">{{item.name}}</li> 
							<li>{{item.orderTime | datefmt}}</li>
							<li>{{item.addresses}}</li>
							<li style="color: #FF5500;">小计:{{item.total}}</li>
							<li><button v-if="item.status=='待接单'" @click="gotGoods(item.id)" class="mini-btn" size="mini">待接单</button></li>
						</ul>
					</view>
			 	</view>
			 </view>
			 <!-- 评价栏目 -->
			 <view v-if="current== 2" class="order_commont">
				 <view class="comment_total">
					<view class="comment_header">
						<ul>
							<li :style="{ fontWeight:index == commentIndex ? 'bolder' : '' }" @click="iscommentIndex(refreshOrderJoinAddressData[0].status=='已完成' ? refreshOrderJoinAddressData : refreshOrderJoinAddressData ,index)" :class="[index==commentIndex ? 'st':'']" v-for=" (myitem,index) in ordercommentItem" :key="myitem">
								{{myitem}}
							</li>
						</ul>
					</view>
					<!-- 待评价里面的全部评价和已评价 -->
					<view style="margin-top: 10px;" v-for="(myitem1,index) in allContent" :key="myitem1.orderTime" v-if="commentIndex==0">
						<ul class="orderdescription">
							<li>
								<img style="width: 80px; height: 80px; border-radius: 10px;" :src="myitem1.photo==null ? '../../static/loadfailed.gif': myitem1.photo" alt="">
							</li>
							<li>单号:{{myitem1.id}}</li>
							<li>
								<button  :class="[myitem1.iscontent==true?'description_style1':'description_style']"  size="mini">{{myitem1.iscontent==true?'已评价':'未评价'}}</button>
							</li>
						</ul>
					</view>
					<view v-for="myitem2 in refreshCommentOfVoidData.length !==0 ? refreshCommentOfVoidData : []" :key="myitem2.orderId"  style="margin-top: 10px;">
						<ul v-if="commentIndex==1" class="orderdescription1">
							<li>
								<img style="width: 60px; height: 60px; border-radius: 10px;" src="../../static/loadfailed.gif" alt="">
							</li>
							<li>{{myitem2.orderId}}</li>
							<li style="font-weight: bolder; font-size: 20px;" @click="lookmore()">...</li>
							<li>
								<p style="float: left; line-height: .3em;">评分</p>
								<uni-rate disabled="true" size="16" active-color="#f40e30" margin="6" color="#9c9c9c" value="2"></uni-rate>
							</li>
							 <li><text>{{myitem2.content == undefined ? '客户没有评价服务' : myitem2.content }}</text></li>
						</ul>
					</view>
				 </view>
			 </view>
		</view>
		<view v-else>
			<p class="without_order">您还没有新的订单哦!</p>
		</view>
	</view>
</template>
<script>
	import { mapState, mapActions, mapGetters , mapMutations } from 'vuex'
	import uniNavBar from "@/components/uni-nav-bar/uni-nav-bar.vue"
	import uniSegmentedControl from "@/components/uni-segmented-control/uni-segmented-control.vue"
	import uniRate from "@/components/uni-rate/uni-rate.vue"
	import { mixStatus } from '../../store/modules/mix.js'
	export default{
		mixins:[mixStatus],
		components: {
			uniNavBar,
			uniSegmentedControl,
			uniRate
		},
		data(){
			return {
				items: ['待接单','已完成','服务评价','全部订单'],
				current: 0,
				orderstatus:0,
				ordercommentItem:['全部评价','已评价'],
				commentIndex:0
			}
		},
		computed:{
			...mapState('login',['currentWaiterOrder','refreshCommentOfVoidData','allContent','searchOrderData','refreshOrderJoinAddressData'])
		},
		onLoad(val) {
			if(val.item!==undefined && val.item!==null &&val.item!==""){
				let newval = JSON.parse(val.item)
				this.orderstatus = newval.index
				this.findAllOrder(newval.name)
			}
		},
		created() {
			this.allrefreshtoken()
			this.loadIndex()
		},
		methods:{
			...mapActions('login',['findAllOrder','serviceComplete','findAllComments','searchOrderHandler']),
			// 让传来的数值变为number，否则传值错误 2.刚加载页面默认让currentIndex为0
			loadIndex(){
				let index = Number(this.orderstatus)
				this.current = index
				if(this.orderstatus == undefined){
					this.current = 0
				}
			},
			onClickItem(e) {
				let status;
				if (this.current !== e.currentIndex) {
					this.current = e.currentIndex;
				}
				if(e.currentIndex == 0){
					status = '待接单'
					this.findAllOrder(status)
				}else if(e.currentIndex == 1){
					status = '已完成'
					this.findAllOrder(status)
				}else if(e.currentIndex == 2){
					this.findAllOrder('已完成')
				}else{
					this.findAllOrder()
				}
			},
			gotGoods(id){
				this.serviceComplete(id)
				.then(()=>{
					this.findAllOrder("待接单")
					uni.showToast({
						title:'确认成功'
					})
					setTimeout(()=>{
						uni.hideToast()
					},1300)
				})
			},
			// 待评价下面的两个节点
			iscommentIndex(myitem,index){
				this.commentIndex = index
				if(index==0){
					this.findAllComments(myitem)
				}else{
					// 这里把已完成的订单项传过去
					this.findAllComments(myitem)
				}
			},
			// 搜索订单
			toSearchOrder(e){
				uni.navigateTo({
					url:"./searchorder"
				})
			},
			// 返回
			backbeforepage(){
				uni.switchTab({
					url:'../index/index'
				})
			}
		}
	}
</script>
<style>
	.content{
		background-color: #e6e6e6;
		padding-bottom: 10px;
	}
	.head{
		margin: 0;
		padding: 0;
		list-style: none;
	}
	.head>li{
		float: left;
		margin-left: 10px;
	}
	.head>li:nth-child(3){
		float: right;
		/* margin-left: 10px; */
	}
	.head::after{
		content: "";
		display: block;
		clear: both;
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
		/* float: right;
		margin-top: 6px;
		position: absolute; 
		top:55px; 
		right: 0;
		margin-right: 10px; */
	}
	.without_order{
		width: 300px; 
		height: 150px; 
		position: absolute; 
		left: 45%; 
		margin-left: -55px; 
		top:45%; 
		margin-top: -75px;
	}
	.order_status_sort{
		background-color: #ffffff;
		border-radius: 10px;
		
	}
	.status_bar {
	    height: var(--status-bar-height);
	    width: 100%;
	}
	.total_order{
		margin-top: 10px;
		padding-bottom: 10px;
		border-bottom: 1px solid #f2f2f2;
	}
	.waiting_confirm{
		padding: 0 10px 10px 10px;
		margin-top: 10px;
		background-color: #FFFFFF;
		border-radius: 10px;
	}
	.order_one_header{
		line-height: 1.7em;
	}
	ul{
		list-style: none;
		margin: 0;
		padding: 0;
	}
	ul::after{
		content: "";
		display: block;
		clear: both;
	}
	.comment_total{
		padding: 10px;
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
		font-size: 15px;
		line-height: 2em;
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
	}
	.product_totalMessage>ul>li:nth-child(3){
		text-align: right;
	}
	.product_totalMessage>ul>li:nth-child(4){
		float: left;
		margin-left: 10px;
	}
	.product_totalMessage>ul>li:nth-child(5){
		float: right;
	}
	.product_totalMessage>ul>li:nth-child(6){
		clear: both;
		float: right;
	}
	.mini-btn{
		border-radius: 25px;
		color:#ff5500 ;
		border: 1px solid #ff5500;
	}
	.order_commont{
		margin-top: 10px;
	}
	.comment_header{
		margin: 0;
		padding: 0;
	}
	.comment_header>ul>li{
		width: 50%;
		float: left;
		text-align: center;
		font-size: 14px;
	}
	.comment_header>ul>li:last-child{
		width: 50%;
	}
	.st::after{
		content:"___";
		font-weight: bolder;
		color: red;
		display: block;
		clear: both;
	}
	.description_style{
		/* border: 1px solid #FF0000; */
		/* background-color: #FF0000; */
		border-radius: 20px;
		color: #FF0000;
	}
	.description_style1{
		/* border: 1px solid #c2c2c2; */
		color: #FFFFFF;
		background-color: #FF0000;
		border-radius: 20px;
	}
	.orderdescription{
		margin-top: 15px;
		font-size: 14px;
	}
	
	.orderdescription>li:nth-child(1){
		float: left;
		width: 80px;
		height: 80px;
		border-radius: 10px;
	}
	.orderdescription>li:nth-child(2){
		margin-left: 90px;
	}
	.orderdescription>li:nth-child(3){
		float: right;
		padding-top: 30px;
	}
	
	.orderdescription1{
		font-size: 13px;
	}
	.orderdescription1>li:nth-child(1){
		width: 60px;
		height: 60px;
		border-radius: 10px;
		float: left;
	}
	.orderdescription1>li:nth-child(2){
		color: #969696;
		float: left;
		margin-left: 10px;
	}
	.orderdescription1>li:nth-child(3){
		color: #969696;
		text-align: right;
	}
	.orderdescription1>li:nth-child(4){
		margin-left: 70px;
		margin: 10px 0 30px 70px;
	}
</style>