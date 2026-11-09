import prisma from "../libs/prisma.js";
import express from "express";

const router = express.Router();

// URL da usare '/books'

router.get('/', async (req, res) => {
    // res.send('List of books');

    const books = await prisma.book.findMany({
        select: {
            id: true,
            title: true,
            author: true,
            isbn: true,
            description: true,
        },
    });

    res.json(books);
})

export default router;