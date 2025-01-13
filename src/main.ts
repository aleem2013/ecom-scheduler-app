import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //Global validation pipe
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  //Swagger setup
  const config = new DocumentBuilder()
    .setTitle('Ecom Job Scheduler API')
    .setDescription('API documentation for Ecom Job Scheduler')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
