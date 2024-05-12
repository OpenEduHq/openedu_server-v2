import { Body, Controller, Get, Post, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import SignUpDto from './dto/signup.dto';
import { Public } from 'src/custom.decorator/custom.decorator';
import SignInDto from './dto/signin.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Get()
  getHello(): string {
    return this.authService.getHello();
  }

  @Public()
  @Post('signup')
  signUp(@Body() body: SignUpDto, @Res({ passthrough: true }) response) {
    return this.authService.signUp(body, response);
  }

  // Add more routes here

  @Public()
  @Post('signin')
  login(@Body() body: SignInDto, @Res({ passthrough: true }) response) {
    return this.authService.signIn(body, response);
  }
}
