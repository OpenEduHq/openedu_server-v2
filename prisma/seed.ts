const { PrismaClient } = require('@prisma/client');
import { title } from 'process';
import * as Quizzes from './data/quiz/index';
const prisma = new PrismaClient();

async function main() {
  const GitQuiz = Quizzes.gitQuiz;

  await prisma.quiz.create({
    data: {
      title: GitQuiz.title,
      questions: {
        createMany: {
          data: GitQuiz.questions.map((question) => {
            return {
              question: question.Question,
              answers: question.Answer,
              distractor1: question.Distractor1,
              distractor2: question.Distractor2,
              distractor3: question.Distractor3,
              Explanation: question.Explanation,
              Link: question.Link,
            };
          }),
        },
      },
    },
  });
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
