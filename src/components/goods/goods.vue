<template>
	<div class="goods">
		<div class="menu" ref="menu">
			<ul>
				<li class="item border-1px" v-for="(item,key) in goods" :class="{'current':currentIndex===key}" @click="selectMenu(key,$event)">
					<span class="icon" v-if="item.type>-1" :class="classMap[item.type]"></span>
					<span class="text">{{item.name}}</span>
				</li>
			</ul>
		</div>
		<div class="foods" ref="foods">
			<ul>
				<li v-for='(item,key1) in goods' class="foods foodsHook">
					<div class="title">
								<h2>{{item.name}}</h2>
					</div>
					<ul>
						<li class="food border-1px" v-for="(food,key2) in item.foods" @click="selectfood(food)">
							<div class="icon">
								<img :src="food.icon" width="57" height="57">
							</div>
							<div class="content">
								<h2 class="name">{{food.name}}</h2>
								<p class="description">{{food.description}}</p>
								<div class="extra">
									<span class="count">月售{{food.sellCount}}份</span>
									<span class="rating">好评率{{food.rating}}%</span>
								</div>
								<div class="price">
									<span class="nowPrice">￥{{food.price}}</span>
									<span class="oldPrice" v-if="food.oldPrice">￥{{food.oldPrice}}</span>	
								</div>
							</div>
							<div class="cartControl_wraper">
								<cartControl :food="food"></cartControl>
							</div>
						</li>
					</ul>
				</li>
			</ul>	
		</div>
		<food ref="food" :food="selectedfood"></food>
		<shopCart :seller="seller" :selectFoods="selectFoods"></shopCart>
	</div>
</template>
<script>
	import BScroll from 'better-scroll';
	import shopCart from './../shopCart/shopCart.vue';
	import cartControl from './../cartControl/cartControl.vue';
	import food from './../food/food.vue';
	const ERR_OK=0;
	export default{
		data(){
			return{
				goods:[],
				classMap:['iconDecrease','iconDiscount','iconSpecial','iconInvoice','iconGuarantee'],
				heightList:[],
				scrollY:0,
				selectedfood:{},
				
				
			
			}
		},
		components:{
			shopCart,
			cartControl,
			food,
		},
		props:['seller'],
		created(){
			this.$http.get('/api/goods').then((response)=>{
				if(response.body.errno===ERR_OK){
					this.goods=response.body.data;
					this.$nextTick(()=>{
						this.initScroll();
						this.computeHeight();
					})
				}

			})	
			
		},
		computed:{
			currentIndex(){
				for(let i=0;i<this.heightList.length;i++){
					if( this.heightList[i+1] && this.scrollY>=this.heightList[i] && this.scrollY<this.heightList[i+1]){
						return i;
					}
				}
				return this.heightList.length-1;

			},
			selectFoods(){
				let foods=[];
				for(let i=0;i<this.goods.length;i++){
					for(let j=0;j<this.goods[i].foods.length;j++){
						if(this.goods[i].foods[j].count>0){
							foods.push(this.goods[i].foods[j]);
							//console.log(this.goods[i].foods[j].count)
						}
					}
				}

				return foods;
			}
		},
		methods:{
			initScroll(){
				this.foodsScroll = new BScroll(this.$refs.foods,{probeType:3,click:true});
				this.menuScroll=new BScroll(this.$refs.menu,{click:true});
				this.foodsScroll.on("scroll",(pos)=>{
					this.scrollY=Math.abs(Math.round(pos.y));


				})
			},
			computeHeight(){
				let foodsList=document.getElementsByClassName("foodsHook");
				let height=0;
				this.heightList.push(height);
				for(let i=0;i<foodsList.length;i++){
					height+=foodsList[i].clientHeight;
					this.heightList.push(height);
				}	
			},
			selectMenu(key,event){
				let foodsList=document.getElementsByClassName("foodsHook");
				this.foodsScroll.scrollToElement(foodsList[key], 300)
			},
			selectfood(food){
				this.selectedfood=food;
				this.$refs.food.show();
			}
		}
	};
</script>
<style lang="less" rel="stylesheet/less">
@import url('./../../common/less/minxin.less');
@import url('./../../common/less/base.less');
	.goods{
		position: absolute;
		top:182px;
		bottom:48px;
		width:100%;
		overflow: hidden;
		display: flex;
		.menu{
			flex:0 0 80px;
			background-color: #f3f5f7;
			overflow: hidden;
			.current{
				font-size: 12px;
				line-height: 14px;
				background-color: white;
				font-weight: 700;
			}
			.item{
				display:table;
				width:56px;
				height:54px;
				padding:0 12px;
				line-height:14px;
				.border-1px-bottom(rgba(7,17,27,0.1));
				.icon{
					display: inline-block;
					width:12px;
					height:12px;
					vertical-align:top;
					margin-top: 10px;
					background-size:12px 12px;
					background-repeat: no-repeat;
					&Decrease{
						.bg-image("./../../components/goods/decrease_3");

					}
					&Discount{
						.bg-image("./../../components/goods/discount_3")
					}
					&Guarantee{
						.bg-image("./../../components/goods/guarantee_3")
					}
					&Invoice{
						.bg-image("./../../components/goods/invoice_3")
					}
					&Special{
						.bg-image("./../../components/goods/special_3")
					}
				}		
					
				.text{
					display: table-cell;
					width:56px;
					font-size: 12px;
					line-height: 14px;
					font-weight: 200;
					vertical-align: middle;
					
				}


			}
			
		}
		.foods{
			flex:1;
			overflow:hidden;
			.title{
				height:28px;
				background-color: #f3f5f7;
				border-left:4px solid #d9dde1;
				padding-left: 14px;
				font-size:12px;
				line-height: 26px;
				color:rgb(147,153,159);

			}
			.food{
				display: flex;
				margin:18px 18px;
				.border-1px-bottom(rgba(7,17,27,0.1));
				.icon{
					flex:0 0 57px;
					width:57px;

				}
				.content{
					flex:1;
					margin-left:10px;
					.name{
						margin:2px 0 8px 0;
						font-size:14px;
						line-height: 14px;
						color:rgb(7,17,27);

					}
					.description{
						font-size: 10px;
						line-height:10px;
						color:rgb(147,153,159);

					}
					.extra{
						font-size: 10px;
						line-height:10px;
						color:rgb(147,153,159);
						margin-top:8px;
						.count{
							display: inline-block;
							margin-right:12px;
						}
						.rating{
							display: inline-block;
						}

					}
					.price{
						.nowPrice{
							font-size: 20px/28px;
							color:rgb(240,20,20);
							line-height: 48px;
							font-weight: normal/700;
						}
						.oldPrice{
							margin-left:8px;
							font-size: 20px;
							color:rgb(147,153,159);
							line-height: 48px;
							font-weight: normal/700;
							text-decoration: line-through;
						}

					}
					
				}
				.cartControl_wraper{
					position:absolute;
					right:0;
					bottom:12px;
				}

			}

		}
		
	}
	
</style>