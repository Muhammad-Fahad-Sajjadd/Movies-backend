import { Test, TestingModule } from '@nestjs/testing';
import { RegisterControllerController } from './register-controller.controller';

describe('RegisterControllerController', () => {
  let controller: RegisterControllerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RegisterControllerController],
    }).compile();

    controller = module.get<RegisterControllerController>(RegisterControllerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
