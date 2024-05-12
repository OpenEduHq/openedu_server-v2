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

@Injectable()
export class QuizService {
  constructor(private prisma: PrismaService) {}

  getAllQuizzes() {
    try {
      return this.prisma.quiz.findMany({});
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException('Internal server error');
    }
  }

  async getRandomQuestion(noOfQuestions: string) {
    // ! Add extensive checks on noOfQuestions to prevent SQL Injection
    const results = await this.prisma.$queryRawUnsafe(
      // DO NOT pass in or accept user input here
      `SELECT * FROM "question" ORDER BY RANDOM() LIMIT $1;`,
      parseInt(noOfQuestions),
    );

    return results;
  }

  async getQuestions(quizId: string, noOfQuestions: string) {
    try {
      const quiz = await this.prisma.quiz.findUnique({
        where: {
          id: quizId,
        },
      });

      if (!quiz) {
        throw new BadRequestException(`Quiz with ${quizId} not present`);
      }

      const results = await this.prisma.$queryRawUnsafe(
        // DO NOT pass in or accept user input here
        `SELECT * FROM "question" WHERE "quizId" = '${quizId}' ORDER BY RANDOM() LIMIT ${noOfQuestions};`,
      );

      if (!results) {
        throw new InternalServerErrorException(
          'Something went wrong, try again',
        );
      }

      return results;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException('Internal Server Error');
    }
  }

  async checkAnswer(questionId: string, answer: { answer: string }) {
    const question = await this.prisma.question.findUnique({
      where: {
        id: questionId,
      },
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
