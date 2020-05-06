import { plainToClass } from 'class-transformer';
import { ClassType } from 'class-transformer/ClassTransformer';

export const mapToClass = <T>(payload: any, toClass: ClassType<T>) =>
  plainToClass(toClass, payload, { excludeExtraneousValues: true });
