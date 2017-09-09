<template>
	<div class="header">
		<div class="content_wrapper">
			<div class="avatar">
				<img :src="seller.avatar">
			</div>
			<div class="content">
				<div class="title">
					<span class="icon"></span>
					<span class="name">{{seller.name}}</span>
				</div>
				<div class="description">
					<span>{{seller.description}}/{{seller.deliveryTime}}分钟送达</span>
				</div>
				<div class="support"  v-if="seller.supports">
					<span :class="classMap[seller.supports[0].type]" class="icon"></span>
					<span class="decription">{{seller.supports[0].description}}</span>
				</div>
			</div>
			<div class="count_wrapper" v-if="seller.supports" @click="showDetails()">
				<span class="count">{{seller.supports.length}}个</span>
				<span class="icon-keyboard_arrow_right" ></span>
			</div>
		</div>
		<div class="notice_wrapper">
			<span class="icon"></span><span class="text">{{seller.bulletin}}</span>
			<span class="icon-keyboard_arrow_right"></span>
		 </div>
		 <div class="bg-image">
		 	<img :src="seller.avatar">
		 </div>
		 <div class="details" v-show="details">
		 	<div class="details_wrrapper clearfix">
		 		<div class="details_content">
		 			<div class="header">
		 				<div class="name">{{seller.name}}</div>
		 				<div class="star_wrapper">
		 					<Star :score="seller.score" :size="48"></Star>
		 				</div>
		 			</div>
		 			<div class="active">
		 				<div class="title clearfix">
		 					<div class="line"></div>
		 					<div class="name">优惠信息</div>
		 					<div class="line"></div>
		 				</div>
		 				<div class="content">
		 					<div class="support"  v-if="seller.supports" v-for="(val,key) in seller.supports">
								<span :class="classMap[seller.supports[key].type]" class="icon"></span>
								<span class="decription">{{seller.supports[key].description}}</span>
							</div>
		 				</div>
		 			</div>
		 			<div class="bulletin">
		 				<div class="title clearfix">
		 					<div class="line"></div>
		 					<div class="name">商家公告</div>
		 					<div class="line"></div>
		 				</div>
		 				<div class="content">
		 					{{seller.bulletin}}
		 				</div>
		 			</div>
		 		</div>
		 	</div>
		 	<div class="details_close" @click="hiddenDeatils()">
		 		<span class="icon-close"></span>
		 	</div>
		 	
		 </div>
	</div>
</template>
<script >
import Star from './../star/star.vue';
	export default{
		data(){
			return{
				details:false,
			}
		},
		created(){
			this.classMap=['iconDecrease','iconDiscount','iconSpecial','iconInvoice','iconGuarantee']
		},
		props:['seller'],
		methods:{
			showDetails(){
				this.details=true;
			},
			hiddenDeatils(){
				this.details=false;
			}

		},
		components:{
			Star,
		}

		
	};
