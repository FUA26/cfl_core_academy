import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AllConfigType } from './configs/config.type';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService) as ConfigService<AllConfigType>;

  app.setGlobalPrefix(
    configService.getOrThrow('app.apiPrefix', { infer: true }),
    {
      exclude: ['/'],
    },
  );

  const options = new DocumentBuilder()
    .setTitle('Naira API Explorer')
    .setDescription(
      'Explore the capabilities of our API with detailed endpoints information, request samples, and response schemas.',
    )
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('docs', app, document);

  await app.listen(configService.get('app.port', { infer: true }));
}
bootstrap();
