const DealWithFileSystem = require("../helper/dealWithFileSystem");
const DealWithArray = require("../helper/dealWithArray");
const path = require("path");
const booksJsonPath = path.join(__dirname, "../model/books.json");
const sortBy = (array, sortedBy) => {
	if (sortedBy === "title-desc")
		return DealWithArray.sortArrayBy(
			array,
			"arrayOfObject",
			"title",
			"string",
			"desc",
		);
	else if (sortedBy === "pagesNumber-asc") {
		return DealWithArray.sortArrayBy(
			array,
			"arrayOfObject",
			"bookPages",
			"number",
			"asc",
		);
	} else if (sortedBy === "pagesNumber-desc")
		return DealWithArray.sortArrayBy(
			array,
			"arrayOfObject",
			"bookPages",
			"number",
			"desc",
		);
	else
		return DealWithArray.sortArrayBy(
			array,
			"arrayOfObject",
			"title",
			"string",
			"asc",
		);
};

class BooksController {
	static allBooks = (req, res) => {
		let sortedBy = req.query.sortBy;
		let books = DealWithFileSystem.readFromFile(booksJsonPath);
		books = sortBy(books, sortedBy);
		res.status(200).render("home", { books, sortedBy });
	};
	static addBook = (req, res) => {
		res.status(200).render("addbook");
	};
	static addBookLogic = (req, res) => {
		let book;
		if (req.method == "POST") book = { id: Date.now(), ...req.body };
		else book = { id: Date.now(), ...req.query, bookPages: +bookPages };
		const books = DealWithFileSystem.readFromFile(booksJsonPath);
		books.push(book);
		DealWithFileSystem.writeToFile(booksJsonPath, books);
		res.status(200).render("addbook");
	};
	static getBook = (req, res) => {
		const id = req.params.id;
		const books = DealWithFileSystem.readFromFile(booksJsonPath);
		const book = DealWithArray.getElementBy(books, "id", +id);
		if (!book)
			res.render("error", { pageTitle: "invalid", err: "book not found" });
		res.status(200).render("book", { book });
	};
	static updateBook = (req, res) => {
		const id = req.params.id;
		const books = DealWithFileSystem.readFromFile(booksJsonPath);
		const book = DealWithArray.getElementBy(books, "id", +id);
		res.status(200).render("updatebook", { book });
	};

	static updateBookLogic = (req, res) => {
		const id = req.params.id;
		const books = DealWithFileSystem.readFromFile(booksJsonPath);
		const bookIndex = DealWithArray.getIndexOfElement(books, "id", +id);
		console.log(bookIndex);
		if (bookIndex < 0)
			return res.render("error", {
				pageTitle: "invalid",
				err: "book not found",
			});
		const existsBook = books[bookIndex];
		const updatedBook = { ...existsBook, ...req.body };
		books[bookIndex] = updatedBook;
		DealWithFileSystem.writeToFile(booksJsonPath, books);
		res.redirect("/");
	};
	static deleteBook = (req, res) => {
		const id = req.params.id;
		const books = DealWithFileSystem.readFromFile(booksJsonPath);
		const newBooks = DealWithArray.deleteElementFromArray(books, "id", +id);
		DealWithFileSystem.writeToFile(booksJsonPath, newBooks);
		res.redirect("/");
	};

	static searchForBook = (req, res) => {
		const { query } = req.query;
		let books = DealWithFileSystem.readFromFile(booksJsonPath);

		const book = DealWithArray.searchForStringInArray(
			books,
			query,
			"arrayOfObject",
			"title",
		);
		res.status(200).render("home", { books: [book] });
	};
	static checkIdParams = (req, res, next) => {
		const id = req.params.id;
		if (!id) res.render("error", { pageTitle: "invalid", err: "invalid id" });
		next();
	};
}
module.exports = BooksController;
