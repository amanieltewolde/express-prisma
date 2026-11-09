import 'dotenv/config';
import { PrismaMariaDb } from "@prisma/adapter-mariadb";
import { PrismaClient } from "../generated/prisma/index.js";
import { faker } from '@faker-js/faker';

const adapter = new PrismaMariaDb(process.env.DATABASE_URL);
const prisma = new PrismaClient({ adapter });

function randIndex(lenght) {
    return Math.floor(Math.random() * lenght);
}

async function main() {
    console.log('Seeding started');

    await prisma.book.deleteMany();
    await prisma.category.deleteMany();

    const categoryNames = ['poetry', 'crime fiction', 'romance', 'drama', 'comics'];

    await prisma.category.createMany({
        data: categoryNames.map(cat => ({
            name: cat,
        }))
    })

    const categories = await prisma.category.findMany();
    console.log(categories)

    const books = [];
    for (let i = 0; i < 10; i++) {
        books.push({
            title: faker.book.title(),
            author: faker.book.author(),
            isbn: faker.commerce.isbn({ separator: '' }),
            description: faker.lorem.paragraph(),
            price: parseFloat((Math.random() * 300).toFixed(2)),
            categoryId: categories[randIndex(categories.length)].id,
        })
    }

    await prisma.book.createMany({
        data: books,
    })

    console.log('Seeding completed');

}

main().catch(e => {
    console.log(e);
    process.exit(1);
}).finally(() => prisma.$disconnect())