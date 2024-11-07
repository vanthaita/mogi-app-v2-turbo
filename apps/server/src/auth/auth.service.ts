import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma.service';
import axios from 'axios';
import { SignInDto, SignUpDto, UserDto } from './dto/auth.dto';
import { User } from '@prisma/client';
import * as argon2 from 'argon2';
type UserWithoutSensitiveInfo = {
  id: string;
  name: string;
  email: string;
  picture: string;
  providerId: string;
  familyName: string;
  givenName: string;
  createdAt: Date;
  updatedAt: Date;
};
@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private prismaService: PrismaService,
  ) {}

    async authenticate(token: string) {
        const profile = await this.getProfile(token);

        let user = await this.prismaService.user.findUnique({
        where: {
            email: profile.data.email,
        },
        });

        if (!user) {
        const userDto = <UserDto>{
            email: profile.data.email,
            name: profile.data.name,
            givenName: profile.data.given_name,
            familyName: profile.data.family_name,
            picture: profile.data.picture,
            providerId: profile.data.id,
        };
        user = await this.prismaService.user.create({
            data: {
            email: userDto.email,
            name: userDto.name,
            givenName: userDto.givenName,
            familyName: userDto.familyName,
            picture: userDto.picture,
            providerId: userDto.providerId,
            },
        });
        }
        const payload = { sub: user.id, email: user.email };
        const refreshToken = this.jwtService.sign(payload, { expiresIn: '7d' });

        await this.prismaService.user.update({
        where: { id: user.id },
        data: { refreshToken },
        });

        return {
        access_token: this.jwtService.sign(payload),
        refresh_token: refreshToken,
        };
    }

    async getAccessTokenUser(refreshToken: string) {
        try {
        const payload = await this.jwtService.verifyAsync(refreshToken, {
            secret: process.env.JWT_SECRET,
        });
        if (!payload) {
            throw new Error('Invalid refresh token.');
        }
        const user = await this.prismaService.user.findFirst({
            where: { refreshToken },
        });

        if (!user) {
            throw new Error('User not found or invalid refresh token.');
        }

        const tokenExpiry = payload.exp * 1000;
        if (Date.now() > tokenExpiry) {
            throw new Error('Refresh token expired.');
        }

        const newAccessToken = this.jwtService.sign(
            { sub: user.id, email: user.email },
            { expiresIn: '1h' },
        );
        return { access_token: newAccessToken };
        } catch (err) {
        if (err.message === 'Refresh token expired.') {
            throw new Error('Refresh token expired');
        }
        console.error('Failed to refresh the access token:', err.message);
        throw new Error('Invalid refresh token.');
        }
    }

    async getProfile(token: string) {
        try {
        return axios.get(
            `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${token}`,
        );
        } catch (error) {
        console.error('Failed to revoke the token:', error);
        }
    }

    async getNewAccessToken(refreshToken: string): Promise<string> {
        try {
        const response = await axios.post(
            'https://www.googleapis.com/oauth2/v4/token',
            `client_id=${process.env.GOOGLE_CLIENT_ID}&client_secret=${process.env.GOOGLE_CLIENT_SECRET}&refresh_token=${refreshToken}&grant_type=refresh_token`,
        );

        return response.data.access_token;
        } catch (error) {
        throw new Error('Failed to refresh the access token.');
        }
    }

    async getUser(email: string): Promise<UserWithoutSensitiveInfo> {
        try {
        return await this.prismaService.user.findUnique({
            where: { email },
            select: {
            id: true,
            name: true,
            email: true,
            picture: true,
            providerId: true,
            familyName: true,
            givenName: true,
            createdAt: true,
            updatedAt: true,
            // No need to include passwordHash and refreshToken here
            },
        });
        } catch (error) {
        throw new Error('Failed to get user.');
        }
    }
    async isTokenExpired(token: string): Promise<boolean> {
        try {
        const response = await axios.get(
            `https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=${token}`,
        );

        const expiresIn = response.data.expires_in;

        if (!expiresIn || expiresIn <= 0) {
            return true;
        }
        } catch (error) {
        return true;
        }
    }
    async revokeToken(token: string): Promise<void> {
        try {
        await axios.get(
            `https://accounts.google.com/o/oauth2/revoke?token=${token}`,
        );
        } catch (error) {
        console.error('Failed to revoke the token:', error);
        }
    }

    //  Sign In
    async signIn(signInDto: SignInDto) {
        const { password, email } = signInDto;

        const user = await this.prismaService.user.findUnique({
        where: {
            email: email,
        },
        });
        if (!user) {
        throw new UnauthorizedException('User not found');
        }
        const passwordMatch = await argon2.verify(user.passwordHash, password);
        if (!passwordMatch) {
        throw new UnauthorizedException('Password is incorrect');
        }
        const payload = { sub: user.id, email: user.email };
        const refreshToken = this.jwtService.sign(payload, { expiresIn: '7d' });
        await this.prismaService.user.update({
        where: { id: user.id },
        data: { refreshToken },
        });
        return {
        access_token: this.jwtService.sign(payload),
        refresh_token: refreshToken,
        };
    }

    async signUp(signUpDto: SignUpDto) {
        const { email, name, password } = signUpDto;
        
        // Check if the user already exists
        const existingUser = await this.prismaService.user.findUnique({
            where: { email },
        });
        
        if (existingUser) {
            throw new ConflictException('User already exists');
        }

        // Hash the password
        const hashedPassword = await argon2.hash(password);
        
        // Create a new Stripe customer

        // Create the user in the database
        // const newUser = await this.prismaService.user.create({
        //     data: {
        //         email,
        //         name,
        //         passwordHash: hashedPassword,
        //         providerId: 'jwt3091283lkfjk',
        //         stripeCustomerId: stripeCustomer.id, // Store the Stripe customer ID in the User model
        //     },
        // });

        // await this.prismaService.stripeSubscription.create({
        //     data: {
        //         userId: newUser.id,
        //         stripeCustomerId: stripeCustomer.id,
        //         status: 'inactive', // Set to 'inactive' until the user subscribes
        //         currentPeriodStart: null,
        //         currentPeriodEnd: null,
        //     },
        // });

        return {
            message: 'User successfully registered',
            // userId: newUser.id,
            // email: newUser.email,
        };
    }
}
