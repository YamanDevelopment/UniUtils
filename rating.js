const fs = require('fs');

function calculateRating(room, sizePreference = 'large') {
	let rating = 0;

	// Normalize availability (assuming max 24 hours per day, 7 days a week)
	const totalHours = 24 * 7;
	let availableHours = totalHours;

	if (room.schedule) {
		for (const day in room.schedule) {
			room.schedule[day].forEach(slot => {
				const start = parseInt(slot.start.split(':')[0]);
				const end = parseInt(slot.end.split(':')[0]);
				availableHours -= (end - start);
			});
		}
	}

	rating += (availableHours / totalHours) * 5;

	// Add features (assuming max 5 features)
	const features = ['ZoomEnabled', 'VideoConf', 'Mediasite', 'AudienceMicrophones', 'AudienceCamera'];
	let featureCount = 0;
	features.forEach(feature => {
		if (room[feature]) featureCount++;
	});

	rating += (featureCount / features.length) * 5;

	// Adjust size rating based on user preference (assuming larger is better)
	rating += (room.StudentCapacity / 100) * 5; // Assuming max capacity is 100

	// Round the rating to the nearest integer
	rating = Math.round(rating);

	// Cap the rating at 10
	return Math.min(rating, 10);
}

function appendRatingsToRooms(roomData) {
	for (const roomId in roomData) {
		const room = roomData[roomId];
		room.rating = calculateRating(room);
	}
}

// Read JSON data from file
fs.readFile('room_data.json', 'utf8', (err, data) => {
	if (err) {
		console.error('Error reading file:', err);
		return;
	}

	const roomData = JSON.parse(data);

	// Append ratings to rooms
	appendRatingsToRooms(roomData);

	// Write updated JSON data to a new file
	fs.writeFile('updated_room_data.json', JSON.stringify(roomData, null, 2), 'utf8', err => {
		if (err) {
			console.error('Error writing file:', err);
			return;
		}
		console.log('Ratings appended successfully to updated_room_data.json.');
	});
});