import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import config from 'config';
import { TransformationInterceptor } from './responseInterceptor';
import cookieParser from 'cookie-parser';
import { NextFunction, raw, Request, Response } from 'express';
import csurf from 'csurf';
const ROOT_IGNORED_PATHS = ['/api/v1/orders/webhook'];

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { rawBody: true }); // Added cors: true for handling cross-origin requests

  app.use(cookieParser());

  app.use('/api/v1/orders/webhook', raw({ type: '*/*' }));

  const csrfMiddleware = csurf({
    cookie: true,
  });

  app.use((req: Request, res: Response, next: NextFunction) => {
    if (ROOT_IGNORED_PATHS.includes(req.path)) {
      return next();
    }
    return csrfMiddleware(req, res, next);
  });

  app.setGlobalPrefix(config.get('appPrefix'));

  // Any request passing through the application will be handled by this
  // Interceptor before reaching the corresponding route handler.
  app.useGlobalInterceptors(new TransformationInterceptor());
  await app.listen(config.get('port'), () => {
    return console.log(`Server is running on port ${config.get('port')}`);
  });
}

bootstrap();
