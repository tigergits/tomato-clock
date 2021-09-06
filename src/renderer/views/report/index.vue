<template>
	<el-scrollbar class="scroll-page">
		<div class="container">
			<el-table :data="tableData" :summary-method="getSummaries" show-summary stripe>
				<el-table-column prop="Date" label="Date" sortable>
				</el-table-column>
				<el-table-column prop="Clocks" label="Clocks" sortable>
				</el-table-column>
				<el-table-column prop="Minutes" label="Minutes" sortable>
					<template slot-scope="scope">
						{{minutes_show(scope.row.Minutes)}}
					</template>
				</el-table-column>
			</el-table>
		</div>
		>
	</el-scrollbar>
</template>
<script>
import moment from "moment";

export default {
	data() {
		return {
			tableData: []
		}
	},
	mounted() {
		this.fillData();
	},
	methods: {
		fillData() {
			let startDay = moment()
				.startOf("year")
				.format("YYYY-MM-DD")
			let endDay = moment()
				.endOf("year")
				.format("YYYY-MM-DD")

			this.$db.find({day: {$gte: startDay, $lte: endDay}}).sort({day: -1}).exec((error, docs) => {
				if (error) return

				let days = [];
				docs.forEach((record) => {
					let dayName = moment(record.day).format("MMM D YYYY (ddd)")
					if (!(dayName in days)) {
						days[dayName] = {Clocks: 0, Minutes: 0};
					}

					days[dayName].Minutes += record.minutes
					days[dayName].Clocks++
				})

				let rows = []
				for (var dayName in days) {
					rows.push({
						Date: dayName,
						Clocks: days[dayName].Clocks,
						Minutes: days[dayName].Minutes
					});
				}

				this.tableData = rows;
				this.loading = false
			})
		},

		minutes_show(minutes) {
			let duration = moment.duration({minutes: minutes})
			let hours = duration.days() * 24 + duration.hours();
			let text =
				(hours < 10 ? "0" : "") + hours + ":" +
				(duration.minutes() < 10 ? "0" : "") + duration.minutes();

			return text;
		},

		getSummaries(param) {
			const {columns, data} = param;
			const sums = [];
			columns.forEach((column, index) => {
				if (index === 0) {
					sums[index] = 'Total';
					return;
				}
				const values = data.map(item => Number(item[column.property]));
				if (!values.every(value => isNaN(value))) {
					sums[index] = values.reduce((prev, curr) => {
						const value = Number(curr);
						if (!isNaN(value)) {
							return prev + curr;
						} else {
							return prev;
						}
					}, 0);

					if (index === 2)
						sums[index] = this.minutes_show(sums[index])
				}
			});

			return sums;
		}
	}
};
</script>
<style lang="scss" scoped>
.scroll-page {
	width: 100%;
	overflow: hidden;

	/deep/ .el-scrollbar__wrap {
		overflow-x: hidden;
	}

	.container {
		padding: 20px;
	}
}
</style>

