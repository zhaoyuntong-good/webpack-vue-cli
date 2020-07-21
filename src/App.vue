<template>
	<div id="container">
		<h1>{{initData}}</h1>
		<el-button type="primary">主要按钮</el-button>
		<!-- <img :src="./assets/imgs/files.png"> -->
		<div class="img"></div>
	</div>
</template>

<script>
	export default {
		data(){
			return {
				initData: '搭建成功',
				src: require('./assets/imgs/files.png')
			}
		}
	}
</script>

<style scoped>
	#container {
		color: red;
		display: block;
	}
	.img {
		width: 30px;
		height: 30px;
		background-image: url('./assets/imgs/files.png');
	}
</style>