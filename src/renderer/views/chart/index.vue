<template>
	<el-scrollbar class="scroll-page">
		<div class="container">
			<div class="class-list">
				<div class="class-item-header" style="text-align:left;">Type:</div>
				<div
					class="class-item hover-bg"
					:class="{ active: index == serieActiveIndex }"
					v-for="(item, index) in series"
					:key="index"
					@click="serieClick(item, index)"
				>
					{{ item.name }}
				</div>
			</div>
			<div class="class-list">
				<div class="class-item-header" style="text-align:left;">Date:</div>
				<div
					class="class-item hover-bg"
					:class="{ active: index == durationActiveIndex }"
					v-for="(item, index) in durations"
					:key="index"
					@click="durationClick(item, index)"
				>
					{{ item.name }}
				</div>
			</div>
			<div class="class-list">
				<div class="class-item-header" style="text-align:left;">Chart:</div>
				<div
					class="class-item hover-bg"
					:class="{ active: index == chartTypeActiveIndex }"
					v-for="(item, index) in chartTypes"
					:key="index"
					@click="chartTypeActiveIndex = index"
				>
					{{ item.name }}
				</div>
			</div>

			<div v-if="!loading">
				<ve-histogram
					v-if="chartTypeActiveIndex == 0"
					:data="chartData"
					:chartExtend="chartExtend"
					class="chart"
				/>
				<ve-line :data="chartData" :chartExtend="chartExtend" class="chart" v-if="chartTypeActiveIndex == 1" />
				<ve-pie :data="chartData" :chartExtend="chartExtend" class="chart" v-if="chartTypeActiveIndex == 2" />
			</div>
		</div>
	</el-scrollbar>
</template>
<script>
import moment from "moment"
export default {
	data() {
		return {
			durations: [
				{ name: "This week", id: "thisweek" },
				{ name: "This month", id: "thismonth" },
				{ name: "All time", id: " all" },
			],
			series: [
				{ name: "Clocks", id: "count" },
				{ name: "Total minutes", id: "minutes" },
			],
			chartTypes: [
				{ name: "Bar", id: "histogram" },
				{ name: "Line", id: "line" },
				{ name: "Pie", id: " pie" },
			],
			loading: true,
			durationActiveIndex: 0,
			serieActiveIndex: 0,
			chartTypeActiveIndex: 0,
			chartData: {},
			chartExtend: {},
		}
	},
	mounted: function() {
		console.log(this.chartData)
		this.fillData()
	},
	methods: {
		fillData() {
			let days = []
			let startDay = ""
			let endDay = ""

			if (this.durationActiveIndex == 0) {
				let day = moment().isoWeekday(1)
				while (day <= moment().isoWeekday(7)) {
					let dayName = moment(day).format("D/M")
					days[dayName] = { minutes: 0, count: 0, duration: "" }
					day = day.add(1, "days")
				}

				startDay = moment()
					.isoWeekday(1)
					.format("YYYY-MM-DD")
				endDay = moment()
					.isoWeekday(7)
					.format("YYYY-MM-DD")
			}

			if (this.durationActiveIndex == 1) {
				let day = moment().startOf("month")
				while (day <= moment().endOf("month")) {
					let dayName = moment(day).format("D/M")
					days[dayName] = { minutes: 0, count: 0, duration: "" }
					day = day.add(1, "days")
				}

				startDay = moment()
					.startOf("month")
					.format("YYYY-MM-DD")
				endDay = moment()
					.endOf("month")
					.format("YYYY-MM-DD")
			}

			if (this.durationActiveIndex == 2) {
				let day = moment().subtract(180, "days")
				while (day <= moment()) {
					let dayName = moment(day).format("D/M")
					days[dayName] = { minutes: 0, count: 0, duration: "" }
					day = day.add(1, "days")
				}

				startDay = moment()
					.startOf("year")
					.format("YYYY-MM-DD")
				endDay = moment()
					.endOf("year")
					.format("YYYY-MM-DD")
			}

			let rows = []
			let that = this
			this.$db.find({ day: { $gte: startDay, $lte: endDay } }, function(error, docs) {
				if (error) return

				docs.forEach((record) => {
					let dayName = moment(record.day).format("D/M")
					days[dayName].minutes += record.minutes
					days[dayName].count++
				})

				for (var dayName in days) {
					if (that.serieActiveIndex == 0) {
						rows.push({
							Date: dayName,
							Clocks: days[dayName].count,
						})

						continue
					}

					let duration = moment.duration({ minutes: days[dayName].minutes })
					let durationText =
						(duration.hours() < 10 ? "0" + duration.hours() : duration.hours()) +
						":" +
						(duration.minutes() < 10 ? "0" + duration.minutes() : duration.minutes())

					rows.push({
						Date: dayName,
						"Total minutes": duration.hours() * 60 + duration.minutes(),
					})
				}

				console.log(rows)

				that.chartData = {
					columns: ["Date", that.serieActiveIndex == 0 ? "Clocks" : "Total minutes"],
					rows: rows,
				}
				that.loading = false
			})
		},

		serieClick(item, index) {
			this.serieActiveIndex = index
			this.fillData()
		},

		durationClick(item, index) {
			this.durationActiveIndex = index
			this.fillData()
		},
	},
}
</script>
<style lang="scss" scoped>
.scroll-page {
	width: 100%;
	.container {
		padding: 20px;

		.chart {
			width: 100%;
			height: 500px;
			margin: 15px 0;
		}
		.class-list {
			display: flex;
			padding: 5px 5px 5px 5px;
			flex-wrap: wrap;
			.class-item-header {
				width: 88px;
				background-color: white;
				margin-left: 5px;
				text-align: left;
				font-size: 12px;
				color: #333;
				line-height: 30px;
				margin-bottom: 5px;
				margin-right: 10px;
			}

			.class-item {
				width: 88px;
				background-color: white;
				margin-left: 5px;
				text-align: left;
				font-size: 12px;
				color: #555;
				line-height: 30px;
				cursor: pointer;
				margin-bottom: 5px;
				margin-right: 10px;
			}
			.class-item:hover {
				background-color: #eeeeee;
			}
			.class-item.active {
				color: #31c27c;
			}
		}
	}
}
</style>
