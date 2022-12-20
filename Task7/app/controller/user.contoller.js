const userModel = require("../../db/models/user.model");
const myHelper = require("../../app/helper");
const updateUser = async (id, newData) => {
	try {
		return await userModel.findByIdAndUpdate(id, newData, {
			new: true,
		});
	} catch (error) {
		throw new Error("can not update user");
	}
};
const deleteUser = async (id) => {
	try {
		await userModel.findByIdAndDelete(id);
	} catch (error) {
		throw new Error("can not delete user");
	}
};
class User {
	static register = async (req, res) => {
		try {
			if (req.body.password.length < 6)
				throw new Error("password must be more than 6");
			const userData = new userModel(req.body);
			await userData.save();
			myHelper.resHandler(res, 200, true, userData, "user added successfully");
		} catch (e) {
			myHelper.resHandler(res, 500, false, e, e.message);
		}
	};
	static login = async (req, res) => {
		try {
			const userData = await userModel.loginUser(
				req.body.email,
				req.body.password,
			);
			const token = await userData.generateToken();
			myHelper.resHandler(
				res,
				200,
				true,
				{ user: userData, token },
				"user added successfully",
			);
		} catch (e) {
			myHelper.resHandler(res, 500, false, e, e.message);
		}
	};
	static allUsers = async (req, res) => {
		try {
			const users = await userModel.find();
			myHelper.resHandler(res, 200, true, users, "users fetched");
		} catch (e) {
			myHelper.resHandler(res, 500, false, e, e.message);
		}
	};
	static profile = (req, res) => {
		myHelper.resHandler(
			res,
			200,
			true,
			{ user: req.user },
			"user profile fetched",
		);
	};
	static logOut = async (req, res) => {
		try {
			//req.user , req.token
			req.user.tokens = req.user.tokens.filter((t) => t.token != req.token);
			await req.user.save();
			myHelper.resHandler(res, 200, true, null, "logged out");
		} catch (e) {
			myHelper.resHandler(res, 500, false, e, e.message);
		}
	};
	static logOutAll = async (req, res) => {
		try {
			//req.user , req.token
			req.user.tokens = [];
			await req.user.save();
			myHelper.resHandler(res, 200, true, null, "logged out");
		} catch (e) {
			myHelper.resHandler(res, 500, false, e, e.message);
		}
	};
	static getSingle = async (req, res) => {
		try {
			const user = await userModel.findById(req.params.id);
			myHelper.resHandler(res, 200, true, user, "logged out");
		} catch (e) {
			myHelper.resHandler(res, 500, false, e, e.message);
		}
	};
	static changeStatus = async (req, res) => {
		try {
			let user = req.user;
			if (!req.query.current || !+req.query.current)
				user = await userModel.findById(req.body._id);

			if (+req.query.activate) user.status = true;
			else user.status = false;
			await user.save();
			myHelper.resHandler(res, 200, true, user, "updated");
		} catch (e) {
			myHelper.resHandler(res, 500, false, e, e.message);
		}
	};
	static editMyProfile = async (req, res) => {
		try {
			const updatedUser = await updateUser(req.user._id, req.body);
			myHelper.resHandler(res, 200, true, updatedUser, "updated");
		} catch (e) {
			myHelper.resHandler(res, 500, false, e, e.message);
		}
	};
	static editUserProfile = async (req, res) => {
		try {
			const updatedUser = await updateUser(req.params.id, req.body);
			myHelper.resHandler(res, 200, true, updatedUser, "updated");
		} catch (e) {
			myHelper.resHandler(res, 500, false, e, e.message);
		}
	};
	static deleteMe = async (req, res) => {
		try {
			await deleteUser(req.user._id, req.body);
			delete req.token;
			delete req.user;
			myHelper.resHandler(res, 200, true, null, "deleted");
		} catch (e) {
			myHelper.resHandler(res, 500, false, e, e.message);
		}
	};
	static deleteUser = async (req, res) => {
		try {
			const deleteUserId = req.params.id;
			if (req.user._id === deleteUserId) {
				await deleteUser(req.user._id);
				delete req.token;
				delete req.user;
			} else {
				await deleteUser(deleteUserId);
			}
			myHelper.resHandler(res, 200, true, null, "deleted");
		} catch (e) {
			myHelper.resHandler(res, 500, false, e, e.message);
		}
	};
	static addAddress = async (req, res) => {
		try {
			const user = req.user;
			user.addresses.push(req.body);
			await user.save();
			myHelper.resHandler(res, 200, true, user, "added address ");
		} catch (e) {
			myHelper.resHandler(res, 500, false, e, e.message);
		}
	};
	static deleteAddress = async (req, res) => {
		try {
			const user = req.user;
			user.addresses = user.addresses.filter(
				(address) => address.id != req.params.id,
			);
			await user.save();
			myHelper.resHandler(res, 200, true, user, "deleted address ");
		} catch (e) {
			myHelper.resHandler(res, 500, false, e, e.message);
		}
	};
	static getAllAddress = async (req, res) => {
		try {
			myHelper.resHandler(
				res,
				200,
				true,
				req.user?.addresses ? req.user.addresses : [],
				"added address ",
			);
		} catch (e) {
			myHelper.resHandler(res, 500, false, e, e.message);
		}
	};
	static getSingleAddress = (req, res) => {
		try {
			let address;
			if (!req.user.addresses) address = {};
			else
				address = req.user.addresses.find((address) => {
					return address._id == req.params.id;
				});
			myHelper.resHandler(res, 200, true, address, "added address ");
		} catch (e) {
			myHelper.resHandler(res, 500, false, e, e.message);
		}
	};
}
module.exports = User;
