class Section {
	constructor(data) {
		this.subjectCourse = data.subjectCourse;
		this.CRN = data.crn;
		this.crossList = data.crossList;
		this.creditHours = data.creditHours;
		this.enrollment = data.enrollment;
		this.waitlist = data.waitList;
		this.faculty = data.faculty;
		this.instructionalMethod = data.instructionalMethod;
		this.meetingTimes = data.meetingTimes;
	}

	// This function will return the section's CRN
	getCRN() {
		return this.CRN;
	}

	// This function will return the section's cross list
	getCrossList() {
		return this.crossList;
	}

	// This function will return the section's credit hours
	getCreditHours() {
		return this.creditHours;
	}

	// This function will return the section's enrollment
	getEnrollment() {
		return this.enrollment;
	}

	// This function will return the section's waitlist
	getWaitlist() {
		return this.waitlist;
	}

	// This function will return the section's faculty
	getFaculty() {
		return this.faculty;
	}

	// This function will return the section's instructional method
	getInstructionalMethod() {
		return this.instructionalMethod;
	}

	// This function will return the section's meeting times
	getMeetingTimes() {
		return this.meetingTimes;
	}

	// This function will return the section's subject number
	getSubjectCourse() {
		return this.subjectCourse;
	}

	// This function will check if this section conflicts with another section
	// Params: section (Section)
	// Returns: boolean
	conflictsWithSection(section) {
		// Check if the sections are the same
		console.log(this.CRN);
		if (this.CRN == section.getCRN()) {
			console.log(`DEBUG: ${this.CRN} == ${section.getCRN()}`);
			return false;
		}

		// Check for time conflicts using military time
		// Make to to match the day of the week
		// Use the hasMeetingTimeOnDay function to check if the section has a meeting time on a specific day
		for (let i = 0; i < this.meetingTimes.length; i++) {
			for (let j = 0; j < section.getMeetingTimes().length; j++) {
				// Check if the days match
				let daysMatch = false;
				if (this.meetingTimes[i].days.monday && section.getMeetingTimes()[j].days.monday) daysMatch = true;
				if (this.meetingTimes[i].days.tuesday && section.getMeetingTimes()[j].days.tuesday) daysMatch = true;
				if (this.meetingTimes[i].days.wednesday && section.getMeetingTimes()[j].days.wednesday) daysMatch = true;
				if (this.meetingTimes[i].days.thursday && section.getMeetingTimes()[j].days.thursday) daysMatch = true;
				if (this.meetingTimes[i].days.friday && section.getMeetingTimes()[j].days.friday) daysMatch = true;
				if (this.meetingTimes[i].days.saturday && section.getMeetingTimes()[j].days.saturday) daysMatch = true;
				if (this.meetingTimes[i].days.sunday && section.getMeetingTimes()[j].days.sunday) daysMatch = true;

				if (daysMatch) {
					// console.log(this.meetingTimes[i]);
					let thisStartTime = `${this.meetingTimes[i].startTime.hour}:${this.meetingTimes[i].startTime.minute}`;
					let thisEndTime = `${this.meetingTimes[i].endTime.hour}:${this.meetingTimes[i].endTime.minute}`;
					let sectionStartTime = `${section.getMeetingTimes()[j].startTime.hour}:${section.getMeetingTimes()[j].startTime.minute}`;
					let sectionEndTime = `${section.getMeetingTimes()[j].endTime.hour}:${section.getMeetingTimes()[j].endTime.minute}`;

					// Parse both sets of times into integers
					thisStartTime = parseInt(thisStartTime.replace(':', ''));
					thisEndTime = parseInt(thisEndTime.replace(':', ''));
					sectionStartTime = parseInt(sectionStartTime.replace(':', ''));
					sectionEndTime = parseInt(sectionEndTime.replace(':', ''));

					// Check if the times overlap
					if (thisStartTime >= sectionStartTime && thisStartTime < sectionEndTime && thisEndTime != sectionStartTime) {
						return true;
					} else if (thisEndTime > sectionStartTime && thisEndTime <= sectionEndTime && thisStartTime != sectionEndTime) {
						return true;
					} else if (thisStartTime < sectionStartTime && thisEndTime > sectionEndTime) {
						return true;
					}
				}
				// console.log(`DEBUG: Section ${this.CRN} does not conflict with section ${section.getCRN()}`);
			}
		}

		return false;
	}

	// This function will check if this section conflicts with a given time frame
	// Params: day, startTime, endTime
	// Returns: boolean
	conflictsWithTime(day, startTime, endTime) {
		// Check for time conflicts using military time
		// Make to to match the day of the week
		// Use the hasMeetingTimeOnDay function to check if the section has a meeting time on a specific day
		for (let i = 0; i < this.meetingTimes.length; i++) {
			if (this.meetingTimes[i].days[day]) {
				let thisStartTime = `${this.meetingTimes[i].startTime.hour}:${this.meetingTimes[i].startTime.minute}`;
				let thisEndTime = `${this.meetingTimes[i].endTime.hour}:${this.meetingTimes[i].endTime.minute}`;

				// Parse both sets of times into integers
				thisStartTime = parseInt(thisStartTime.replace(':', ''));
				thisEndTime = parseInt(thisEndTime.replace(':', ''));
				startTime = parseInt(startTime.replace(':', ''));
				endTime = parseInt(endTime.replace(':', ''));

				// Check if the times overlap
				if (thisStartTime >= startTime && thisStartTime < endTime && thisEndTime != startTime) {
					return true;
				} else if (thisEndTime > startTime && thisEndTime <= endTime && thisStartTime != endTime) {
					return true;
				} else if (thisStartTime < startTime && thisEndTime > endTime) {
					return true;
				}
			}
		}

		return false;
	}


	// This function will check if this section has a meeting time on a specific day
	// Params: day (string)
	// Returns: boolean
	hasMeetingTimeOnDay(day) {
		for (let i = 0; i < this.meetingTimes.length; i++) {
			if (this.meetingTimes[i][day]) {
				return true;
			}
		}

		return false;
	}

	// This function will return the section's JSON
	toJSON() {
		return {
			subjectCourse: this.subjectCourse,
			CRN: this.CRN,
			meetingTimes: this.meetingTimes,
		};
	}

}

module.exports = Section;