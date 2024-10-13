const { handleSearchQuery } = require('./helpers/searchquery');
const fs = require('fs');
const readline = require('readline');
// import data from rooms

// make list of buildings (this in particular is VERY fau specific but can be revisited)


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