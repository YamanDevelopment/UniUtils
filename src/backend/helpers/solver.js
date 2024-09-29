// Importing the necessary modules
const fs = require('fs');
const path = require('path');

// Importing the necessary classes
const Course = require('./structs/Course.js');
const Schedule = require('./structs/Schedule.js');
const Classroom = require('./structs/Classroom.js');
// const Section = require('../structs/Section.js');

// This class is the main solver class. It will
// solve any university semester course schedule
// based on the data file with all the course
// information and the user's preferences

class Solver {
	constructor(dataJSON) {
		// Have courses as an array of Course objects
		this.data = {};
		this.dataLoaded = false;
		console.log('solver init');

		// Loading the data file's JSON into the class
		const promise = new Promise((resolve, reject) => {
			console.log(path.join(__dirname, dataJSON));
			let data;
			try {
				data = fs.readFileSync(path.join(__dirname, dataJSON), 'utf8');
			} catch (err) {
				reject(err);
			}

			// const data = Bun.file(path.join(__dirname, dataJSON));
			// const dataTXT = await data.text();
			// console.log(data.toString().split('\n').join(''));
			const jsonData = JSON.parse(data.toString().split('\n').join(''));
			const terms = Object.keys(jsonData.terms);
			// console.log(terms);

			for (let i = 0; i < terms.length; i++) {
				// console.log(terms[i]);
				this.data[terms[i]] = {};
				this.data[terms[i]].courses = [];
				this.data[terms[i]].classrooms = [];
				if (jsonData.terms[terms[i]].courses) {
					const jsonCourses = jsonData.terms[terms[i]].courses;
					const jsonCourseKeys = Object.keys(jsonCourses);
					// console.log(jsonCourseKeys.length);
					// const jsonClassrooms = jsonData.terms[terms[i]].classrooms;
					// const jsonClassroomKeys = Object.keys(jsonClassrooms);

					for (let j = 0; j < jsonCourseKeys.length; j++) {
						const course = new Course(jsonCourses[jsonCourseKeys[j]]);
						this.data[terms[i]].courses.push(course);
					}

					// for (let j = 0; j < jsonClassroomKeys.length; j++) {
					// 	const classroom = new Classroom(jsonClassrooms[jsonClassroomKeys[j]]);
					// 	this.data[terms[i]].classrooms.push(classroom);
					// }
				}
			}

			// Add the courses to the courses array
			// for (let i = 0; i < jsonData.courses.length; i++) {
			// 	this.data.push(new Course(jsonData.courses[i]));
			// }

			// Resolve the promise with the loaded data
			this.dataLoaded = true;
			resolve(this.data);
		});

		// Code that depends on this.data should be placed here
		promise.then((data) => {
			// console.log('resolved');
			if (data) this.dataLoaded = true;
			// console.log(data.length);
		});
	}

	// This function will solve for all the possible schedules
	// based on the user's preferences and the data file.
	// It'll also rank the schedules based on the user's preferences
	// with the highest ranked schedule being the first element
	// in the array and the lowest ranked schedule being the last.

