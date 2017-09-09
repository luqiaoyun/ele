<template>
	<div class="seller" ref="seller">
		<div>
			<div class="seller_wrapper">
			<div class="content">
				<div class="name">
					<span class="text">{{seller.name}}</span>
				</div>
				<div class="extra">
					<Star :score="seller.score" :size="36"></Star>
					<span class="ratingCount">({{seller.ratingCount}})</span>
					<span class="sellCount">月售{{seller.sellCount}}份</span>
				</div>
				<div class="like" @click="favorite=!favorite">
					<span class="icon-favorite" :class="{active:favorite}"></span>
					<span class="text">{{favoriteText}}</span>
			</div>
			
			</div>
			<div class="description">
				<div class="minPrice">
					<span class="text">起送价</span>
					<span class="count">{{seller.minPrice}}</span>
					<span class="unit">元</span>
				</div>
				<div class="deliveryPrice">
					<span class="text">商家配送</span>
					<span class="count">{{seller.deliveryPrice}}</span>
					<span class="unit">元</span>
				</div>
				<div class="deliveryTime"> 
					<span class="text">平均配送时间</span>
					<span class="count">{{seller.deliveryTime}}</span>
					<span class="unit">元</span>
				</div>
			</div>
			</div>
			<div class="notice_wrapper">
			<div class="title">
				<span class="text">公告与活动</span>
			</div>
			<div class="bulletin">
				{{seller.bulletin}}
			</div>
			<div class="support"  v-if="seller.supports" v-for="(val,key) in seller.supports">
				<span :class="classMap[seller.supports[key].type]" class="icon"></span>
				<span class="decription">{{seller.supports[key].description}}</span>
			</div>
			</div>
			<div class="photo_wrapper">
			<div class="title">商家实景</div>
			<div class="content" ref="photo">
				<div class="pics_wrapper" ref="pics">
					<div class="pics" v-for="pic in seller.pics" ><img :src="pic" width="120" height="90"></div>
				</div>
			</div>
			</div>
			<div class="info_wrapper" >
			<div class="title">商家信息</div>
			<div class="info" v-for="info in seller.infos">
				<span class="text">{{info}}</span>
			</div>
			</div>
			
		</div>
	</div>
</template>
<script>
import Star from './../Star/Star.vue'; 
import shopCart from './../shopCart/shopCart.vue';
import BScroll from 'better-scroll';
	export default{
		data(){
			return {
				favorite:false,
			}
		},
		props:{
			seller:{
				object:Array
			}
		},
		computed:{
			favoriteText(){
				return this.favorite?"已收藏":"收藏";
			}
		},
		created(){
			this.classMap=['iconDecrease','iconDiscount','iconSpecial','iconInvoice','iconGuarantee'];
			this.$nextTick(()=>{
						this.initScroll();
			})
		},
		components:{
			Star,
			shopCart,
		},
		methods:{
			initScroll(){
				let picWidth=120;
				let picMargin=6;
				let width=(picWidth+picMargin)*this.seller.pics.length;
				this.$refs.pics.style.width=width+'px';
				this.sellerScroll = new BScroll(this.$refs.seller,{probeType:3,click:true});
				this.photoScroll = new BScroll(this.$refs.photo,{probeType:3,click:true,scrollX: true,
                eventPassthrough: 'vertical'});
			},
		}
	};
