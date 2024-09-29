const colors = require('colors');


const Solver = require('./helpers/solver.js');
const solver = new Solver('../../data/data.json');
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
				'day': 'Tuesday',
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
	"202408"
);

console.log(`${colors.bold(`Solved for ${colors.blue(solved.length)} schedules`)}`);