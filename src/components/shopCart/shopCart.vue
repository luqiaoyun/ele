<template>
	<div class="shopCart">
		<div class="content_wrapper">
			<div class="content_left">
				<div class="logo_wrap" @click="show()">
					<div class="logo" :class="{light:totalCount>0}">
						<span class="icon-shopping_cart" :class="{light:totalCount}"></span>
					</div>
					<div class="count" v-if="totalCount>0">
						<span class="text">{{totalCount}}</span>
					</div>
				</div>
				<div class="price">
					<span class="text" :class="{light:totalPrice>0}">￥{{totalPrice}}</span>
				</div>
				<div class="delivery">
					<span class="text">另需配送费￥{{seller.deliveryPrice}}元</span>
				</div>
			</div>
			<div class="content_right" :class="{light:totalPrice>=seller.minPrice}">
				<span class="text" :class="{light:totalPrice>=seller.minPrice}">{{description}}</span>
			</div>
		</div>
		<transition name="toggle">
			<div class="details_wrapper" v-show="flag">
			<div class="title">
				<span class="name">购物车</span>
				<span class="clear" @click="clear()">清空</span>
			</div>
			<div class="content" ref="list">
					<ul>
						<li v-for="selectFood in selectFoods" class=" food border-1px">
							<span class="name">{{selectFood.name}}</span>
							<div class="price">
								<span class="text">￥</span>
								<span class="count">{{selectFood.count*selectFood.price}}</span>
							</div>
							<div class="cartControl_wrapper">
								<cartControl :food="selectFood"></cartControl>
							</div>
						</li>
					</ul>
				</div>	
			</div>
		</transition>
		<transition name="mask">
			<div class="mask" v-show="flag" @click="show()"></div>
		</transition>
		<div class="ball_wrapper">
			<div class="ball">
				<div class="inner"></div>
			</div>
		</div>
	</div>
</template>
	
<script>
	import cartControl from './../cartControl/cartControl.vue';
	import BScroll from 'better-scroll';
	import Vue from 'Vue';
	export default{
		data(){
			return{
				flag:false,
			}
		},
		props: {
  			seller: {
  				type: Object,
  				default(){
  					return [];
  				}
  			},
  			selectFoods:{
  				type:Array, 
  			}
 		},
 		components:{
 			cartControl,
 		},
 		computed:{
 			 totalCount() {
        		let count = 0;
        		this.selectFoods.forEach((food) => {
          		count += food.count;
        		});
        		return count;
      		},
 			totalPrice(){
 				let price=0;
 				for(var i=0;i<this.selectFoods.length;i++){
 					price=price+this.selectFoods[i].price*this.selectFoods[i].count;
 				}
 				return price;
 			},
 			description(){
 				if(this.totalPrice===0){
 					return "￥"+this.seller.minPrice+"起送";
 				}else if(this.totalPrice<this.seller.minPrice){
 					let price=this.seller.minPrice-this.totalPrice;
 					return "￥还差"+price+"元起送";

 				}else{
 					return "去结算";
 				}
 			},
 		},
 		methods:{
 			show(){

 				this.$nextTick(()=>{
 					let details_list=new BScroll(this.$refs.list,{
 					probeType:3,click:true
 					})
 				})
 				if(this.totalCount==0){
 					this.flag=false;
 					return;

 				}
 				this.flag=!this.flag;
 			},
 			clear(){
 				for(let i=0;i<this.selectFoods.length;i++){
 					Vue.delete(this.selectFoods[i],"count")
 				}
 			}
 		}

 		
	}
