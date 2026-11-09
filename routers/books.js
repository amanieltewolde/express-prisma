import prisma from "../libs/prisma.js";
import express from "express";

const router = express.Router();

// URL da usare '/books'

// INDEX
router.get('/', async (req, res) => {
    // res.send('List of books');
    const limit = req.query.limit;
    const skip = req.query.skip;

    const books = await prisma.book.findMany({
        select: {
            id: true,
            title: true,
            author: true,
            isbn: true,
            description: true,
        },
        take: limit ? Number(limit) : undefined,
        skip: skip ? Number(skip) : undefined,
    });

    res.json(books);
})

// SHOW
router.get('/:id', async (req, res) => {
    const id = Number(req.params.id);

    // validazione formato ID
    if (!Number.isInteger(id)) {
        return res.status(400).json({
            error: 'Invalid id',
        })
    }
    const book = await prisma.book.findUnique({
        where: {
            id,
        }
    })

    // validazione per risorsa esistente
    if (!book) {
        return res.status(404).json({
            error: 'Book you are looking for was not found.',
        })
    }
    res.json(book);
})

export default router;