import { Body, Controller, Post, Req } from '@nestjs/common';
import { ProjectService } from './project.service';

@Controller('project')
export class ProjectController {
  constructor(private projectService: ProjectService) {}

  @Post('generate')
  generateProjectDetails(
    @Body() body: { title: string; description: string; techstack: string },
    @Req() request,
  ) {
    return this.projectService.generateProjectDetails(body, request);
  }
}
