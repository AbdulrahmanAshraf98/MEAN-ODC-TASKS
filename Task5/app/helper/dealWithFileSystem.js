const fs = require("fs");
const readFromFile = (filePath) => {
	let data;
	try {
		const fileData = fs.readFileSync(filePath);
		data = JSON.parse(fileData);
	} catch (error) {
		data = [];
	}
	return data;
};

const writeToFile = (filePath, data) =>
	fs.writeFileSync(filePath, JSON.stringify(data));
module.exports = { readFromFile, writeToFile };
