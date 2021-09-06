<template>
	<div class="runclock-item">
		<div class="container">
			<el-row>
				<div class="left-seconds">
					{{ description }}
				</div>
				<div class="buttons">
					<el-button
						type="normal"
						icon="el-icon-caret-right"
						circle
						v-if="runclock.status == 'wait'"
						@click="start()"
					></el-button>
					<el-button
						type="normal"
						icon="el-icon-refresh-left"
						circle
						v-if="runclock.status == 'run'"
						@click="reset()"
					></el-button>
				</div>
			</el-row>
		</div>
	</div>
</template>
<script>
import moment from "moment"
import { mapState } from "vuex"
export default {
	computed: mapState({
		runclock(state) {
			return state.clock.runclock
		},
		description(state) {
			let duration = moment.duration({
				seconds: state.clock.runclock.leftSeconds,
			})
			return (
				(duration.minutes() < 10 ? "0" : "") +
				duration.minutes() +
				":" +
				(duration.seconds() < 10 ? "0" : "") +
				duration.seconds()
			)
		},
	}),
	methods: {
		start() {
			this.$store.dispatch("CLOCK_START")
		},
		reset() {
			this.$store.dispatch("CLOCK_RESET")
		},
	},
}
</script>
<style lang="scss" scoped>
.runclock-item {
	margin: 10px;
	border: 1px solid #f2f2f2;
	background-color: #f2f2f2;
	border-radius: 20px;
	display: block;
	width: 200px;
	height: 200px;
	float: left;

	.container {
		padding: 25px;
		text-align: center;

		.left-seconds {
			font-size: 52px;
			font-family: Arial, Helvetica, sans-serif;
			color: rgb(27, 170, 9);
			margin: 15px 0 25px 0;
		}
	}
}
</style>
