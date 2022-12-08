const route = require("express").Router();
const path = require("path");
const UserController = require("../../controllers/userController/user.controller");

route.route("/").get(UserController.index);
route.route("/allusers").get(UserController.getAllUsers);

module.exports = route;
