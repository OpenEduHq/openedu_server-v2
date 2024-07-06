import { Inject, Injectable } from '@nestjs/common';
import Redis from 'ioredis';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CliauthService {
  constructor(
    private readonly prisma: PrismaService,
    @Inject('REDIS') private redisClient: Redis,
  ) {}

  getStatus(): string | PromiseLike<string> {
    return 'Cli Auth Service is running!';
  }

  async login(passkey: string) {
    if (!passkey) {
      throw new Error('No authorization header provided');
    }

    const newAuthHeader = passkey.split('?userId=');

    const token = newAuthHeader[0];
    const userId = newAuthHeader[1];

    const verificationCode = await this.redisClient.get(userId);

    if (!verificationCode) {
      throw new Error('No verification code found for user');
    }

    if (token !== verificationCode) {
      throw new Error('Invalid token');
    }

    await this.redisClient.del(userId);

    //! GENERATE CliToken

    return { cliToken: 'cliToken' };
  }

  async logout(authHeader: string) {
    if (!authHeader) {
      throw new Error('No authorization header provided');
    }

    const info = authHeader.split('?userId=');

    const token = info[0];
    const userId = info[1];

    const verified = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!verified) {
      throw new Error('Invalid user');
    }

    if (token !== verified.tokenCli) {
      throw new Error('Invalid token');
    }

    await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        tokenCli: null,
      },
    });

    return 'Successfully logged out';
  }

  async refresh(authHeader: string) {
    if (!authHeader) {
      throw new Error('No authorization header provided');
    }

    const info = authHeader.split('?userId=');

    const token = info[0];
    const userId = info[1];

    const verified = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!verified) {
      throw new Error('Invalid user');
    }

    if (token !== verified.tokenCli) {
      throw new Error('Invalid token');
    }

    //! GENERATE NEW CliToken
    await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        tokenCli: 'newToken',
      },
    });

    return 'Successfully logged out';
  }

  async verify(authHeader: string) {
    if (!authHeader) {
      throw new Error('No authorization header provided');
    }

    const info = authHeader.split('?userId=');

    const token = info[0];
    const userId = info[1];

    const verified = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!verified) {
      throw new Error('Invalid user');
    }

    if (token !== verified.tokenCli) {
      throw new Error('Invalid token');
    }

    return 'User available';
  }
}
