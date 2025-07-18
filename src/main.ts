import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
// import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: process.env.DB_HOST,
    credentials: true
  })
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(process.env.PORT ?? 3000);


  // No se aplica aun Swagger por tema de incompatibilidad con la version de NestJS entre el nodemailer y el swagger
  
  // const swaggerConfig = new DocumentBuilder()
  //   .setTitle('Mootscale API')
  //   .setDescription('API for Mootscale, Una plataforma de ecommerce para todo lo relacionado a motos a escala')
  //   .setVersion('1.0')
  //   .addTag('mootscale')
  //   .build();

  //   const document = SwaggerModule.createDocument(app, swaggerConfig);
  //   SwaggerModule.setup('api', app, document);
}
bootstrap();
