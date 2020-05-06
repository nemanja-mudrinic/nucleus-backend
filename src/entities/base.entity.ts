import {
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Expose } from "class-transformer";

export abstract class BaseEntity {
  @Expose()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Expose()
  @CreateDateColumn()
  createdAt: Date;

  @Expose()
  @UpdateDateColumn()
  updatedAt: Date;
}
