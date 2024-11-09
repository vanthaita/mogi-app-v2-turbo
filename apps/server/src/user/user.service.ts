import { HttpException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { UpdateUserDto } from './dto/user.dto';
import { CloudinaryService } from '../cloudinary/cloudinary.service';

@Injectable()
export class UserService {
    constructor(
        private readonly prismaService: PrismaService,
        private readonly cloudinaryService: CloudinaryService
    ) {}
    async update(updateUserDto: UpdateUserDto, userId: string, file?: Express.Multer.File) {
        const user = await this.prismaService.user.findUnique({
            where: { id: userId },
        });
        if (!user) {
            throw new HttpException('User not found', 400);
        }
        if (file) {
            const uploadedImage = await this.cloudinaryService.uploadFile(file);
            console.log(uploadedImage);
            updateUserDto.picture = uploadedImage.url;
        }

        return await this.prismaService.user.update({
            where: { id: userId },
            data: updateUserDto,
            select: {
                name: true,
                familyName: true,
                givenName: true,
                picture: true,
            },
        });
    }
    
}
 