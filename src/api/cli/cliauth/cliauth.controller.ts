import { Controller, Get, Headers } from '@nestjs/common';
import { CliauthService } from './cliauth.service';

@Controller('cliauth')
export class CliauthController {
  constructor(private readonly cliauthService: CliauthService) {}

  @Get('status')
  async getStatus(): Promise<string> {
    return await this.cliauthService.getStatus();
  }

  @Get('login')
  async login(@Headers('authorization') passkey: string) {
    return await this.cliauthService.login(passkey);
  }

  @Get('logout')
  async logout(@Headers('authorization') authHeader: string) {
    return await this.cliauthService.logout(authHeader);
  }

  @Get('refresh')
  async refresh(@Headers('authorization') authHeader: string) {
    return await this.cliauthService.refresh(authHeader);
  }

  @Get('verify')
  async verify(@Headers('authorization') authHeader: string) {
    return await this.cliauthService.verify(authHeader);
  }
}
