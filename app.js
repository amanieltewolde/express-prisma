import express from "express"
import booksRouter from './routers/books.js'
import errorsHandler from "./middlewares/errorsHandler.js";
import notFound from "./middlewares/notFound.js";

// set up
const app = express();
const port = 3000;

// set up routing
app.get('/', (req, res) => res.send('This is the Homepage'));

// crud for books
app.use('/books', booksRouter);

// registrazione middleware per errori server side(500)
app.use(errorsHandler);

// registrazione middleware per risorse non trovate(404)
app.use(notFound);

// start server
app.listen(port, () => console.log('Server Started on http://localhost:' + port));