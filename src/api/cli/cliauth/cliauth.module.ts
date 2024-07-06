import { Module, Scope } from '@nestjs/common';
import { CliauthController } from './cliauth.controller';
import { CliauthService } from './cliauth.service';
import Redis from 'ioredis';
import { ConfigService } from '@nestjs/config';

@Module({
  controllers: [CliauthController],
  providers: [
    CliauthService,
    {
      provide: 'REDIS',
      useFactory: () => {
        const client = new Redis(process.env.REDDIS_URL);
        client.on('error', (err) => console.error('Redis error', err));
        return client;
      },
      scope: Scope.DEFAULT,
    },
    ConfigService,
  ],
  exports: [CliauthService, ConfigService],
})
export class CliauthModule {}
