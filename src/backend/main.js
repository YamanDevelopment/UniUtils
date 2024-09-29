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
				const timeSlot = {
					course: section.course,
					section: section.CRN,
					startTime: `${meetingTime.startTime.hour}:${meetingTime.startTime.minute}`,
					endTime: `${meetingTime.endTime.hour}:${meetingTime.endTime.minute}`,
				};

				if (meetingTime.days.monday) timeSlots.push({ ...timeSlot, day: 'Monday' });
				if (meetingTime.days.tuesday) timeSlots.push({ ...timeSlot, day: 'Tuesday' });
				if (meetingTime.days.wednesday) timeSlots.push({ ...timeSlot, day: 'Wednesday' });
				if (meetingTime.days.thursday) timeSlots.push({ ...timeSlot, day: 'Thursday' });
				if (meetingTime.days.friday) timeSlots.push({ ...timeSlot, day: 'Friday' });
				if (meetingTime.days.saturday) timeSlots.push({ ...timeSlot, day: 'Saturday' });
				if (meetingTime.days.sunday) timeSlots.push({ ...timeSlot, day: 'Sunday' });	
			}
		}
		timeSlotSets.push(timeSlots);
	}

	res.json(timeSlotSets);
});

// Start the server
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
