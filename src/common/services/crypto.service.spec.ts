import { Test, TestingModule } from '@nestjs/testing';
import { CryptoService } from './crypto.service';

describe('CryptoService', () => {
  let service: CryptoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CryptoService],
    }).compile();

    service = module.get<CryptoService>(CryptoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(service.compareHash).toBeDefined();
    expect(service.generateHash).toBeDefined();
    expect(typeof service.compareHash).toEqual('function');
    expect(typeof service.generateHash).toEqual('function');
  });

  it('should generate hash correctly', async () => {
    const valueToHash = 'abcd000012';
    const hash = await service.generateHash(valueToHash);
    expect(hash).toBeTruthy();
    expect(hash).toMatch(/^\$2[ayb]\$.{56}$/);
  });

  it('should return true when compare hash is correct', async () => {
    const valueToHash = 'abcd000012';
    const hash = await service.generateHash(valueToHash);
    const result = await service.compareHash(valueToHash, hash);
    expect(result).toBeTruthy();
  });

  it('should return false when compare hash is wrong', async () => {
    const valueToHash = 'abcd000012';
    const hash = await service.generateHash(valueToHash);
    const result = await service.compareHash('wrongValue', hash);
    expect(result).toBeFalsy();
  });
});
