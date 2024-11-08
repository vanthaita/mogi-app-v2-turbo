import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class RawBodyMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    // Log the request method and URL for debugging
    console.log(req.method, req.originalUrl);
    
    if (req.originalUrl === '/webhook') {
      req.setEncoding('utf8');
      let rawData = '';
      
      req.on('data', (chunk) => {
        rawData += chunk;
      });
      
      req.on('end', () => {
        req['rawBody'] = rawData; // Store raw data in a custom property
        next();
      });
    } else {
      next();
    }
  }
}
