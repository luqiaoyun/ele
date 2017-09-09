<template>
	<div class="cartControl">
		<div class="removeCart" v-if="food.count>0" @click.stop.prevent="removeCart()">
			<span class="icon-remove_circle_outline"></span>
		</div>
		<div class="count_wrapper" v-if="food.count>0">
			<span class="count">{{food.count}}</span>
		</div>
		<div class="addCart" @click.stop.prevent="addCart()">
			<span class="icon-add_circle"></span>
		</div>
		
		
		
	</div>
</template>
<script>
	import Vue from "Vue";
	export default{
		data(){
			return{
				count:0,
				
			}
		},
		props:{
			food:{
				type:Object,
			}
		},
		created(){
			
		},
		methods:{
			addCart(){
					if(!event._constructed){
						return
					}
					if(!this.food.count){
					Vue.set(this.food,"count",1);
					}else{
						let count=this.food.count+1;
						Vue.delete(this.food,"count")
						Vue.set(this.food,"count",count);
						
					}
				
				
			},
			removeCart(){
					if(!event._constructed){
						return
					}
					let count=this.food.count-1;
					Vue.delete(this.food,"count")
					Vue.set(this.food,"count",count);			
				
			}
		}

	}
</script>
<style lang="less" rel="stylesheet/less">
	@import url('./../../common/less/font.less');
	.cartControl{
		font-size:0;
		.removeCart{
			display: inline-block;
			.icon-remove_circle_outline{
				font-size:24px;
				line-height: 24px;
				color:rgb(0,160,220);
			}

		}
		.count_wrapper{
			display: inline-block;
			margin:0 7px;
			vertical-align: top;
			.count{
				font-size:10px;
				line-height: 24px;
				color:rgb(147,153,259);
			}
		}
		.addCart{
			display: inline-block;
			.icon-add_circle{
				font-size:24px;
				line-height: 24px;
				color:rgb(0,160,220);
			}
		}
	}
</style>