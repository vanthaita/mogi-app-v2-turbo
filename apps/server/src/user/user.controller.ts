import { Body, Controller, Post, Req, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/user.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService, 
  ) {}
  @UseGuards(AuthGuard)
  @UseInterceptors(FileInterceptor('file')) 
  @Post()
  async updateProfile(
    @Body() updateUserDto: UpdateUserDto,
    @UploadedFile() file: Express.Multer.File,
    @Req() req: Request,
  ) {
    console.log(req['user'].id);
    const userId = req['user'].id;
    if(!userId) {
      throw new Error('User not found');
    }
    return this.userService.update(updateUserDto, userId, file);
  }
}
