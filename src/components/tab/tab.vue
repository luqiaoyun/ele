<template>
	<div class="tab color">
		<div class="item border-1px">
			<router-link to="/goods" >商品</router-link>
		</div>
		<div class="item">
			<router-link to="/ratings">评价</router-link>
		</div>
		<div class="item">
			<router-link to="/seller">商家</router-link>
		</div>
	</div>
</template>
<script>
	
</script>
<style  lang="less" rel="stylesheet/less">
	@import url('./../../common/less/minxin.less');
	@import url('./../../common/less/base.less');
	#app{
		.tab{
			width: 100%;
			height: 40px;
			line-height: 40px;
			display: flex;
			.border-1px-bottom(rgba(7,17,27,0.1));
			.border-1px-top(rgba(7,17,27,0.1));
			.item{
				flex: 1;
				text-align: center;
				a{
					display:block;
					font-size:14px;
					color:rgb(77,85,93);
					text-decoration: none;		
				}
				.router-link-active{
					color:rgb(240,20,28);
				}
				
			


			}
		}
	}
	


</style>
