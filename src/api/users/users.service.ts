import { Injectable } from '@nestjs/common';
import handleErrors from 'src/handlers/handleErrors.global';
import RetrieveInfoFromRequest from 'src/handlers/retriveInfoFromRequest.global';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserDto } from './dto/user.dto';
import { error } from 'console';
import { SettingsDto } from './dto/settings.dto';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  getHello(): string {
    return 'Hello from Users Service!';
  }

  getUserDetailsByUsername(username: any) {
    return this.prisma.user
      .findUnique({
        where: {
          userName: username,
        },
      })
      .catch((error) => {
        handleErrors(error);
      });
  }

  getUserDetails(request: any) {
    const userId = RetrieveInfoFromRequest(request).id;

    return this.prisma.user
      .findUnique({
        where: {
          id: userId,
        },
      })
      .catch((error) => {
        handleErrors(error);
      });
  }

  updateUserDetails(request: any, dto: UserDto) {
    const userId = RetrieveInfoFromRequest(request).id;

    return this.prisma.user
      .update({
        where: {
          id: userId,
        },
        data: {
          githubId: dto.githubId,
          LinkdinId: dto.LinkdinId,
          portfolio: dto.portfolio,
        },
      })
      .catch((error) => {
        handleErrors(error);
      });
  }

  async fetchLinkedinData(request: any) {
    const userId = RetrieveInfoFromRequest(request).id;

    const user = await this.prisma.user
      .findUnique({
        where: {
          id: userId,
        },
      })
      .catch((error) => {
        handleErrors(error);
      });

    //! make api call, store it in db and return data
    return (user as unknown as any).LinkdinId;
  }

  async fetchGithubData(request: any) {
    const userId = RetrieveInfoFromRequest(request).id;

    const user = await this.prisma.user
      .findUnique({
        where: {
          id: userId,
        },
      })
      .catch((error) => {
        handleErrors(error);
      });
    //! make api call, store it in db and return data
    return (user as unknown as any).githubId;
  }

  async myProgress(request: any) {
    const userId = RetrieveInfoFromRequest(request).id;

    // const user = await this.prisma.user
    //   .findUnique({
    //     where: {
    //       id: userId,
    //     },
    //     include: {
    //       courses: {
    //         include: {
    //           courses: true,
    //           quizzes: true,
    //           projects: true,
    //         },
    //       },
    //     },
    //   })
    //   .catch((error) => {
    //     handleErrors(error);
    //   });

    // return user;
    throw new Error('Not implemented');
  }

  updateSettings(request: any, dto: SettingsDto) {
    throw new Error('Method not implemented.');
  }
}
