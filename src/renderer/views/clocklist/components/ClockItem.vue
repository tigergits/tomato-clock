<template>
	<div class="clock-item">
		<div class="container">
			<el-button
				type="success"
				icon="el-icon-check"
				style="font-size:50px; margin:15px 0 0 0;"
				circle
			></el-button>
			<div class="startTime">{{ startTime }}</div>
		</div>
	</div>
</template>
<script>
import moment from "moment"
export default {
	props: {
		clock: Object,
	},
	computed: {
		startTime() {
			if (!this.clock) return
			return moment(this.clock.day + " " + this.clock.startTime).format("HH:mm")
		},
	},
}
</script>
<style lang="scss">
.clock-item {
	margin: 10px;
	border: 1px solid #f2f2f2;
	background-color: #cccccc;
	border-radius: 20px;
	display: block;
	width: 200px;
	height: 200px;
	float: left;

	.container {
		padding: 25px;
		text-align: center;
		color: #0dad08;

		.startTime {
			margin: 20px 0;
			font-size: 20px;
			font-family: Arial, Helvetica, sans-serif;
			color: #333333;
		}
	}
}
</style>
