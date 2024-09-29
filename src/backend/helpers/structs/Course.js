const Section = require('./Section');

class Course {
	// This class will represent a course
	// Params: courseJSON (JSON)
	constructor(courseJSON) {
		// Loading the JSON into the class
		this.courseTitle = courseJSON.courseTitle;
		this.courseSubject = courseJSON.courseSubject;
		this.subjectDescription = courseJSON.subjectDescription;
		this.courseNumber = courseJSON.courseNumber;
		this.subjectCourse = courseJSON.subjectCourse; // Subject + Course Number
		this.creditHours = courseJSON.creditHours;

		// Have sections as an array of Section objects
		this.sections = [];

		// Add the sections to the sections array
		for (let i = 0; i < Object.values(courseJSON.sections).length; i++) {
			const sectionData = Object.values(courseJSON.sections)[i];
			// console.log("DEBUG: " + sectionData);
			sectionData.subjectCourse = this.subjectCourse;
			this.sections.push(new Section(sectionData));
		}
	}

	// This function will return the course's title
	getTitle() {
		return this.courseTitle;
	}

	// This function will return the course's subject
	getSubject() {
		return this.courseSubject;
	}

	// This function will return the course's subject description
	getSubjectDescription() {
		return this.subjectDescription;
	}

	// This function will return the course's course number
	getCourseNumber() {
		return this.courseNumber;
	}

	// This function will return the course's subject course
	getSubjectCourse() {
		return this.subjectCourse;
	}

	// This function will return the course's credit hours
	getCreditHours() {
		return this.creditHours;
	}

	// This function will return the course's sections
	getSections() {
		return this.sections;
	}

	// This function will return the course's sections as a JSON
	getSectionsJSON() {
		const sectionsJSON = [];
		for (let i = 0; i < this.sections.length; i++) {
			sectionsJSON.push(this.sections[i].getJSON());
		}
		return sectionsJSON;
	}

	// This function will return the course's JSON
	getJSON() {
		return {
			courseTitle: this.courseTitle,
			courseSubject: this.courseSubject,
			subjectDescription: this.subjectDescription,
			courseNumber: this.courseNumber,
			subjectCourse: this.subjectCourse,
			creditHours: this.creditHours,
			sections: this.getSectionsJSON(),
		};
	}

	// This function will set the course's title
	setTitle(title) {
		this.courseTitle = title;
	}

	// This function will set the course's subject
	setSubject(subject) {
		this.courseSubject = subject;
	}

	// This function will set the course's subject description
	setSubjectDescription(description) {
		this.subjectDescription = description;
	}

	// This function will set the course's course number
	setCourseNumber(courseNumber) {
		this.courseNumber = courseNumber;
	}

	// This function will set the course's subject course
	setSubjectCourse(subjectCourse) {
		this.subjectCourse = subjectCourse;
	}

	// This function will set the course's credit hours
	setCreditHours(creditHours) {
		this.creditHours = creditHours;
	}

	// This function will set the course's sections
	setSections(sections) {
		this.sections = sections;
	}
}

module.exports = Course;