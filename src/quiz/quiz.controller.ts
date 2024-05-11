import { Body, Controller, Get, Header, Param, Post } from '@nestjs/common';
import { QuizService } from './quiz.service';

/*
 * UPDATE THE WAY IT OPERATES
 * user creates quiz -> make new test id and store it in USER.QUIZZES
 * return results from that
 */

@Controller('quiz')
export class QuizController {
  constructor(private quiz: QuizService) {}

  @Get()
  getAllQuizzes() {
    return this.quiz.getAllQuizzes();
  }

  // add reqest thresholder of 1m
  @Get('random/:noOfQuestions')
  getRandomQuestion(@Param('noOfQuestions') noOfQuestions: string) {
    return this.quiz.getRandomQuestion(noOfQuestions);
  }

  // add reqest thresholder of 1m
  @Get(':quizId/:noOfQuestions')
  getQuestions(
    @Param('quizId') quizId: string,
    @Param('noOfQuestions') noOfQuestions: string,
  ) {
    return this.quiz.getQuestions(quizId, noOfQuestions);
  }

  // add reqest thresholder of 1m
  // Auth Guard
  @Post('check/:questionId')
  // @UseGuards(JwtAuthGuard)
  checkAnswer(
    @Param('questionId') questionId: string,
    @Body() answer: { answer: string },
  ) {
    return this.quiz.checkAnswer(questionId, answer);
  }
}
