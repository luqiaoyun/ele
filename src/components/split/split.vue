<template>
	<div class="split .border-1px">
	</div>
	
</template>
<script>
	export default{

	}
</script>
<style lang="less" rel="stylesheet/less">
	@import url('./../../common/less/minxin.less');
	@import url('./../../common/less/base.less');
	.split{
		width:100%;
		height:16px;
		.border-1px-top(rgba(7,17,27,0.1));
		.border-1px-bottom(rgba(7,17,27,0.1));
		background-color: #f3f5f7;
	}
</style>