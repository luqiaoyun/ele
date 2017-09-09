<template>
	<div class="food_wrapper" v-show="flag" ref="food">
		<div class="food_content">
			<div class="food_detail">
				<div class="image_wrapper">
					<img :src="food.image" class="image">
					<div class="back" @click="hide()">
						<span class="icon-arrow_lift"></span>
					</div>
				</div>
				<div class="detail_wrapper">
					<div class="name">
						<span class="text">{{food.name}}</span>
					</div>
					<div class="desc">
						<span class="count">月售{{food.sellCount}}份</span>
						<span class="rating">好评率{{food.rating}}%</span>
					</div>
					<div class="price">
						<div class="nowprice">
							<span class="text">￥</span>
							<span class="count">{{food.price}}</span>
						</div>
						<div class="oldprice" v-if="food.oldPrice">
							<span class="text">￥</span>
							<span class="count">{{food.oldPrice}}</span>
						</div>
					</div>
					<div class="cartControl_wrapper">
						<cartControl :food="food" v-if="food.count"></cartControl>
						<div class="addfirt" v-if="!food.count || food.count===0" @click="addfirt()">
							<span class="text">加入购物车</span>
						</div>
					</div>
				</div>
				<Split></Split>
				<div class="info_wrapper">
					<h2 class="title">商品介绍</h2>
					<p class="text">{{food.info}}</p>
				</div>
				<Split></Split>
				<div class="selectRate_wrapper">
					<h3 class="title">商品评价</h3>
					<ratingSelect :ratings="food.ratings" :onlyContent="onlyContent" :selectType="selectType" :desc="desc" @selectRate="selectRate" @toggleContent="toggleContent"></ratingSelect>
				</div>
				<div class="ratings_wrapper">
					<ul>
						<li class="rating boder-1px" v-for="rating in food.ratings" v-if="needShow(rating.rateType,rating.text)">
							<div class="time">
								<span class="text">{{rating.rateTime}}</span>
							</div>
							<div class="content">
								<span class="icon-thumb_up" v-if="rating.rateType===0"></span>
								<span class="icon-thumb_down" v-if="rating.rateType===1"></span>
								<p class="text">{{rating.text}}</p>
							</div>
							<div class="user">
								<span class="username">{{rating.username}}</span>
								<img :src="rating.avatar" width="12p" height="12" class="avatar">
							</div>
						</li>
					</ul>
				</div>
			</div>
		</div>
		
	</div>
</template>
<script>
	import cartControl from './../cartControl/cartControl.vue';
	import Split from './../split/split.vue';
	import Vue from "Vue";
	import BScroll from 'better-scroll';
	import ratingSelect from './../ratingSelect/ratingSelect.vue';
	const ALL=2;
	export default{
		data(){
			return {
				flag:false,
				onlyContent:false,
				selectType:ALL,
				desc:{
					all:"全部",
					positive:"推荐",
					negative:"吐槽",
				}
			}
		},
		props:{
			food:{
				type:Object,
			}
		},
		components:{
			cartControl,
			Split,
			ratingSelect,
		},
		methods:{
			initScroll(){
				this.foodScroll=new BScroll(this.$refs.food,{probeType:3,click:true})
			},
			show(){
				this.flag=true;
				this.$nextTick(()=>{
				this.initScroll();
				})
			},
			hide(){
				this.flag=false;
			},
			addfirt(){
				Vue.set(this.food,"count",1);
			},
			selectRate(type){
				this.selectType=type;
			}
			,toggleContent(){
				this.onlyContent=!this.onlyContent;
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

		},

	}
</script>
<style lang="less" rel="stylesheet/less"> 
	@import url('./../../common/less/minxin.less');
	@import url('./../../common/less/base.less');
	.food_wrapper{
		position: fixed;
		left:0;
		top:0;
		bottom:48px;
		overflow: hidden;
		z-index: 10;
		width:100%;
		background-color: rgb(255,255,255);
		.food_content{
			.food_detail{
				.image_wrapper{
					position: relative;
					width:100%;
					padding-top:100%;
					height:0;
					.image{
						position: absolute;
						left:0;
						top:0;
						width:100%;
						height:100%;

					}
					.back{
						position: absolute;
						left:10px;
						top:15px;
						.icon-arrow_lift{
							font-size: 15px;
							color:rgb(255,255,255);

						}
					}
				}
				.detail_wrapper{
					padding:18px 18px;
					position: relative;
					.name{
						.text{
							font-size:14px;
							line-height: 14px;
							font-weight: 700;
							color:rgb(7,17,27);
						}
					}
					.desc{
						margin:8px 0 18px 0;
						.count{
							display: inline-block;
							font-size:10px;
							line-height: 10px;
							color:rgb(147,153,159);
							margin-right: 12px;
						}
						.rating{
							display: inline-block;
							font-size:10px;
							line-height: 10px;
							color:rgb(147,153,159);

						}
					}
					.price{
						.nowprice{
							display: inline-block;
							margin-right: 12px;
							.text{
								font-size: 10px;
								font-weight: normal;
								line-height: 24px;
								color:rgb(240,20,20);
							}
							.count{
								font-size: 14px;
								font-weight: 700;
								line-height: 24px;
								color:rgb(240,20,20);
							}
						}
						.oldprice{
							display: inline-block;
							text-decoration: line-through;
							.text{
								font-size: 10px;
								font-weight: normal;
								line-height: 24px;
								color:rgb(147,153,159);
							}
							.count{
								font-size: 10px;
								font-weight: 700;
								line-height: 24px;
								color:rgb(147,153,159);
							}
						}

					}
					.cartControl_wrapper{
						position: absolute;
						right: 18px;
						bottom: 18px;
						.addfirt{
							padding:6px 12px;
							width:74px;
							height:24px;
							border-radius: 12px;
							background-color: rgb(0,160,220);
							text-align: center;
							.text{
								font-size: 12px;
								line-height: 24px;
								color:rgb(255,255,255);


							}
						}
					}
				}
				.info_wrapper{
					padding:18px 18px;
					.title{
						font-size:14px;
						line-height: 14px;
						font-weight: 700;
						color:rgb(7,17,27);
					}
					.text{
						margin:6px 8px 0 8px;
						font-size:12px;
						line-height:24px;
						font-weight: 200;
						color:rgb(77,85,93); 
					}
				}
				.selectRate_wrapper{
					.title{
						margin:18px 18px 0 18px;
						font-size:14px;
						line-height: 24px;
						font-weight: 700;
						color:rgb(7,17,27);
					}
				}
				.ratings_wrapper{
					padding:0 18px;
					.rating{
						position: relative;
						padding:16px 0;
						margin-bottom: 6px;
						.border-1px-top(rgba(7,17,27,0.1));
						.time{
							.text{
								font-size: 10px;
								line-height: 12px;
								color:rgb(147,153,159);
							}
						}
						.content{
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
							.text{
								display: inline-block;
								margin-left: 4px;
								font-size: 12px;
								line-height: 16px;
								color:rgb(7,17,27);
							}
						}
						.user{
							position: absolute;
							right:0;
							top:16px;
							.username{
								display: inline-block;
								vertical-align: top;
								margin-right: 6px;
								font-size: 10px;
								line-height: 12px;
								color:rgb(147,153,159);

							}
							.avatar{
								display: inline-block;
								vertical-align: top;
								border-radius: 50%;

							}
						}
					}
				}
			}
		}
	}
</style>