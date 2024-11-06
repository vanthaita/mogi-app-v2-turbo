import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/user.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService, 
  ) {}
  @UseGuards(AuthGuard)
  @Post()
  async updateProfile(
    @Body() updateUserDto: UpdateUserDto,
    @Req() req: Request,
  ) {
    console.log(req['user'].id);
    const userId = req['user'].id;
    if(!userId) {
      throw new Error('User not found');
    }
    return this.userService.update(updateUserDto, userId);
  }
}
