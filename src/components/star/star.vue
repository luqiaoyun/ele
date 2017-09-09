<template>
	<div class="star">
	<span :class="starSize">
		<span v-for="(starType,key) in Stars"  :class="Stars[key]" class="starItem" ></span>
		</span>
	</div>
</template>
<script>
	var i=0;
	export default{
		props:['size','score'],
		computed:{
			starSize(){
				return 'star'+this.size;
			},
			Stars(){
				var results=[];
				for(var i=0;i<Math.floor(this.score);i++){
				results.push('on');
				}
				if((this.score*2 % 2)==1){
					results.push('half');
				}
				while(results.length<5){
				results.push('off');
				}
				return results;
			}

		}
			
	}
</script>
<style lang="less" rel="stylesheet/less">
	@import url('./../../common/less/minxin.less');
	.star{
		text-align: center;
		.star24{
			display: inline-block;
			.starItem{
				display: inline-block;
				width:12px;
				height:12px;
				background-size: 12px 12px;
				background-repeat: no-repeat;
			}
			.on{
				.bg-image("./../../components/star/star24_on");
			}
			.half{
				.bg-image("./../../components/star/star24_half");
			}
			.off{
				.bg-image("./../../components/star/star24_off");
			}
		}

		.star36{
			display: inline-block;
			.starItem{
				display: inline-block;
				width:18px;
				height:18px;
				background-size: 18px 18px;
				background-repeat: no-repeat;
			}
			.on{
				font-size:40px;
				.bg-image("./../../components/star/star36_on");
			}
			.half{
				.bg-image("../../components/star/star36_half");
			}
			.off{
				font-size:40px;
				.bg-image("./../../components/star/star36_off");
			}
		}
		.star48{
			display: inline-block;
			.starItem{
				display: inline-block;
				width:24px;
				height:24px;
				background-size: 24px 24px;
				background-repeat: no-repeat;
			}
			.on{
				font-size:40px;
				.bg-image("./../../components/star/star48_on");
			}
			.half{
				font-size:40px;
				.bg-image("./../../components/star/star48_half");
			}
			.off{
				.bg-image("../../components/star/star48_off");
			}							
		}
	}
						

</style>