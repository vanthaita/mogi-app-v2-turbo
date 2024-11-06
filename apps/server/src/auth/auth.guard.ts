import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest();

    const token = this.extractTokenFromRequest(request);

    if (!token) {
      throw new UnauthorizedException('Token not provided');
    }

    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: process.env.JWT_SECRET,
      });
      // Attach user information to the request object
      request['user'] = {
        id: payload.sub,
        email: payload.email,
      };
    } catch (error) {
      throw new UnauthorizedException('Invalid or expired token');
    }

    return true;
  }

  private extractTokenFromRequest(request: Request): string | undefined {
    const authHeader = request.headers['authorization'] || request.headers['Authorization'];
    if (typeof authHeader === 'string') {
      const [type, token] = authHeader.split(' ');
      console.log("Auth: ",authHeader);
      if (type === 'Bearer' && token) {
        return token;
      }
    }
    return request.cookies['access_token'];
  }
}
