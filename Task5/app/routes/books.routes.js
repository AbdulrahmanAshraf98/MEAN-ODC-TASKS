const BooksController = require("../controller/books.controller");

const router = require("express").Router();

router.get("/", BooksController.allBooks);
router.get("/addBook", BooksController.addBook);
router.post("/addBook", BooksController.addBookLogic);
router.get(
	"/getBook/:id",
	BooksController.checkIdParams,
	BooksController.getBook,
);
router.get(
	"/updateBook/:id",
	BooksController.checkIdParams,
	BooksController.updateBook,
);
router.post(
	"/updateBook/:id",
	BooksController.checkIdParams,
	BooksController.updateBookLogic,
);
router.get(
	"/deleteBook/:id",
	BooksController.checkIdParams,
	BooksController.deleteBook,
);
router.get("/search", BooksController.searchForBook);

module.exports = router;
