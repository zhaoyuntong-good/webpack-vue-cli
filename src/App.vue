<template>
	<div id="container">
		<h1>{{initData}}</h1>
		<el-button type="primary">主要按钮</el-button>
	</div>
</template>

<script>
	export default {
		data(){
			return {
				initData: '搭建成功'
			}
		}
	}
</script>

<style scoped>
	#container {
		color: red;
		display: block;
	}
</style>