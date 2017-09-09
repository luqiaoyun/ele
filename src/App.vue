<template>
	<div id="app">
		<v-header :seller="seller"></v-header>
   		<v-tab></v-tab>
		<router-view :seller="seller"></router-view>
	</div> 
</template>

<script>
	import header from './components/header/header.vue';
	import tab from './components/tab/tab.vue';
	const ERR_OK=0;
	export default{
		components: {
			'v-header': header,
			'v-tab': tab
		},
		data(){
			return{
				seller:{}
			}
			
		},
		created(){
			this.$http.get('/api/seller').then((response)=>{
				if(response.body.errno===ERR_OK){
					this.seller=response.body.data;
				}
			})
		}
};
</script>

<style>

</style>
