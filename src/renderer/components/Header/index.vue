<template>
	<div class="header-view" :style="{ height: height }">
		<div class="left flex-c-l">
			<div>Tomato Clock</div>
		</div>
		<div class="right">
			<el-button @click="minimize" class="no-drag" size="mini" type="text">
				<i class="btn el-icon-minus"></i>
			</el-button>
			<el-button @click="close" class="no-drag hover-color" size="mini" type="text">
				<i class="btn el-icon-close"></i>
			</el-button>
		</div>
	</div>
</template>

<script>
const { BrowserWindow } = require("electron")
export default {
	props: {
		height: {
			type: String,
			default: "40px",
		},
	},
	methods: {
		close() {
			this.$confirm("Are you sure you want to quit?", "Confirm!", {
				confirmButtonText: "Yes",
				cancelButtonText: "Cancel",
				type: "warning",
			})
				.then(() => {
					this.$electron.ipcRenderer.send("close")
				})
				.catch(() => {})
		},
		minimize() {
			this.$electron.ipcRenderer.send("minimize")
		},
	},
}
</script>

<style lang="scss" scoped>
.header-view {
	display: flex;
	align-items: center;
	justify-content: space-between;
	/deep/ .left {
		.btn {
			font-size: 17px;
			color: #999;
		}
		.btn:hover {
			color: #31c27c;
		}
		.el-icon-refresh {
			color: #333;
		}
		.search {
			margin-left: 15px;
			width: 200px;
			.el-input__inner {
				border: none;
				border-radius: 30px;
				background: #e9e9e9;
				color: #8c8c8c;
			}
		}
	}
	.right {
		.btn {
			font-size: 17px;
			color: #333;
		}
		.btn:hover {
			color: #31c27c;
		}
	}
}
</style>
