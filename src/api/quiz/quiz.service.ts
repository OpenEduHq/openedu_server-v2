import {
  BadGatewayException,
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import {} from '@prisma/client'; // Import the questionOrderByWithRelationInput type
import {
  correctModalResponses,
  incorrectModalResponses,
} from 'src/static/modal-responses';
import handleErrors from 'src/handlers/handleErrors.global';

@Injectable()
export class QuizService {
  constructor(private prisma: PrismaService) {}

  getAllQuizzes() {
    return this.prisma.quiz.findMany({}).catch((error) => {
      handleErrors(error);
    });
  }

  async getRandomQuestion(noOfQuestions: string) {
    // ! Add extensive checks on noOfQuestions to prevent SQL Injection
    const results = await this.prisma
      .$queryRawUnsafe(
        // DO NOT pass in or accept user input here
        `SELECT * FROM "question" ORDER BY RANDOM() LIMIT $1;`,
        parseInt(noOfQuestions),
      )
      .catch((error) => {
        handleErrors(error);
      });

    return results;
  }

  async getQuestions(quizId: string, noOfQuestions: string) {
    const quiz = await this.prisma.quiz
      .findUnique({
        where: {
          id: quizId,
        },
      })
      .catch((error) => {
        handleErrors(error);
      });

    if (!quiz) {
      throw new BadRequestException(`Quiz with ${quizId} not present`);
    }

    const results = await this.prisma
      .$queryRawUnsafe(
        // DO NOT pass in or accept user input here
        `SELECT * FROM "question" WHERE "quizId" = '${quizId}' ORDER BY RANDOM() LIMIT ${noOfQuestions};`,
      )
      .catch((error) => {
        handleErrors(error);
      });

    if (!results) {
      throw new InternalServerErrorException('Something went wrong, try again');
    }

    return results;
  }

  async checkAnswer(
    questionId: string,
    userId: string,
    answer: { answer: string },
  ) {
    // console.log(questionId, userId, answer);
    const question = await this.prisma.question
      .findUnique({
        where: {
          id: questionId,
        },
      })
      .catch((error) => {
        handleErrors(error);
      });

    if (!question) {
      throw new BadRequestException(`Question with ${questionId} not present`);
    }

    if (question.answers == answer.answer) {
      return {
        status: true,
        message:
          correctModalResponses[
            Math.floor(Math.random() * correctModalResponses.length)
          ],
      };
    } else {
      return {
        status: false,
        message:
          incorrectModalResponses[
            Math.floor(Math.random() * incorrectModalResponses.length)
          ],
      };
    }
  }
}
