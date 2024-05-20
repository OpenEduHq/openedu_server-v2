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

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get('status')
  getHello(): string {
    return this.usersService.getHello();
  }

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
  @Put()
  updateUserDetails(@Req() request, @Body() dto: UserDto) {
    return this.usersService.updateUserDetails(request, dto);
  }
}
