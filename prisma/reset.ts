const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function reset() {
  try {
    await prisma.Quiz.deleteMany();
    await prisma.Question.deleteMany();
    await prisma.User.deleteMany();
    await prisma.Course.deleteMany();
    await prisma.Project.deleteMany();
    await prisma.UserProject.deleteMany();
    await prisma.UserCourse.deleteMany();
    await prisma.UserQuiz.deleteMany();

    await prisma.$disconnect();
    console.info('The data in the db has been reset');
  } catch (error) {
    console.error(error);
    await prisma.$disconnect();
  }
}

reset();