</script>
<style lang="less" rel="stylesheet/less">
	@import url('./../../common/less/minxin.less');
	@import url('./../../common/less/base.less');
	.shopCart{
			position:fixed;
			bottom: 0;
			left:0;
			width:100%;
			height:48px;
			z-index: 50;
			background-color: #141d27;
			.content_wrapper{
				display: flex;
				.content_left{
					flex:1;
					.logo_wrap{
						display: inline-block;
						position: relative;
						top:-10px;
						width:56px;
						height:56px;
						border-radius: 50%;
						padding:6px;
						margin:0 18px 8px 18px;
						box-sizing: border-box;
						background-color: rgb(43,51,59);
						.logo{
							width:100%;
							height:100%;
							border-radius: 50%;
							background-color:rgba(128,133,138,0.5);
							text-align: center;
							&.light{
								background-color: rgb(0,160,220);
							}
							.icon-shopping_cart{
								display: inline-block;
								font-size:24px;
								color: rgba(255,255,255,0.4);
								line-height: 44px;
								&.light{
									color:rgb(255,255,255);
								}	
							}
						}
						.count{
							position: absolute;
							top:0;
							right:0;
							width:24px;
							background-color: rgb(240,20,20);
							border-radius: 6px;
							box-shadow: 0 4px 8px 0 rgba(0,0,0,0.4);
							text-align: center;
							.text{
								font-size:8px;
								line-height:16px;
								color:rgb(255,255,255);
								font-weight: 700;
							}
						}
					}
					.price{
						display: inline-block;
						padding:12px 12px 12px 0;
						vertical-align: top;
						border-right: 1px solid rgba(255,255,255,0.1);				
						.text{
							font-size:16px;
							line-height:24px;
							font-weight: 700;
							color:rgba(255,255,255,0.4);
							&.light{
								color:rgb(255,255,255);
							}

						}
					}
					.delivery{
						display:inline-block;
						padding:14px 12px ;
						height:100%;
						vertical-align: top;
						.text{
							font-size:12px;
							line-height:24px;
							font-weight: 700;
							color:rgba(255,255,255,0.4);

						}
					}
				}
				.content_right{
					flex:0 0 105px;
					width:105px;
					text-align: center;
					background-color:rgba(128,133,138,0.2);
					&.light{
						background-color: rgb(0,180,60);
					}
					.text{
						display:inline-block;
						padding:14px 8px;
						font-size:12px;
						line-height:24px;
						font-weight: 700;
						color:rgba(255,255,255,0.4);
						&.light{
							color: rgb(255,255,255);
					}

					}
				}
			}
			.toggle-enter,.toggle-leave-active{
				 transform: translate3d(0, 0, 0);
				 transition: all 0.1s

			}
			.toggle-enter-active,.toggle-leave{
				transition: all 0.1s

			}

			.details_wrapper{
				position: absolute;
				top:0;
				left:0;
				width:100%;
				z-index: -1;
				transform: translate3d(0,-100%,0);
				background-color: rgb(255,255,255);
				.title{
					padding:18px 18px;
					height:40px;
					background-color: #f2f5f7;
					border-bottom: 1px solid rgba(7,17,27,0.1);
					.name{
						position: relative;
						font-size:14px;
						line-height: 40px;
						font-weight: 200;
						color:rgb(7,17,27);
					}
					.clear{
						position: absolute;
						right:18px;
						font-size: 14px;
						line-height: 40px;
						color:rgb(0,1160,220);

					}
				}
				.content{
					padding:0 18px;
					max-height: 217px;
					overflow: hidden;
					.food{
						position: relative;
						padding:12px 0;
						.border-1px-bottom(rgba(7,17,27,0.1));
						.name{
							dominant-baseline: 14px;
							line-height:24px;
							color:rgb(7,17,27);
						}
						.price{
							position: absolute;
							top:12px;
							right:90px;
							.text{
								font-size: 10px;
								line-height: 24px;
								font-weight: normal;
								color:rgb(240,20,20);
							}
							.count{
								font-size: 14px;
								line-height: 24px;
								font-weight: 700;
								color:rgb(240,20,20);
							}

						}
						.cartControl_wrapper{
							position: absolute;
							right:0;
							top:12px;

						}
					}
				}
			}
			.mask-enter,.mask-leave-active{
				transition: all 0.1s;

			}
			.mask-enter-active,.mask-leave{
				transition: all 0.1s;
				background-color: rgba(7,17,27,0);
			}
			.mask{
				position: fixed;
				left:0;
				top:0;
				width:100%;
				height:100%;
				z-index: -2;
				background-color: rgba(7,17,27,0.6);
				backdrop-filter:blur(10px);
			}


		}
</style>