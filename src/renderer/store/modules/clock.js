import moment from "moment";
import uuid from "../../utils/uuid";
import path from "path";

const CLOCK_MINUTES = 25;
export default {
	state: {
		runclock_interval: null,
		runclock: {
			leftSeconds: CLOCK_MINUTES * 60,
			status: "wait",
			startTime: null,
		},
		clocklist: {
			day: "",
			clocks: [],
		},
	},
	mutations: {
		CLOCK_SET_LIST: (state, list) => {
			state.clocklist = list;
		},

		CLOCK_SET_RUNCLOCK: (state, runclock) => {
			state.runclock = runclock;
		},

		CLOCK_SET_RUNCLOCK_INTERVAL: (state, interval) => {
			state.runclock_interval = interval;
		},

		CLOCK_COUNTDOWN: (state) => {
			if (state.runclock.leftSeconds > 0) state.runclock.leftSeconds -= 1;
		},
	},
	actions: {
		CLOCK_LOAD_LIST({ commit, state }, day) {
			this._vm.$db.find({ day: day }, function(error, clocks) {
				if (error) return;

				clocks.sort(function(a, b) {
					let a_cols = a.startTime.split(":");
					let b_cols = b.startTime.split(":");

					let a_value = a_cols[0] * 60 + a_cols[1];
					let b_value = b_cols[0] * 60 + b_cols[1];
					return b_value - a_value;
				});

				commit("CLOCK_SET_LIST", { day: day, clocks: clocks });
			});
		},

		CLOCK_START({ commit, state }) {
			if (state.runclock_interval != null) return;

			commit("CLOCK_SET_RUNCLOCK", {
				leftSeconds: CLOCK_MINUTES * 60 - 1,
				status: "run",
				startTime: moment().format("HH:mm:ss"),
			});

			let that = this;
			let runclock_interval = setInterval(() => {
				commit("CLOCK_COUNTDOWN");
				if (state.runclock.leftSeconds > 0) return;

				clearInterval(state.runclock_interval);
				commit("CLOCK_SET_RUNCLOCK_INTERVAL", null);

				let savedClock = {
					id: uuid.generateUUID(),
					day: moment().format("YYYY-MM-DD"),
					minutes: CLOCK_MINUTES,
					isLocal: 1,
					startTime: state.runclock.startTime,
				};

				that._vm.$db.insert(savedClock, function(error, docs) {
					if (error) return;

					let options = {
						title: "Success",
						body: "Your one tomato clock is complete!",
					};

					let audio = new Audio();
					audio.src = path.join(__static, "/media/alert.mp3");
					audio.play();

					new window.Notification(options.title, options);

					that.dispatch("CLOCK_LOAD_LIST", state.clocklist.day);
				});

				commit("CLOCK_SET_RUNCLOCK", {
					leftSeconds: CLOCK_MINUTES * 60,
					status: "wait",
					startTime: null,
				});
			}, 1000);

			commit("CLOCK_SET_RUNCLOCK_INTERVAL", runclock_interval);
		},

		CLOCK_RESET({ commit, state }) {
			if (state.runclock_interval == null) return;

			clearInterval(state.runclock_interval);
			commit("CLOCK_SET_RUNCLOCK_INTERVAL", null);

			commit("CLOCK_SET_RUNCLOCK", {
				leftSeconds: CLOCK_MINUTES * 60,
				status: "wait",
				startTime: null,
			});
		},
	},
};
