const express = require("express");
const path = require("path");
const hbs = require("hbs");
const booksRoutes = require("./routes/books.routes");
const app = express();
app.use(express.static(path.join(__dirname, "../client/public")));
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "../client/views"));
hbs.registerPartials(path.join(__dirname, "../client/layouts"));
app.use(express.urlencoded({ extended: true }));
app.use(booksRoutes);
app.all("*", (req, res) => {
	res.render("error", {
		pageTitle: "Page Not Found",
		err: "invalid url please try again",
	});
});
module.exports = app;
