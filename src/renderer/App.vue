<template>
	<div id="app">
		<el-container class="container" id="main">
			<el-container style="position: relative;">
				<el-aside width="230px" class="aside">
					<aside-view />
				</el-aside>
				<el-container>
					<el-header class="header" height="50px" style="-webkit-app-region: drag">
						<header-view height="50px" />
					</el-header>
					<el-main class="main">
						<router-view></router-view>
					</el-main>
				</el-container>
			</el-container>
		</el-container>
	</div>
</template>
<script>
import AsideView from "./views/aside/"
import HeaderView from "./components/Header/"

export default {
	name: "tomato-clock",
	components: {
		AsideView,
		HeaderView,
	},
}
</script>
<style lang="scss">
@import url(./assets/styles/public.scss);
body {
	padding: 0;
	margin: 0;
	-webkit-user-select: none;
	height: 800px;
	overflow: hidden;
	font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
}
.aside {
	display: flex;
	flex-direction: column;
	background: linear-gradient(to bottom, #efefef, #efefef);
}

.container {
	height: 100vh;
}

.header {
	background: #fafafa;
}

.main {
	padding: 0;
	margin: 0;
	overflow: hidden;
	display: flex;
	flex: 1;
	flex-shrink: 0;
}

.footer {
	background: #f7f7f7;
	padding: 0;
}
</style>
