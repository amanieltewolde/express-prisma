import 'dotenv/config';
import { PrismaMariaDb } from "@prisma/adapter-mariadb";
import { PrismaClient } from "../generated/prisma/index.js";

const adapter = new PrismaMariaDb(process.env.DATABASE_URL);
const prisma = new PrismaClient({ adapter });

async function main() {
    console.log('Seeding started');

    const categoryNames = ['poetry', 'crime_fiction', 'romance', 'drama', 'comics'];

    await prisma.category.createMany({
        data: categoryNames.map(cat => ({
            name: cat,
        }))
    })
}

main().catch(e => {
    console.log(e);
    process.exit(1);
}).finally(() => prisma.$disconnect())