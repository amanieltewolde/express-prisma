import 'dotenv/config';
import { PrismaMariaDb } from "@prisma/adapter-mariadb";
import { PrismaClient } from "../generated/prisma/index.js";

const adapter = new PrismaMariaDb(process.env.DATABASE_URL);
const prisma = new PrismaClient({ adapter });

async function main() {
    console.log('Seeding started');
}

main().catch(e => {
    console.log(e);
    process.exit(1);
}).finally(() => prisma.$disconnect())