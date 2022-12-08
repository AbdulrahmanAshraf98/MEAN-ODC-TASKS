class UserController {
	static index = (req, res) => {
		res.status(200).render("index", {
			pageTitle: "home",
		});
	};
	static getAllUsers = (req, res) => {
		res.status(200).render("alluser", {
			pageTitle: "allUser",
		});
	};
	static getUser = (req, res) => {};
	static updateUser = (req, res) => {};
	static deleteUser = (req, res) => {};
}
module.exports = UserController;
