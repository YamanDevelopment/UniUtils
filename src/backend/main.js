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
	const schedules = await solver.solve({ courses, excludedTimes }, term);
	res.json(schedules);
});