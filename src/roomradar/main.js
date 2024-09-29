const { handleSearchQuery } = require('./helpers/searchquery');
const fs = require('fs');
const readline = require('readline');
// import data from rooms

// make list of buildings (this in particular is VERY fau specific but can be revisited)
const buildings = {
	'IN-1': 'Innovation Centre Bldg. 1',
	'IN-2': 'Innovation Centre Bldg. 2',
	'EE': 'Engineering East',
	'EG': 'Engineering West',
	'BS': 'Behavioral Sciences Building',
	'AH': 'Dorothy F. Schmidt Arts & Humanities',
	'PA': 'Dorothy F. Schmidt Performing Arts Center',
	'VA': 'Dorothy F. Schmidt Visual Arts Center',
	'GN': 'General Classroom - North',
	'GS': 'General Classroom - South',
	'SW': 'College Of Social Work And Criminal Justice',
	'AL': 'College Of Arts & Letters',
	'BU': 'Phil Smith Hall',
	'ED': 'College Of Education',
	'EC': 'College Of Engineering And Computer Science',
	'BC': 'College Of Medicine',
	'NU': 'College Of Nursing',
	'SC': 'College Of Science',
	'LL': 'Friedberg Lifelong Learning Center',
	'IS': 'Instructional Services',
	'PS': 'Physical Science Building',
	'LS': 'Sanford Life Sciences Building',
	'SF': 'Schmidt Family Complex For Academic And Athletic Excellence',
	'SP': 'Sean Stein Pavilion In College Of Business',
	'SO': 'Social Science Building',
	'OC': 'Wally Sanger Owl Club Center',
	'KH': 'Barry Kaye Hall',
	'FL': 'Fleming Hall',
	'FW': 'Fleming West',
	'AC': 'Tom Oxley Athletic Center',
	'CE': 'Continuing Education Hall',
	'CM': 'Computer Center',
	'CR': 'Student Activities Center',
	'CU': 'Culture and Society Building',
	'FA': 'MARLEEN & HAROLD FORKAS ALUMNI CENTER',
	'GP': 'Glades Park Towers',
	'HP': 'Heritage Park Towers',
	'IR': 'Indian River Towers',
	'LY': 'S.E. Wimberly Library',
	'OD': 'OFFICE DEPOT CENTER FOR EXECUTIVE EDUCATION',
	'PH': 'Parliament Hall',
	'SE': 'Charles E. Schmidt College of Science',
	'UN': 'Student Union',
};

// sample university wide room number
const sample = 'ED112';
function main() {
	const rl = readline.createInterface({
		input: process.stdin,
		output: process.stdout,
	});

	// Prompt the user for input
	rl.question('Search for a room: ', (userInput) => {
		const t = handleSearchQuery(userInput, data, {
			buildings: buildings,
			sample: sample,
		});
		console.log(t);
		t.forEach(room => {
			const t = room.schedule;
			if (t[day]) {
				let b;
				t[day].forEach(time => {
					if (Number(time.start.substring(0, 2)) >= date.getHours() && Number(time.start.substring(0, 2)) <= date.getHours()) {
						console.log('Room ', room.Building, room.Room, ' is not available');
						b = false;
						return;
					}
				});
				if (b != false) console.log('Room ', room.Building, room.Room, ' is available');

			} else {console.log('Room ', room.Building, room.Room, ' is available');}


		});
		// Close the readline interface
		rl.close();
	});

	const date = new Date();
	const day = date.getDay();


}

main();

module.exports = { buildings, sample }