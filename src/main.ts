import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({ // dto사용을 위해
      transform: true, // 클라이언트에서 보낸 json형태의 데이터를 dto에서 쓸 수 있게 변환
    }),
  );

  await app.listen(3000);
}

bootstrap();