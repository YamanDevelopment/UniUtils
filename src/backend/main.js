const colors = require('colors');
const express = require('express');
const cors = require('cors');

const Solver = require('./helpers/solver.js');
const solver = new Solver('../../data/data.json');
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
		for (const section of schedule) {
			for (const meetingTime of section.meetingTimes) {
				if (meetingTime.startTime && meetingTime.endTime) {
					const timeSlot = {
						course: section.subjectCourse,
						section: section.CRN,
						startTime: `${meetingTime.startTime.hour ? meetingTime.startTime.hour : '00'}:${meetingTime.startTime.minute ? meetingTime.startTime.minute : '00'}`,
						endTime: `${meetingTime.endTime.hour ? meetingTime.endTime.hour : '00'}:${meetingTime.endTime.minute ? meetingTime.endTime.minute : '00'}`,
					};
					console.log(section.subjectCourse);

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

	res.json(timeSlotSets);
});

// app.length('/api/rooms', (req, res) => {

// });


// Start the server
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
