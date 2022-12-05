const deal = require("./deal.module");
heads = [
	{ key: "id", default: Date.now() },
	{ key: "name", default: null },
	{ key: "age", default: null },
	{ key: "email", default: null },
	{ key: "status", default: false },
];
const getUserFromUser = (usersArray, id) => {
	const user = usersArray.find((user) => user.id === id);
	return user;
};
const getUserIndex = (usersArray, id) => {
	const index = usersArray.findIndex((item) => item.id === id);
	return index;
};
const deleteItemFromArray = (array, id) =>
	array.filter((item) => item.id !== id);
const polyfillUserData = (user) => {
	heads.forEach((head) => {
		if (!user[head.key]) user[head.key] = head.default;
	});
	return user;
};

class User {
	static add(data) {
		const user = {};
		heads.forEach((head) => {
			if (head.default != null) user[head.key] = head.default;
			else user[head.key] = data[head.key];
		});
		const userData = deal.readFromJson();
		userData.push(user);
		deal.writeToJson(userData);
	}
	static showAll() {
		let usersData = deal.readFromJson();
		usersData = usersData.map((user) => {
			const userData = polyfillUserData(user);
			return userData;
		});
		console.log(usersData);
	}
	static showSingle(id) {
		let usersData = deal.readFromJson();
		let user = getUserFromUser(usersData, id);
		user = polyfillUserData(user);
		console.log(user ? user : "notFound");
	}
	static edit(argv) {
		let usersData = deal.readFromJson();
		const userIndex = getUserIndex(usersData, argv.id);
		if (!userIndex < 0) {
			console.log("not found");
			return;
		}
		let user = usersData[userIndex];
		const updateUserInputData = { ...argv };
		heads.forEach((head) => {
			if (updateUserInputData[head.key])
				user[head.key] = updateUserInputData[head.key];
		});
		usersData[userIndex] = {
			...user,
			status: user.status === "true" ? true : false,
		};
		deal.writeToJson(usersData);
	}
	static del(id) {
		let usersData = deal.readFromJson();
		usersData = deleteItemFromArray(usersData, id);
		deal.writeToJson(usersData);
	}
}
module.exports = User;
