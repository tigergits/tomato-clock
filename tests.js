const moment = require("moment")

console.log(moment().format("YYYY-MM-DD"))

console.log(
	moment()
		.isoWeekday(1)
		.format("YYYY-MM-DD")
)
return

let docs = [
	{ day: "2021-08-10", minutes: 25 },
	{ day: "2021-08-10", minutes: 25 },
	{ day: "2021-08-10", minutes: 25 },
	{ day: "2021-08-10", minutes: 25 },
	{ day: "2021-08-11", minutes: 25 },
]

/*
let day = moment().weekday(1)
while (day <= moment().weekday(7)) {
	console.log(day.format("YYYY-MM-DD"))
	day = day.add(1, "days")
}
*/

let day = moment().startOf("month")
while (day <= moment().endOf("month")) {
	console.log(day.format("YYYY-MM-DD"))
	day = day.add(1, "days")
}

/*
let days = {}
docs.forEach((record) => {
	console.log(record)
	let dayName = moment(record.day).format("M月D日")
	if (!(dayName in days)) days[dayName] = { minutes: 0, count: 0 }
	days[dayName].minutes += record.minutes
	days[dayName].count++
})

days.keys.forEach((key, value) => {
	console.log(key, value)
})

for (var i = 0; i < days.length; i++) {
	let duration = moment.duration({
		minutes: days[i].minutes,
	})

	days[i].duration =
		(duration.hours() < 10 ? "0" + duration.hours() : duration.hours()) +
		(duration.minutes() < 10 ? "0" + duration.minutes() : duration.minutes())
}

console.log(days)
*/
