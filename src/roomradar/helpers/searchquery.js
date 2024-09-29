// helper; takes two arguments query to be compared with item
function inOrder(query, item) {
	let q = 0;
	if (!(query.length == 1)) {
		for (i of query) {
			if (i != item[q]) {
				return false;
			}
			q += 1;
		}
		return true;
	}
	return item[0] == query;
}

// takes two arguments, first search query second json data object third config (see below for example), returns array of Rooms
function handleSearchQuery(query, data, config = {}) {
	// if query is shorter than sample rm # assume it is a partial room number (also add a number check)
	if (query.length <= config.sample.length && query.match(/[0-9]+/g)) {
		// filters the array by matching the room numbers with the room number entered
		return Object.keys(data).reduce((acc, room) => {
			if (room.includes(query)) {
				const q = 0;
				// ensures room numbers match if in same order
				if (inOrder(query, room)) {
					acc.push(data[room]);
				}
			}
			return acc;
		}, []);
		// if the query includes part of a name of a building
		// list every room in every matching building
	} else if (Object.values(config.buildings).some(str => str.includes(query))) {
		return Object.keys(data).reduce((acc, room) => {
			if (config.buildings[data[room].Building].includes(query)) {
				acc.push(data[room]);
			}

			return acc;
		}, []);
		// if neither room numbers nor buildings match then it is likely a combination of the two
	} else {
		// tokenize the query
		const tokens = query.split(' ');
		// if the last token is a number OR if the last token is a number excluding its last character search by building and filter by room number
		if (Number(tokens[tokens.length - 1]) || Number(tokens[tokens.length - 1].replace(/[a-zA-z]/g, ''))) {
			// get room number and remove room number from original token array
			const num = tokens.pop();
			// join the tokens back together without the room number to get building name
			const building = tokens.join(' ');
			// search by building filter by room number (room number is ordered)
			return Object.keys(data).reduce((acc, room) => {
				if (config.buildings[data[room].Building].includes(building) && data[room].Room.includes(num) && inOrder(String(num), data[room].Room)) {
					acc.push(data[room]);
				}
				return acc;
			}, []);
		}
		return [];

		console.log(query);
	}
}

/*
Example config (all example fields are necessary):
{
    buildings: {"CO": "College of Medicine", "BC": "Biomedical Center"},
    sample: "ED112"
}
    sample -> sample room number for university

*/
module.exports = { handleSearchQuery };