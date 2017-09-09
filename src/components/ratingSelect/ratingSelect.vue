<template>
	<div class="ratingSelect">
		<div class="type boder-1px">
			<span class="all select" :class="{active:selectType===2}" @click="select(2,$event)">{{desc.all}}<span class="count">{{ratings.length}}</span></span>
			<span class="positive select" :class="{active:selectType===0}" @click="select(0,$event)">{{desc.positive}}<span class="count">{{positive.length}}</span></span>
			<span class="negative select" :class="{active:selectType===1}"@click="select(1,$event)">{{desc.negative}}<span class="count">{{negative.length}}</span></span>
		</div>
		<div class="toggle_content border-1px">
			<span class="icon-check_circle" :class="{active:onlyContent===true}"  @click="toggleContent($event)"></span>
			<span class="text">只看有内容的评价</span>
		</div>
		
	</div>
</template>
<script>
	const POSITIVE=0;
	const NEGATIVE=1;
	const ALL=2;
	export default{
		props:{
			ratings:{
				type:Array,
				default(){
					return [];
				}
			},
			onlyContent:{
				type:Boolean,
				default:true,
			},
			selectType:{
				type:Number,
				default:ALL,
			},
			desc:{
				type:Object,
				default(){
					return{
						all:"全部",
						positive:"满意",
						negative:"不满意",
					}
				}
			}
		},
		computed:{
			positive(){
				return this.ratings.filter((rating) => {
          			return rating.rateType === POSITIVE;
        		});
			},
			negative(){
				return this.ratings.filter((rating) => {
					return rating.rateType==NEGATIVE;
				})
			}

		},
		methods:{
			select(type,event){
				// if(!event._constructed){
				// 	return;
				// }
				this.$emit('selectRate',type);
			},
			toggleContent(event){
				// if(!event._constructed){
				// 	return;
				// }
				this.$emit("toggleContent");
			},
		}

	}
</script>
<style lang="less" rel="stylesheet/less">
	@import url('./../../common/less/minxin.less');
	@import url('./../../common/less/base.less');
	.ratingSelect{
		padding-top: 18px;
		.type{
			margin:0 18px;
			padding-bottom: 18px;
			font-size: 0;
			.border-1px-bottom(rgba(7,17,27,0.1));
			.select{
				display: inline-block;
				margin-right: 8px;
				padding:8px 12px;
				border-radius: 1px;
				font-size: 12px;
				line-height: 16px;
				color:rgb(77,85,93);
				&.active{
					font-size: 14px;
					color:#ffffff;
				}
				&.all{
					background-color: rgb(0,160,220);
				}
				&.positive{
					background-color: rgba(0,160,220,0.2);

				}
				&.negative{
					background-color:rgba(77,85,93,0.2);
				}
				.count{
					font-size: 8px;
				}
			}

		}
		.toggle_content{
			padding:12px 18px;
			font-size:0;
			.border-1px-bottom(rgba(7,17,27,0.1));
			.icon-check_circle{
				display: inline-block;
				vertical-align: top;
				margin-right: 4px;
				font-size:24px;
				line-height: 24px;
				color:rgb(147,153,159);
				&.active{
					color:rgb(15,234,100);
				}
			}
			.text{
				display: inline-block;
				vertical-align: top;
				font-size: 12px;
				line-height: 24px;
				color:rgb(147,153,159);
			}
		}
	}
	
</style>