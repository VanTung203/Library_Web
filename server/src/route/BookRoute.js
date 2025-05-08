const express = require('express');
const router = express.Router();

const ControllerBook = require('../Controller/ControllerBook');
// books
router.post('/api/addbook', ControllerBook.AddBook);
router.get('/api/books', ControllerBook.GetBooks);
router.post('/api/deletebook', ControllerBook.DeleteBook);
router.post('/api/editbook', ControllerBook.UpdateBook);
router.post('/api/requestbook', ControllerBook.HandleRequestBook);
router.get('/api/search', ControllerBook.SearchProduct);
router.post('/api/extendsbook', ControllerBook.ExtendsBook);
router.post('/api/deletebooks', ControllerBook.DeleteBooks);

module.exports = router;
