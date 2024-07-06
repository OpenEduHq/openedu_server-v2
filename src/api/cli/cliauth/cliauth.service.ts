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

  logout(authHeader: string) {
    if (!authHeader) {
      throw new Error('No authorization header provided');
    }

    const verified = this.prisma.user.update({
            where: { 
                cliToken: authHeader
             },
            data: { cliToken: null },
        },
        );
    )
  }

  refresh(authHeader: string) {
    throw new Error('Method not implemented.');
  }
  verify(authHeader: string) {
    throw new Error('Method not implemented.');
  }
}
