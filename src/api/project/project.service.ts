import { Injectable } from '@nestjs/common';
import RetrieveInfoFromRequest from 'src/handlers/retriveInfoFromRequest.global';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ProjectService {
  constructor(private prisma: PrismaService) {}

  async generateProjectDetails(
    body: { title: string; description: string; techstack: string },
    request: any,
  ) {
    const { id, email } = await RetrieveInfoFromRequest(request);

    return {
      //   executeCommands: ['npx create-next-app@latest helloWorld'],
      createFiles: [
        {
          name: `readme.md`,
          content: `# Welcome to this project demo`,
        },
        {
          name: `TODO.md`,
          content: `- [ ] Setup base repo`,
        },
        // other files as required
      ],
    };
  }
}
