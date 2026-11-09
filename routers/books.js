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

    const book = await prisma.book.findUnique({
        where: {
            id,
        }
    })

    res.json(book);
})



export default router;