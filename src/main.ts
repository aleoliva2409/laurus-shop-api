import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';

// import { ResponseInterceptor } from './shared/interceptors';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // app.useGlobalInterceptors(new ResponseInterceptor());

  await app.listen(3001);
}
bootstrap();
