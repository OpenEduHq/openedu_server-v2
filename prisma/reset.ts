const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function reset() {
  try {
    await prisma.quiz.deleteMany();
    await prisma.question.deleteMany();
    await prisma.$disconnect();
    console.info('The data in the db has been reset');
  } catch (error) {
    console.error(error);
    await prisma.$disconnect();
  }
}

reset();
