import { Test, TestingModule } from '@nestjs/testing';
import { CloudServicesService } from './cloud-services.service';

describe('CloudServicesService', () => {
  let service: CloudServicesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CloudServicesService],
    }).compile();

    service = module.get<CloudServicesService>(CloudServicesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