</script>
<style lang="less" rel="stylesheet/less">
@import url('./../../common/less/minxin.less');
	.seller{
		background-color: #F3F5F7;
		border-bottom:1px solid rgba(7,17,27,0.1);
		position: absolute;
		top:182px;
		bottom:0;
		width:100%;
		overflow: hidden;
		.seller_wrapper{
			padding: 18px 18px 0 18px;
			background-color: #FFFFFF;
			.content{
				position: relative;
				padding-bottom: 18px;
				border-bottom: 1px solid rgba(7,17,27,0.1);	
				.name{
					margin-bottom: 8px;
					.text{
						font-size:14px;
						line-height: 14px;
						color:rgb(7,17,27);

					}
				}
				.extra{
					height:36px;
					.star{
						display: inline-block;
						margin-right: 8px;
						line-height: 36px;
						.starItem{
							padding-right: 10px;
						}
						&:last-child{
							padding-right: 0;
						}
					}
					.ratingCount{
						display: inline-block;
						font-size: 10px;
						line-height: 36px;
						color:rgb(77,85,93);

					}
					.sellCount{
						display: inline-block;
						margin-left:12px;
						font-size: 10px;
						line-height: 36px;
						color:rgb(77,85,93);
					}
				}
				.like{
					position:absolute;
					right:0;
					bottom:18px;
					.icon-favorite{
						display: block;
						font-size:24px;
						text-align: center;
						color:rgb(7,17,27);
						line-height: 24px;
						margin-bottom: 4px;
						&.active{
							color:rgb(240,20,20);
						}
					}
					.text{
						display: block;
						font-size:10px;
						line-height: 10px;
						color:rgb(77,85,93);
					}
				}
			}
			.description{
				padding:18px 0;
				display: flex;
				height:70px;
				.minPrice{
					flex:1;
					text-align: center;
					border-right:1px solid rgba(7,17,27,0.1);
					.text{
						display: block;
						font-size: 10px;
						line-height: 10px;
						color:rgb(147,153,159);
					}
					.count{
						display: inline-block;
						margin-top:4px;
						font-size:24px;
						line-height: 24px;
						color:rgb(7,17,27);
						font-weight: 200;
					}
					.unit{}
					text-align:center;
				}
				.deliveryPrice{
					flex:1;
					text-align:center;
					border-right:1px solid rgba(7,17,27,0.1);
					.text{
						display: block;
						font-size: 10px;
						line-height: 10px;
						color:rgb(147,153,159);
					}
					.count{
						display: inline-block;
						margin-top:4px;
						font-size:24px;
						line-height: 24px;
						color:rgb(7,17,27);
						font-weight: 200;
					}
					.unit{}

				}
				.deliveryTime{
					flex:1;
					.text{
						display: block;
						font-size: 10px;
						line-height: 10px;
						color:rgb(147,153,159);
					}
					.count{
						display: inline-block;
						text-align: center;
						margin-top:4px;
						font-size:24px;
						line-height: 24px;
						color:rgb(7,17,27);
						font-weight: 200;
					}
					.unit{}
					text-align:center;


				}
			}
		}
		.notice_wrapper{
			margin-top: 16px;
			padding:18px 18px;
			border-top: 1px solid rgba(7,17,27,0.1);
			border-bottom: rgba(7,17,27,0.1);
			background-color: #ffffff;
			.title{
				.text{
					font-size:14px;
					line-height: 14px;
					color:rgb(7,17,27);
				}

			}
			.bulletin{
				padding: 8px 12px 16px 12px;
				font-size: 12px;
				line-height: 24px;
				color:rgb(240,20,20);
				font-weight: 200;
			}
			.support{
				border-top:1px solid rgba(7,17,27,0.1);
				.icon{
					vertical-align:top;
					display:inline-block;
					margin:16px 6px 16px 12px;
					width:16px;
					height:16px;
					background-size:16px 16px;
					background-repeat:no-repeat;
					&Decrease{
						.bg-image("./../../components/header/decrease_1");
					}
					&Discount{
						.bg-image("./../../components/header/discount_1")
					}
					&Guarantee{
						.bg-image("./../../components/header/guarantee_1")
					}
					&Invoice{
						.bg-image("./../../components/header/invoice_1")
					}
					&Special{
						.bg-image("./../../components/header/special_1")
					}
				}
				.decription{
					display: inline-block;
					margin-right: 12px;
					font-size:12px;
					line-height: 48px;
					font-size:200;
					color:rgb(7,17,27);

				}
			}
		}

		.photo_wrapper{
			margin-top: 16px;
			background-color: #ffffff;
			padding:18px 0 18px 18px;
			.title{
				font-size:14px;
				line-height: 14px;
				color:rgb(7,17,27);
			}
			.content{
				margin-top: 12px;
				overflow: hidden;
				white-space: nowrap;
				.pics_wrapper{
					overflow: hidden;
					.pics{
						margin-right:6px;
						display: inline-block;

					}	
			
				}
				
			}
		}
		.info_wrapper{
			margin-top: 16px;
			background-color: #ffffff;
			padding:18px 18px;
			.title{
				font-size:14px;
				line-height: 14px;
				color:rgb(7,17,27);
			}
			.info{
				margin-top: 12px;
				padding:16px 12px;
				border-top:1px solid rgba(7,17,27,0.1);
				.text{
					font-size: 12px;
					line-height: 16px;
					color:rgb(7,17,27);
					font-weight: 200;
				}
			}
		}

	}

	
</style>