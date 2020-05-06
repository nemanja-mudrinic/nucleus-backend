import { UserEntity } from '../../../../entities';

import { uuid } from 'uuidv4';
import { mapToClass } from '../../../../utils/mapper/object.mapper';

export const VALID_USER_EMAIL = 'test@test.com';

export const USER_FIRST_NAME = 'Test';
export const USER_LAST_NAME = 'Test';
export const USER_PASSWORD = 'password';

export const getUser = (id?: string) => {
  return mapToClass(
    {
      id: id || uuid(),
      email: VALID_USER_EMAIL,
      firstName: USER_FIRST_NAME,
      lastName: USER_LAST_NAME,
      password: USER_PASSWORD,
      createdAt: new Date(2020,0,0,0),
      updatedAt: new Date(2020,0,0,0),
    },
    UserEntity,
  );
};

export const tokenServiceMock = () => ({

})