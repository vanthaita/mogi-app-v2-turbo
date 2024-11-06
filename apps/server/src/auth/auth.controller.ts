import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { Response, Request as ExpressRequest } from 'express';
import {
  Controller,
  Get,
  UseGuards,
  Request,
  Res,
  Req,
  UnauthorizedException,
  Body,
  Post,
} from '@nestjs/common';
import { AuthGuard as JWTAuthGuard } from './auth.guard';
import { SignInDto, SignUpDto } from './dto/auth.dto';

interface AuthenticatedRequest extends ExpressRequest {
  user: {
    accessToken: string;
    email: string;
  };
}

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('google')
  @UseGuards(AuthGuard('google'))
  googleLogin() {}

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  async googleLoginCallback(@Request() req: AuthenticatedRequest) {
    const googleToken = req.user.accessToken;
    const authRes = await this.authService.authenticate(googleToken);
    return {
      message: 'Logged in with Google',
      access_token: authRes.access_token,
      refresh_token: authRes.refresh_token,
    };
  }

  @UseGuards(JWTAuthGuard)
  @Get('profile')
  async getProfile(@Request() req: AuthenticatedRequest) {
    console.log("User: ", req.user); 
    if (req.user) {
      return await this.authService.getUser(req.user.email);
    }
    throw new UnauthorizedException('No access token');
  }

  @Get('logout')
  async logout(@Req() req: AuthenticatedRequest, @Res() res: Response) {
    res.clearCookie('access_token', { httpOnly: true, path: '/' });
    res.clearCookie('refresh_token', { httpOnly: true, path: '/' });
    res.redirect(`${process.env.NEXT_PUBLIC_URL}/`);
    return {
      message: 'Logged out',
    };
  }

  @UseGuards(JWTAuthGuard)
  @Get('check-token')
  async checkToken(@Request() req: AuthenticatedRequest, @Res() res: Response) {
    try {
      const refreshToken = req.cookies['refresh_token'];
      const { access_token } =
        await this.authService.getAccessTokenUser(refreshToken);
      return {
        message: 'Token is valid',
        access_token,
      };
    } catch (error) {
      if (error.message === 'Refresh token expired') {
        res
          .status(401)
          .send({ message: 'Refresh token has expired. Please login again.' });
      } else if (error.message === 'Invalid refresh token') {
        res
          .status(401)
          .send({ message: 'Invalid refresh token. Please login again.' });
      } else {
        res.status(500).send({ message: 'Internal server error.' });
      }
    }
  }

  @Post('sign-in')
  async signIn(@Body() signInDto: SignInDto, @Res() res: Response) {
    try {
      const { access_token, refresh_token } =
        await this.authService.signIn(signInDto);
      console.log(access_token, refresh_token);
      return res.status(200).json({
        message: 'Successfully logged in',
        access_token,
        refresh_token,
      });
    } catch (error) {
      return res.status(500).json({
        message: 'Login failed',
        error: error.message,
      });
    }
  }
  @Post('sign-up')
  async signUp(@Body() signUpDto: SignUpDto) {
    await this.authService.signUp(signUpDto);
    return { message: 'Sign Up successful' };
  }
}
