import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
   origin: [
    'https://vegam-frontend.vercel.app/',
    'http://localhost:5173',
  ],
  });

  const port = process.env.PORT || 3000;
  await app.listen(port);
}

bootstrap();
