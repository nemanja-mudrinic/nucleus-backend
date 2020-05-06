import { Column, Entity } from 'typeorm';

import { BaseEntity } from './base.entity';
import { Expose } from 'class-transformer';

@Entity({ name: 'user' })
export class UserEntity extends BaseEntity {
  @Expose()
  @Column({ unique: true })
  email: string;

  @Expose()
  @Column()
  firstName: string;

  @Expose()
  @Column()
  lastName: string;

  @Expose()
  @Column()
  password: string;
}
