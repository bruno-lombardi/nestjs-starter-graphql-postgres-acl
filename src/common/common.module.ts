import { Module } from '@nestjs/common';
import { CryptoService } from './services/crypto.service';
import { PaginateService } from './services/paginate.service';

@Module({
  providers: [CryptoService, PaginateService],
  exports: [CryptoService, PaginateService],
})
export class CommonModule {}