</script>
<style lang="less" rel="stylesheet/less">
	
	@import url('./../../common/less/minxin.less');
	@import url('./../../common/less/font.less');

	.header{
		position: relative;
		background-color:rgba(7,17,27,0.5);
		height:142px;
		color:white;
		overflow: hidden;
		.content_wrapper{
			position: relative;
			.avatar{
				display:inline-block;
				vertical-align:top;
				padding:24px 16px 24px 18px;
				img{
					width:64px;
					height:64px;
					border-radius: 2px;

				}

			}
			.content{
				padding-top:24px;
				display:inline-block;
				
				.title{
					margin-top:2px;
					
					.icon{
						.bg-image("./../../components/header/brand");
						vertical-align: top;
						display:inline-block;
						width:30px;
						height:18px;
						background-size: 30px 18px;
						background-repeat: no-repeat;

					}
					.name{
						vertical-align: top;
						font-size:16px;
						color:rgb(255,255,255);
						font-weight:bold;
						line-height:18px;
						margin-left:6px;
					}


				}
				.description{
					margin:8px 0 10px;
					font-size:12px;
					color:rgb(255,255,255);
					font-weight:200;
					line-height:12px;

				}
				.support{
					margin-bottom: 2px;
					.icon{
						vertical-align:top;
						display:inline-block;
						margin-right: 4px;
						width:12px;
						height:12px;
						background-size:12px 12px;
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
						vertical-align:top;
						font-size:10px;
						color:rgb(255,255,255);
						font-weight:200;
						line-height:12px;

					}

				}
			}
			.count_wrapper{
				position: absolute;
				right:12px;
				top:80px;
				height:24px;
				border-radius: 15px;
				vertical-align: top;
				padding:7px 8px;
				line-height: 24px;
				vertical-align: top;
				background-color: rgba(0,0,0,0.2);
				.count{
					display: inline-block;
					margin-right:2px;
					font-size:10px;
					color:rgb(255,255,255);
					font-weight: 200;
					line-height: 12px;
				}
				.icon-keyboard_arrow_right{
					display: inline-block;
					vertical-align: top;
					margin-top: 6px;
					
				}
			}
		}
		.notice_wrapper{
			position: relative;
			width:100%;
			height:28px;
			padding:0 24px 0 12px;
			line-height: 28px;
			vertical-align: top;
			display: inline-block;
			.icon{
				display:inline-block;
				vertical-align: top;
				margin-top:8px;
				width:22px;
				height:12px;
				background-size:22px 12px;
				background-repeat: no-repeat;
				.bg-image("./../../components/header/bulletin");

			}
			 .text{
				display: inline-block;
				vertical-align: top;
				white-space: nowrap;
				overflow: hidden;
				text-overflow: ellipsis;
				width:80%;
				margin:0 4px;
				font-size:10px;
				line-height: 28px;
				font-weight: 200;
				color:rgb(255,255,255);			
			}
			.icon-keyboard_arrow_right{
				display: inline-block;
				position: absolute;
				right:50px;
				top:7px;
				 

			}

		}
		.bg-image{
			position: fixed;
			left:0;
			top:0;
			width:100%;
			height:142px;
			z-index: -1;
			filter: blur(10px);
			img{
				width:100%;
				height:142px;
			}
		}
		.details{
			background-color: rgba(7,17,27,0.8);
			width:100%;
			height:100%;
			position: fixed;
			left:0;
			top:0;
			z-index: 99;
			overflow: auto;
			.details_wrrapper{
				min-height: 100%;
				.details_content{
					overflow: auto;
					width:100%;
					height:100%;
					padding-top:64px;
					padding-bottom: 64px;
					.header{
						.name{
							text-align:center;
							font-size: 16px;
							line-height: 16px;
							font-weight: 700;
							color:rgb(255,255,255);

						}
						.star_wrapper{
							margin:20px 0 28px 0;
							.star{
								.starItem{
									padding-right: 15px;

								}
								&:last-child{
									padding-right: 0px;
								}
							}
						}
						
					}	
					.active{
						.title{
							display: flex;
							margin:0 36px 0 36px;
							.line{
							flex:1;
							width:100%;
							margin-bottom: 7px;
							border-bottom:1px solid rgba(255,255,255,0.2);
							
							}
							.name{
							flex:1;
							font-size: 14px;
							font-weight: 700;
							color:rgb(255,255,255);
							line-height: 14px;
							text-align: center;

							}
						}
						.content{
							margin:24px 48px 28px 48px;
							.support{
								&last-child{
										margin-bottom: 0;
									}
								margin-bottom: 12px;
								.icon{
									vertical-align:top;
									display:inline-block;
									padding-right: 6px;
									width:16px;
									height:16px;
									background-size:16px 16px;
									background-repeat:no-repeat;
									
									&Decrease{
										.bg-image("./../../components/header/decrease_2");

									}
									&Discount{
										.bg-image("./../../components/header/discount_2")
									}
									&Guarantee{
										.bg-image("./../../components/header/guarantee_2")
									}
									&Invoice{
										.bg-image("./../../components/header/invoice_2")
									}
									&Special{
										.bg-image("./../../components/header/special_2")
									}
								}
								.decription{
									vertical-align:top;
									font-size:12px;
									color:rgb(255,255,255);
									font-weight:200;
									line-height:16px;

								}		
							}	

						}
						
					}
					.bulletin{
						.title{
							display: flex;
							margin:0 36px 0 36px;
							.line{
								flex:1;
								width:100%;
								margin-bottom: 7px;
								border-bottom:1px solid rgba(255,255,255,0.2);
							
							}
							.name{
								flex:1;
								font-size: 14px;
								font-weight: 700;
								color:rgb(255,255,255);
								line-height: 14px;
								text-align: center;

							}
						}
						.content{
							margin:24px 48px 0 48px;
							font-size: 12px;
							line-height: 24px;
							font-weight: 200;
							color:rgb(255,255,255);
						}
					}


					
					
				}
			
				
			}
			.details_close{
				position: position;
				margin:-64px auto 0 auto;
				width:32px;
				height:32px;
				clear: both;
				font-size:32px;
				color:rgba(255,255,255,0.5);
				
			}
		}

	}
	
</style>
