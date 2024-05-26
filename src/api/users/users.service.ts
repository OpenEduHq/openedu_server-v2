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

  async getUserDetails(request: any) {
    const userId = RetrieveInfoFromRequest(request).id;

    return await this.prisma.user
      .findUnique({
        where: {
          id: userId,
        },
        include: {
          settings: {
            include: {
              emailSubscription: true,
            },
          },
        },
      })
      .catch((error) => {
        handleErrors(error);
      });
  }

  async updateUserDetails(request: any, dto: UserDto) {
    const userId = RetrieveInfoFromRequest(request).id;

    return await this.prisma.user
      .update({
        where: {
          id: userId,
        },
        data: {
          githubId: dto.githubId,
          linkdinId: dto.LinkdinId,
          portfolio: dto.portfolio,
        },
      })
      .catch((error) => {
        handleErrors(error);
      });
  }

  async getUserSettings(request: any) {
    const userId = RetrieveInfoFromRequest(request).id;

    return await this.prisma.user
      .findUnique({
        where: {
          id: userId,
        },
        include: {
          settings: {
            include: {
              emailSubscription: true,
            },
          },
        },
      })
      .catch((error) => {
        handleErrors(error);
      });
  }

  updateSettings(request: any, dto: SettingsDto) {
    const userId = RetrieveInfoFromRequest(request).id;

    return this.prisma.user
      .update({
        where: {
          id: userId,
        },
        data: {
          settings: {
            update: {
              emailSubscription: {
                update: {
                  courseUpdates: dto.emailSubscription.courseUpdates as boolean,
                  quizUpdates: dto.emailSubscription.quizUpdates as boolean,
                  announcements: dto.emailSubscription.announcements as boolean,
                  SecurityFeatures: dto.emailSubscription
                    .SecurityFeatures as boolean,
                  ProductUpgrades: dto.emailSubscription
                    .ProductUpgrades as boolean,
                },
              },
              publicProfile: dto.publicProfile as boolean,
              publicPortfolio: dto.publicPortfolio as boolean,
              publicBio: dto.publicBio as boolean,
              publicEmail: dto.publicEmail as boolean,
              publicGithub: dto.publicGithub as boolean,
              publicLinkdin: dto.publicLinkdin as boolean,
              publicProjects: dto.publicProjects as boolean,
              publicCourses: dto.publicCourses as boolean,
            },
          },
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
}
