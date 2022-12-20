const router = require("express").Router();
const User = require("../app/controller/user.contoller");
const { auth } = require("../app/middleware/auth.middleware");
//auth
router.post("/register", User.register);
router.post("/login", User.login);
//profile
router.post("/me", auth, User.profile);
//user routes
router.get("/", auth, User.allUsers);
//logout
router.post("/logout", auth, User.logOut);
//logout all devices
router.post("/logoutAll", auth, User.logOutAll);
//show single user
router.get("/single/:id", auth, User.getSingle);
//activate & deactivate status
router.post("/activate", auth, User.changeStatus);
//edit my profile
router.post("/edit-me", auth, User.editMyProfile);
//edit other users
router.post("/edit-profile/:id", auth, User.editUserProfile);
//delete me
router.delete("/delete-me", auth, User.deleteMe);
//delete user
router.delete("/delete-profile/:id", auth, User.deleteUser);
//add address
router.post("/add-address", auth, User.addAddress);
//delete address
router.delete("/delete-address/:id", auth, User.deleteAddress);
//show all addresses
router.get("/addresses", auth, User.getAllAddress);
//show single address
router.get("/address/:id", auth, User.getSingleAddress);

module.exports = router;
