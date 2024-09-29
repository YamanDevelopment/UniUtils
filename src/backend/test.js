const fs = require('fs');
const path = require('path');
// const promise = new Promise((resolve, reject) => {
// 	fs.readFile('/home/str1ke/Projects/GitHub/UniUtils/src/data/data.json'), (err, data) => {
// 		resolve(data);
// 	};
fs.readFile('/home/str1ke/Projects/GitHub/UniUtils/src/data/data.json', (err, data) => {
	console.log(JSON.parse(data));
});