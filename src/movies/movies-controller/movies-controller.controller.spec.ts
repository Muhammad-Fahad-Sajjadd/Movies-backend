import { Test, TestingModule } from '@nestjs/testing';
import { MoviesControllerController } from './movies-controller.controller';

describe('MoviesControllerController', () => {
  let controller: MoviesControllerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MoviesControllerController],
    }).compile();

    controller = module.get<MoviesControllerController>(MoviesControllerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
