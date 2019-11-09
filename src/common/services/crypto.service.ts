import { Injectable } from '@nestjs/common';
import { hash, compare } from 'bcryptjs';

@Injectable()
export class CryptoService {
  private readonly saltRounds = 10;

  async generateHash(value: string | undefined): Promise<string> {
    return hash(value, this.saltRounds);
  }

  async compareHash(
    value: string | undefined,
    hashValue: string | undefined,
  ): Promise<boolean> {
    return compare(value, hashValue);
  }
}
