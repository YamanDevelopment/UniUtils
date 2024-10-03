const colors = require('colors');
const express = require('express');
const cors = require('cors');

const Solver = require('./helpers/solver.js');
const solver = new Solver('../../data/data.json');
const {handleSearchQuery} = require('../roomradar/helpers/searchquery.js');
const room_data = require('../roomradar/updated_room_data.json');
const {sample, buildings} = require('../roomradar/main.js');
/*
const solved = solver.solve(
	{
		'courses': [
			'PHY2048',
			'PHY2048L',
			'COT2000C',
			'ENC1101',
			'ENC1102',
		],
		'excludedTimes': [
			{
				'day': 'tuesday',
				'fullDay': false,
				'startTime': '1:30',
				'endTime': '3:20',
			},
			{
				'day': 'Thursday',
				'fullDay': false,
				'startTime': '2:30',
				'endTime': '4:20',
			},
		],
	},
	'202408',
);
console.log(`${colors.bold(`Solved for ${colors.blue(solved.length)} schedules`)}`);
*/

const app = express();
app.use(cors());
app.use(express.json());

app.post('/api/solve', async (req, res) => {
	// userPrefs: courses, excludedTimes
	// term: just the term lol
	const { userPrefs, term } = req.body;
	const schedules = await solver.solve(userPrefs, term);
	// res.json(schedules);

	const timeSlotSets = [];
	for (const schedule of schedules) {
		const timeSlots = [];
		for (const section of schedule.sections) {
			// if (section.meetingTimes) continue;
			for (const meetingTime of section.meetingTimes) {
				if (meetingTime.startTime && meetingTime.endTime) {
					const timeSlot = {
						course: section.subjectCourse,
						section: section.CRN,
						startTime: `${meetingTime.startTime.hour ? meetingTime.startTime.hour : '00'}:${meetingTime.startTime.minute ? meetingTime.startTime.minute : '00'}`,
						endTime: `${meetingTime.endTime.hour ? meetingTime.endTime.hour : '00'}:${meetingTime.endTime.minute ? meetingTime.endTime.minute : '00'}`,
					};
					console.log(section.subjectCourse)

					if (meetingTime.days.monday) timeSlots.push({ course: section.subjectCourse, crn: section.CRN, day: 'Monday', startTime: timeSlot.startTime, endTime: timeSlot.endTime });
					if (meetingTime.days.tuesday) timeSlots.push({ course: section.subjectCourse, crn: section.CRN, day: 'Tuesday', startTime: timeSlot.startTime, endTime: timeSlot.endTime });
					if (meetingTime.days.wednesday) timeSlots.push({ course: section.subjectCourse, crn: section.CRN, day: 'Wednesday', startTime: timeSlot.startTime, endTime: timeSlot.endTime });
					if (meetingTime.days.thursday) timeSlots.push({ course: section.subjectCourse, crn: section.CRN, day: 'Thursday', startTime: timeSlot.startTime, endTime: timeSlot.endTime });
					if (meetingTime.days.friday) timeSlots.push({ course: section.subjectCourse, crn: section.CRN, day: 'Friday', startTime: timeSlot.startTime, endTime: timeSlot.endTime });
					if (meetingTime.days.saturday) timeSlots.push({ course: section.subjectCourse, crn: section.CRN, day: 'Saturday', startTime: timeSlot.startTime, endTime: timeSlot.endTime });
					if (meetingTime.days.sunday) timeSlots.push({ course: section.subjectCourse, crn: section.CRN, day: 'Sunday', startTime: timeSlot.startTime, endTime: timeSlot.endTime });
				}
			}
			timeSlotSets.push(timeSlots);
		}
	}

	console.log(timeSlotSets.length);
	res.json(timeSlotSets);
});

app.get('/api/rooms', (req, res) => {
	const { query } = req;
	console.log(query);
	const t = handleSearchQuery(query.query, room_data, { buildings: buildings, sample: sample });
	const date = new Date();
	const time = date.getHours() + date.getMinutes() / 60
	// converts a given time that follows the format above to a 12 hour string format
	const getTimeString = (e) => {
		let t = Math.floor(e)
		let hours = t > 12 ? t - 12 : t;
		return hours + ":" + (Math.floor((e - t)*60) > 9 ? Math.floor((e - t)*60) : "0" + Math.floor((e - t)*60)) + (t < 12 ? "AM" : "PM");
	}
	t.forEach(r => {
		console.log(r.schedule)
		const weekdays = ["Sunday","Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
		if(!r.schedule) {
			r.status = "Available all day"
			return
		}
		if(!r.schedule[weekdays[date.getDay()]]) {
			r.status = "Available all day"
			return
		}

		console.log(r.schedule[weekdays[date.getDay()]])
		r.schedule[weekdays[date.getDay()]].forEach(e => {
			e.timing = {
				start: Number(e.start.substring(0,2)) + Number(e.start.substring(3,5)) / 60,
				end: Number(e.end.substring(0,2)) + Number(e.end.substring(3,5)) / 60
			}
		})
		r.schedule[weekdays[date.getDay()]].sort((e_1, e_2) => {
			if (e_1.timing.start < e_2.timing.start) {
				return -1;
			} else if (e_1.timing.start > e_2.timing.start) {
				return 1;
			} else {
				return 0;
			}
		});
		let status_set;
		let first_class
		

		r.schedule[weekdays[date.getDay()]].forEach(e => {
			if(time > e.timing.start && e.timing.end > time) {
				let timeString = getTimeString(e.timing.end)
				r.status = "Unavailable until " + timeString
				status_set = true;
			} else if (time < e.timing.start && !status_set) {
				let timeString = getTimeString(e.timing.start)
				r.status = "Available until " + timeString
				status_set = true
			} else if (status_set) {
				return
			}
			else {
				r.status = "Available for rest of day"
			}
		})
	})
	t.sort((a,b) => {
		return a.rating > b.rating ? -1 : a.rating == b.rating ? 0 : 1
	})
	res.json(t);
});


// Start the server
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
