import { EntityRepository, Repository } from 'typeorm';

import { UserEntity } from '../entities';

@EntityRepository(UserEntity)
export class UserRepository extends Repository<UserEntity> {
  findOneByEmail(email: string): Promise<UserEntity> {
    return this.findOne({ where: { email } });
  }
}
