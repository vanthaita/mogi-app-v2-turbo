import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import cookieParser from 'cookie-parser';
import {
  ExpressAdapter,
  NestExpressApplication,
} from '@nestjs/platform-express';
import { ConfigService } from '@nestjs/config';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { TimeoutInterceptor } from './interceptor/TimeoutInterceptor.interceptor';
import * as bodyParser from 'body-parser';
import { json, urlencoded } from 'express';
async function bootstrap() {
    const app = await NestFactory.create<NestExpressApplication>(
        AppModule,
        new ExpressAdapter(),
    );
    app.useGlobalInterceptors(new TimeoutInterceptor());
    const configService = app.get(ConfigService);
    const PORT = configService.get<string>('PORT') || 8386;
    const HOST = configService.get<string>('HOST') || '0.0.0.0';
    const URL =
        configService.get<string>('NEXT_PUBLIC_URL') || 'http://localhost:3000';
    app.enableCors({
        origin: URL,
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        credentials: true,
        allowedHeaders: 'Authorization, Content-Type',
    });
    app.use('/webhook', bodyParser.raw({ type: 'application/json' }));
    app.use(json());
    app.use(urlencoded({ extended: true }));
    // app.use('/webhook', express.raw({ type: 'application/json' }));
    app.use(cookieParser());
    // app.use('/webhook', (req, res, next) => {
    //     new RawBodyMiddleware().use(req, res, next);
    // });
    
    const config = new DocumentBuilder()
        .setTitle('Mogi')
        .setDescription('Mogi - AI MOCK INTERVIEW')
        .addCookieAuth()
        .setVersion('1.0')
        .addTag('Kapi')
        .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);

    await app.listen(PORT, HOST);
    console.log(`Server running at http://${HOST}:${PORT}`);
}

bootstrap();
