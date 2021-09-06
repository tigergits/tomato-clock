<template>
	<keep-alive>
		<clock-list-view></clock-list-view>
	</keep-alive>
</template>
<script>
import ClockListView from "./clocklist/"

export default {
	components: {
		ClockListView,
	},
}
</script>
<style lang="scss" scoped></style>