	// Params: userPreferences (JSON)
	// Returns: Array of schedules (JSON)
	solve(userPreferences, term) {
		// Wait until this.dataLoaded is true
		while (!this.dataLoaded) {
			// Do nothing
		}

		console.log('SOLVING');
		// =========> Steps 1-3

		// Look for courses that match the user's preferences
		// and make sure that the sections don't conflict with
		// the user's excluded times
		const allCourses = [];
		const termData = this.data[term].courses;
		for (let i = 0; i < userPreferences.courses.length; i++) {
			for (let j = 0; j < termData.length; j++) {
				// Check if the course matches the user's preferences
				if (userPreferences.courses[i] == termData[j].getSubjectCourse()) {
					// Add the course to the courses array
					allCourses.push(termData[j]);
				}
			}
		}

		// console.log(allCourses)

		// Concatenate all sections from all courses into a single array
		let allSections = [];
		for (let i = 0; i < allCourses.length; i++) {
			// console.log(`DEBUG: looping through courses (${i})`)
			const course = allCourses[i];
			// console.log(course);
			const sections = Object.values(course.getSections());
			// console.log(sections)
			// console.log(course.getSections());
			allSections = allSections.concat(sections);
		}
		// console.log(allSections)

		// Exclude sections that conflict with the user's excluded times
		const possibleSections = [];
		for (let i = 0; i < allSections.length; i++) {
			let conflicting = false;
			for (let j = 0; j < userPreferences.excludedTimes.length; j++) {
				// Check if the section has a meeting time on the day
				if (allSections[i].hasMeetingTimeOnDay(userPreferences.excludedTimes[j].day)) {
					// If fullday is true, then set the start time to 0:00 and the end time to 23:59
					let startTime = '00:00';
					let endTime = '00:00';

					if (userPreferences.excludedTimes[j].fullDay) {
						startTime = '00:00';
						endTime = '23:59';
					} else {
						startTime = userPreferences.excludedTimes[j].startTime;
						endTime = userPreferences.excludedTimes[j].endTime;
					}

					// Check if the section's meeting time overlaps with the excluded time
					if (allSections[i].conflictsWithTime(userPreferences.excludedTimes[j].day, startTime, endTime)) {
						conflicting = true;
						break;
					}
				}
			}

			// If the section is not conflicting, then add it to the possible sections array
			if (!conflicting) possibleSections.push(allSections[i]);
		}

		// Generate all possible schedules
		const validSchedules = [];
		const possibleSchedules = [];

		function backtrack(posSecs, selSecs, selectedCourses, posScheds, numCourses) {
			// If the list of possible sections is empty, add the list of selected sections to the list of possible schedules and return
			if (posSecs.length === 0) {
				// Check if the selected sections include one section from each course
				const subjectCourses = selectedCourses.map(section => section.getSubjectCourse());
				const uniqueSubjectCourses = [...new Set(subjectCourses)];
				if (uniqueSubjectCourses.length === numCourses) {
					posScheds.push(selSecs);
				}
				return;
			}

			// For each section in the possible sections array
			for (let i = 0; i < posSecs.length; i++) {
				const section = posSecs[i];

				// Check if the section conflicts with any of the selected sections
				let conflicting = false;
				for (let j = 0; j < selSecs.length; j++) {
					if (section.conflictsWithSection(selSecs[j])) {
						conflicting = true;
						break;
					}
				}

				// If the section does not conflict with any of the selected sections, add it to the list of selected sections and call the backtrack function recursively
				if (!conflicting) {
					const newPossibleSections = posSecs.slice();
					newPossibleSections.splice(i, 1); // Remove the section from the possible sections array
					// Remove any other sections for the same course from the possible sections array
					const subjectCourse = section.getSubjectCourse();
					for (let j = 0; j < newPossibleSections.length; j++) {
						if (newPossibleSections[j].getSubjectCourse() === subjectCourse) {
							newPossibleSections.splice(j, 1);
							j--;
						}
					}

					const newSelectedSections = selSecs.slice();
					newSelectedSections.push(section); // Add the section to the selected sections array

					const newSelectedCourses = selectedCourses.slice();
					const courseIndex = newSelectedCourses.findIndex(course => course.subjectCourse === section.getSubjectCourse());
					if (courseIndex === -1) {
						newSelectedCourses.push(section);
					}

					backtrack(newPossibleSections, newSelectedSections, newSelectedCourses, possibleSchedules, numCourses);
				}
			}
		}

		// Call the backtrack function
		backtrack(possibleSections, [], [], possibleSchedules, userPreferences.courses.length);

		// Remove duplicate schedules from the possibleSchedules array
		// using the isSame function from the Schedule class
		// At this part, the schedule is only an array of sections
		// so convert it to a Schedule object before comparing
		for (let i = 0; i < possibleSchedules.length; i++) {
			const schedule = new Schedule();
			for (let j = 0; j < possibleSchedules[i].length; j++) {
				schedule.addSection(possibleSchedules[i][j]);
			}
			// console.log(schedule)
			let duplicate = false;
			for (let j = 0; j < validSchedules.length; j++) {
				// Convert current valid schedule to a Schedule object
				const validSchedule = new Schedule();
				for (let k = 0; k < validSchedules[j].length; k++) {
					validSchedule.addSection(validSchedules[j][k]);
				}
				if (schedule.isSame(validSchedule)) {
					duplicate = true;
					break;
				}
			}
			if (!duplicate) validSchedules.push(schedule.toJSON());

		}

		// Return the list of valid schedules
		return validSchedules;
	}
}

// Exporting the class
module.exports = Solver;