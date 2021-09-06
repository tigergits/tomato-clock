<template>
	<el-scrollbar class="clocklist-view scroll-page">
		<div class="clock-list">
			<runclock-item v-if="$route.params.day == 'today'" />
			<clock-item v-for="(clock, index) in clocks" :key="index" :clock="clock" />
		</div>
	</el-scrollbar>
</template>
<script>
import moment from "moment"
import ClockItem from "./components/ClockItem"
import RunclockItem from "./components/RunclockItem"
import { mapState } from "vuex"
export default {
	props: {
		day: {
			type: String,
			default: "today",
		},
	},
	components: {
		ClockItem,
		RunclockItem,
	},
	created() {
		this.fillData()
	},
	computed: mapState({
		clocks(state) {
			return state.clock.clocklist.clocks
		},
	}),
	methods: {
		fillData() {
			let that = this
			let day = moment().format("YYYY-MM-DD")
			if (this.$route.params.day == "yesterday") {
				day = moment()
					.subtract(1, "days")
					.format("YYYY-MM-DD")
			}

			this.$store.dispatch("CLOCK_LOAD_LIST", day)
		},
	},
	watch: {
		$route(to, from) {
			this.fillData()
		},
	},
}
</script>
<style lang="scss" scoped>
.scroll-page {
	width:100%;
	overflow: hidden;
	/deep/ .el-scrollbar__wrap {
		overflow-x: hidden;
	}
}

.clocklist-view {
	overflow: hidden;
	.clock-list {
		margin: 0;
		&:last-child {
			margin-bottom: 0;
		}
	}
}
</style>
