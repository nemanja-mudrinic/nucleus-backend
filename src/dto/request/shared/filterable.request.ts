import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export abstract class FilterableRequest {
  @ApiProperty()
  @Expose()
  limit: number;

  @ApiProperty()
  @Expose()
  offset: number;
}