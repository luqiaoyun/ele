<template>
	<div class="ratings" ref="ratings">
		<div >
		<div class="sellerInfo_wrapper">
			<div class="left">
				<div class="score">{{seller.score}}</div>
				<div class="text">综合评分</div>
				<div class="rankRate">高于周边商家{{seller.rankRate}}%</div>
			</div>
			<div class="right">
				<div class="serviceScore_wrapper">
					<span class="text">服务态度</span>
					<span class="star"><Star :score="seller.serviceScore" :size="36"></Star></span>
					<span class="count">{{seller.serviceScore}}</span>
				</div>
				<div class="foodScore_wrapper">
					<span class="text">食物评分</span>
					<span class="star"><Star :score="seller.foodScore" size="36" ></Star></span>
					<span class="count">{{seller.foodScore}}</span>
				</div>
				<div class="deliveryTime_wrapper">
					<span class="text">送达时间</span>
					<span class="count">{{seller.deliveryTime}}分钟</span>
				</div>
			</div>
		</div>
		<Split></Split>
		<ratingSelect :ratings="ratings" :selectType="selectType" :onlyContent="onlyContent" @selectRate="selectRate" @toggleContent="toggleContent"></ratingSelect>
		<div class="ratings_content">
			<ul>
				<li v-for="rating in ratings" class="rating border-1px" v-if="needShow(rating.rateType,rating.text)"> 
					<img :src="rating.avatar" width="28" height="28" class="avatar">
					<span class="username">{{rating.username}}</span>
					<Star :size="36" :score="rating.score"></Star>
					<span class="deliveryTime">{{rating.deliveryTime}}分钟送达</span>
					<span class="time">{{rating.rateTime}}</span>
					<p class="text">{{rating.text}}</p>
					<div class="bottom">
						<span class="icon-thumb_up" v-if="rating.rateType===0"></span>
					<span class="icon-thumb_down" v-if="rating.rateType===1"></span>
						<span v-for="item in rating.recommend" class="recommend">{{item}}</span>
						
					</div>
					
				</li>
			</ul>
			<div></div>
		</div>
		</div>
	</div>
</template>
<script>
	import Star from './../Star/Star.vue'; 
	import Split from './../split/split.vue'; 
	import ratingSelect from './../ratingSelect/ratingSelect.vue'; 
	import BScroll from 'better-scroll';
	const ERR_OK=0;
	const ALL=2;
	export default{
		data(){
			return {
				ratings:[],
				selectType:2,
				onlyContent:true,
			}
		},
		props:{
			seller:{
				type:Object
			},
		},
		components:{
			Star,
			Split,
			ratingSelect,

		},
		computed:{
		},
		created(){
			this.$http.get('/api/ratings').then((response)=>{
				if(response.body.errno===ERR_OK){
					this.ratings=response.body.data;
					this.$nextTick(()=>{
						this.initScroll();
					})
				}
			})
		},
		methods:{
			selectRate(type){
				this.selectType=type;

			},
			toggleContent(){
				this.onlyContent=!this.onlyContent;
			},
			initScroll(){
				this.ratingsScroll = new BScroll(this.$refs.ratings,{probeType:3,click:true});
			},
			needShow(rateType,text){
				if(this.onlyContent===true && !text){
					return false;
				}
				if(this.selectType===2){
					return true;
				}
				if(this.selectType===rateType){
					return true;
				}
				
			}
		}
		
	}
</script>
<style lang="less" rel="stylesheet/less">
	@import url('./../../common/less/minxin.less');
	@import url('./../../common/less/base.less');
	.ratings{
		border-bottom:1px solid rgba(7,17,27,0.1);
		position: absolute;
		top:182px;
		bottom:0px;
		width:100%;
		overflow: hidden;
		.sellerInfo_wrapper{
			background-color: #ffffff;
			border-top: 1px solid rgba(7,17,27,0.1);
			border-bottom: 1px solid rgba(7,17,27,0.1);
			padding:18px 0;
			vertical-align: middle;
			display: flex;
			.left{
				flex:0 0 137px;
				width:137px;
				text-align: center;
				border-right: 1px solid rgba(7,17,27,0.1);
				box-sizing: border-box;
				.score{
					display: block;
					font-size:24px;
					line-height: 28px;
					color:rgb(255,153,0);
					margin-bottom: 6px;

				}
				.text{
					font-size: 12px;
					line-height: 12px;
					color:rgb(7,17,27);
					margin-bottom: 8px;
				}
				.rankRate{
					font-size: 10px;
					line-height: 10px;
					color:rgb(7,17,27);
					margin-bottom: 6px;

				}
			}
			.right{
				flex:1;
				padding:0 24px;
				box-sizing: border-box;
				.serviceScore_wrapper,.foodScore_wrapper{
					margin-bottom: 8px;
					.text{
						display: inline-block;
						vertical-align: top;
						margin-right: 12px;
						font-size: 12px;
						line-height: 18px;
						color:rgb(7,17,27);
					}
					.star{
						display: inline-block;
						vertical-align: top;
					}
					.count{
						display: inline-block;
						vertical-align: top;
						margin-left: 12px;
						font-size: 12px;
						line-height: 18px;
						color:rgb(255,153,0);
					}
				}
				.deliveryTime_wrapper{
					.text{
						display: inline-block;
						font-size:12px;
						line-height: 18px;
						color:rgb(7,17,27);
						padding-right: 12px;
					}
					.count{
						font-size: 12px;
						line-height: 18px;
						color:rgb(147,153,159);
					}
				}
			}
		}
		.ratings_content{
			.rating{
				position: relative;
				padding:18px 0;
				margin:0 18px;
				.border-1px-top(rgba(7,17,27,0.1));
				.avatar{
					position: absolute;
					top:18px;
					left:0;
					border-radius: 50%;
				}
				.username{
					display: block;
					margin-left: 40px;
					font-size:10px;
					line-height: 12px;
					color:rgb(7,17,27);
				}
				.star{
					display: inline-block;
					margin:4px 6px 6px 40px;
					text-align: left;
				}
				.deliveryTime{
					font-size:10px;
					line-height: 12px;
					font-weight: 200;
					color:rgb(147,153,159);
				}
				.time{
					position: absolute;
					top:18px;
					right:0;
					font-size:10px;
					line-height: 12px;
					font-weight: 200;
					color:rgb(147,153,159);
				}
				.text{
					margin-left: 40px;
					font-size:12px;
					line-height: 18px;
					color:rgb(7,17,27);
					margin-bottom: 8px;
				}
				.bottom{
					display: flex;
					margin-left: 40px;
					.icon-thumb_up{
						flex:0 0 12px;
						width:12px;
						font-size: 12px;
						line-height: 16px;
						color:rgb(0,160,220);
					}
					.icon-thumb_down{
						flex:0 0 12px;
						width:12px;
						font-size: 12px;
						line-height: 16px;
						color:rgb(182,187,191);
					}
					.recommend{
						flex:4 0 1;
						padding:0 6px;
						white-space: nowrap;
						overflow: hidden;
						text-overflow: ellipsis;
						margin-left: 8px;
						border:1px solid rgba(7,17,27,0.1);
						background-color: rgb(255,255,255);
						border-radius: 1px;
						font-size: 9px;
						line-height: 16px;
						color:rgb(147,153,159);
					}
				
				}
			}
		}
		
	}
	
</style>