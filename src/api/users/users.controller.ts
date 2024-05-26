import {
  Body,
  Controller,
  Get,
  Param,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UserDto } from './dto/user.dto';
import { AuthGuard } from '@nestjs/passport';
import { Public } from 'src/custom.decorator/custom.decorator';
import { Settings } from 'http2';
import { SettingsDto } from './dto/settings.dto';

@Controller('user')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get('status')
  getHello(): string {
    return this.usersService.getHello();
  }

  //? Modift it for portfolioSite
  @Public()
  @Get(':userName')
  getUserPublicProfile(@Param('userName') username) {
    return this.usersService.getUserDetailsByUsername(username);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  getUserDetails(@Req() request) {
    return this.usersService.getUserDetails(request);
  }

  @UseGuards(AuthGuard('jwt'))
  @Put('updateUser')
  updateUserDetails(@Req() request, @Body() dto: UserDto) {
    return this.usersService.updateUserDetails(request, dto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('getSettings')
  getSettings(@Req() request) {
    return this.usersService.getUserSettings(request);
  }

  // // TODO update settings
  @UseGuards(AuthGuard('jwt'))
  @Put('updateSettings')
  updateSettings(@Req() request, @Body() dto: SettingsDto) {
    return this.usersService.updateSettings(request, dto);
  }

  // TODO fetching linkedin data using linkedin api
  @UseGuards(AuthGuard('jwt'))
  @Put('fetchLinkedinData')
  fetchLinkedinData(@Req() request) {
    return this.usersService.fetchLinkedinData(request);
  }

  // TODO fetching github data using github api
  @UseGuards(AuthGuard('jwt'))
  @Put('fetchGithubData')
  fetchGithubData(@Req() request) {
    return this.usersService.fetchGithubData(request);
  }

  // TODO my Progress, return all courses and their progress, quizzes, projects so on...
  @UseGuards(AuthGuard('jwt'))
  @Put('myProgress')
  myProgress(@Req() request) {
    return this.usersService.myProgress(request);
  }
}
