import prisma from "../libs/prisma.js";
import express from "express";

const router = express.Router();

// URL da usare '/books'
router.use(express.json());

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
        },
        include: {
            category: {
                select: {
                    id: true,
                    name: true,
                }
            }
        }, omit: {
            categoryId: true,
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

// STORE
router.post('/', async (req, res) => {
    const { title, author, isbn, description, price, categoryId } = req.body;

    const category = await prisma.category.findUnique({
        where: {
            id: categoryId,
        }
    })
    if (!category) return res.status(400).json({
        error: 'CategoryId is not valid'
    })

    const newBook = await prisma.book.create({
        data: {
            title,
            author,
            isbn,
            description,
            price,
            categoryId,
        },
        select: {
            id: true,
        }
    });

    res.status(201).json(newBook);
})

// UPDATE
router.patch('/:id', async (req, res) => {
    const id = Number(req.params.id);

    if (!Number.isInteger(id)) {
        return res.status(400).json({
            error: 'Invalid id',
        })
    }
    const { title, author, isbn, description, price, categoryId } = req.body;

    if (categoryId) {
        const category = await prisma.category.findUnique({
            where: {
                id: categoryId,
            }
        })
        if (!category) return res.status(400).json({
            error: 'CategoryId is not valid'
        })
    }

    const updateBook = await prisma.book.update({
        where: {
            id,
        },
        data: {
            title,
            author,
            isbn,
            description,
            price,
            categoryId,
        }
    })
    res.json(updateBook)
})

// DESTROY
router.delete('/:id', async (req, res) => {
    const id = Number(req.params.id);

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


    if (!book) {
        return res.status(404).json({
            error: 'Book you are looking for was not found.',
        })
    }

    await prisma.book.delete({
        where: {
            id,
        }
    })
    res.sendStatus(204);

})

export default router;