import prisma from "../libs/prisma.js";

export async function index(req, res) {
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
}

export async function show(req, res) {
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
}

export async function store(req, res) {
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
}

export async function update(req, res) {
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
    res.json(updateBook);
}

export async function destroy(req, res) {
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
}