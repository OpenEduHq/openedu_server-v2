import {
  Body,
  Controller,
  Get,
  Header,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { QuizService } from './quiz.service';
import { Public } from 'src/custom.decorator/custom.decorator';
import { AuthGuard } from '@nestjs/passport';
import RetrieveInfoFromRequest from 'src/handlers/retriveInfoFromRequest.global';

/*
 * UPDATE THE WAY IT OPERATES
 * user creates quiz -> make new test id and store it in USER.QUIZZES
 * return results from that
 */

@Controller('quiz')
export class QuizController {
  constructor(private quiz: QuizService) {}

  @Public()
  @Get()
  getAllQuizzes() {
    return this.quiz.getAllQuizzes();
  }

  // add reqest thresholder of 1m
  @Public()
  @Get('random/:noOfQuestions')
  getRandomQuestion(@Param('noOfQuestions') noOfQuestions: string) {
    return this.quiz.getRandomQuestion(noOfQuestions);
  }

  // add reqest thresholder of 1m
  @Public()
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
  @UseGuards(AuthGuard('jwt'))
  // @Public()
  checkAnswer(
    @Param('questionId') questionId: string,
    @Req() request,
    @Body() answer: { answer: string },
  ) {
    const userId = RetrieveInfoFromRequest(request).id;
    return this.quiz.checkAnswer(questionId, userId, answer);
  }
}
