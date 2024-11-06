import { HttpException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { UpdateUserDto } from './dto/user.dto';

@Injectable()
export class UserService {
    constructor(
        private readonly prismaService: PrismaService
    ) {}


    async update(updateUserDto: UpdateUserDto, userId: string) {
        const user = await this.prismaService.user.findUnique({
            where: { id: userId },
        })
        if(!user) {
            return new HttpException("User not found", 400)
        }
        return await this.prismaService.user.update({
            where: { id: userId },
            data: updateUserDto,
            select: {
                name: true,
                familyName: true,
                givenName: true,
            }
        })
    }
}
 