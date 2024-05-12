import {
  ForbiddenException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import SignUpDto from './dto/signup.dto';
import SignInDto from './dto/signin.dto';
import handleErrors from 'src/handlers/handleErrors.global';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  getHello(): string {
    return 'Hello from Auth Service!';
  }

  async signUp(body: SignUpDto, response) {
    const { name, email, password, userName } = body;

    if (!userName || !email || !password || !name) {
      throw new ForbiddenException('Missing required fields');
    }

    if (
      password.length < 8 ||
      !/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/.test(
        password,
      )
    ) {
      throw new ForbiddenException(
        'Password must be at least 8 characters long and contain at least one lowercase letter, one uppercase letter, one numeric digit, and one special character',
      );
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      throw new ForbiddenException('Invalid email format');
    }

    const token = Math.random().toString(36).substring(2);
    const user = await this.prisma.user
      .create({
        data: {
          token,
          role: 'USER',
          name,
          email,
          password,
          userName,
        },
      })
      .catch((error) => {
        handleErrors(error);
      });

    const payload = {
      sub: (user as { id: string }).id,
      email: (user as { email: string }).email,
      token: (user as { token: string }).token,
      password: (user as { password: string }).password,
    };

    const access_token: string = this.jwtService.sign(payload) || '';

    // Set the access_token as a cookie
    response.cookie('access_token', access_token, { httpOnly: true });

    delete (user as { password: string }).password;
    return user;
  }

  async signIn(body: SignInDto, response) {
    const { email, password } = body;

    if (!email || !password) {
      throw new HttpException(
        'Missing required fields',
        HttpStatus.BAD_REQUEST,
      );
    }

    const user = await this.prisma.user
      .findUnique({
        where: {
          email,
        },
      })
      .catch((error) => {
        handleErrors(error);
      });

    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    if (user.password !== password) {
      throw new HttpException('Invalid password', HttpStatus.UNAUTHORIZED);
    }

    const payload = {
      sub: (user as { id: string }).id,
      email: (user as { email: string }).email,
      token: (user as { token: string }).token,
      password: (user as { password: string }).password,
    };

    const access_token: string = this.jwtService.sign(payload) || '';

    // Set the access_token as a cookie
    response.cookie('access_token', access_token, { httpOnly: true });

    delete (user as { password: string }).password;
    return user;
  }
}
