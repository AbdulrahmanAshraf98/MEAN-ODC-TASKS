require("dotenv").config();
const path = require("path");
const express = require("express");
const app = express();
const hbs = require("hbs");
const publicDirPath = path.join(__dirname, "../public");
const layoutDirPath = path.join(__dirname, "../frontend/layout/");
const viewsDirPath = path.join(__dirname, "../frontend/views/");
const userRoute = require("../Routes/userRoutes/user.routes");
app.use(express.static(publicDirPath));

app.set("view engine", "hbs");
app.set("views", viewsDirPath);
hbs.registerPartials(layoutDirPath);

app.use("/", userRoute);

module.exports = app;
