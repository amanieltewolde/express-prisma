import express from "express"
import booksRouter from './routers/books.js'
import errorsHandler from "./middlewares/errorsHandler.js";

// set up
const app = express();
const port = 3000;

// set up routing
app.get('/', (req, res) => res.send('This is the Homepage'));

// crud for books
app.use('/books', booksRouter);

// registrazione middleware per errori server side
app.use(errorsHandler);

// start server
app.listen(port, () => console.log('Server Started on http://localhost:' + port));