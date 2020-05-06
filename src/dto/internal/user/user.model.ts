import { Expose } from 'class-transformer';

export class UserModel {
  @Expose()
  id: string;
  @Expose()
  firstName: string;
  @Expose()
  lastName: string;
  @Expose()
  email: string;
  @Expose()
  createdAt: Date;
  @Expose()
  updatedAt: Date;
}
