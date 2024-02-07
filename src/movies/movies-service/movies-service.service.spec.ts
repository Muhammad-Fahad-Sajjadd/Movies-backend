import { Test, TestingModule } from '@nestjs/testing';
import { MoviesServiceService } from './movies-service.service';

describe('MoviesServiceService', () => {
  let service: MoviesServiceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MoviesServiceService],
    }).compile();

    service = module.get<MoviesServiceService>(MoviesServiceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
