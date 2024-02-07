import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MoviesControllerController } from './movies/movies-controller/movies-controller.controller';

async function bootstrap() {
  const port = 3000;
  
  const app = await NestFactory.create(AppModule, { cors: true });

  try {
    const moviesController = app.get(MoviesControllerController);
    await moviesController.seedMoviesData();
  } catch (error) {
    console.error('Error seeding data:', error);
  }

  await app.listen(port);
  console.log(`Application is running on: ${await app.getUrl()}`);
}

bootstrap();
