<template>
	<el-scrollbar class="menu-view scroll-page">
		<div class="menu-group">
			<div class="menu-title">Tomato clock</div>
			<div
				class="menu-item"
				:class="$route.name == 'clock-list' && $route.params.day == 'today' ? 'active' : ''"
				@click="goClockList('today')"
			>
				<div class="left"><i class="iconfont icon-today"></i>Today</div>
			</div>
			<div
				class="menu-item"
				:class="$route.name == 'clock-list' && $route.params.day == 'yesterday' ? 'active' : ''"
				@click="goClockList('yesterday')"
			>
				<div class="left"><i class="iconfont icon-yesterday"></i>Yesterday</div>
			</div>
		</div>

		<div class="menu-group">
			<div class="menu-title">Report</div>
			<div class="menu-item" :class="$route.name == 'report' ? 'active' : ''" @click="goReport()">
				<div class="left"><i class="iconfont icon-table"></i>Report</div>
			</div>
			<div class="menu-item" :class="$route.name == 'chart' ? 'active' : ''" @click="goChart()">
				<div class="left"><i class="iconfont icon-bar-chart"></i>Chart</div>
			</div>
		</div>
	</el-scrollbar>
</template>

<script>
export default {
	methods: {
		goClockList(day) {
			this.$router.push({ name: "clock-list", params: { day: day } });
			console.log(this.$route);
		},
		goReport() {
			this.$router.push({ name: "report" });
		},
		goChart() {
			this.$router.push({ name: "chart" });
		},
	},
};
</script>

<style lang="scss" scoped>
.scroll-page {
	overflow: hidden;
	/deep/ .el-scrollbar__wrap {
		overflow-x: hidden;
	}
}

.menu-view {
	flex: 1;
	overflow: hidden;

	.menu-group {
		margin-bottom: 25px;
		padding: 0 20px;
		.menu-title {
			margin-bottom: 10px;
			font-size: 12px;
			padding-left: 10px;
			display: flex;
			align-items: center;
			color: #666;
			.left {
				flex: 1;
			}
			.right {
				width: 80px;
				display: flex;
				align-items: center;
				justify-content: flex-end;
				.iconfont {
					font-size: 14px;
					color: #888;
					margin-left: 10px;
				}
			}
		}
		.menu-item {
			padding: 5px 10px;
			font-size: 13px;
			border-radius: 2px;
			margin-bottom: 5px;
			cursor: pointer;
			.left {
				.iconfont {
					margin-right: 10px;
				}
				.iconfont.hot {
					color: #ff4400;
				}
			}
		}
		.menu-item:hover {
			background: #e6e7e7;
		}

		.menu-item.active {
			background: #31c27c;
			color: #fff;
		}
	}
}
</style>
