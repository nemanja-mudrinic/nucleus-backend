import { plainToClass } from 'class-transformer';
import {
  ArgumentMetadata,
  PipeTransform,
} from '@nestjs/common/interfaces/features/pipe-transform.interface';
import { validate } from 'class-validator';

import { BadRequestException, ValidationException } from '..';
import { FieldErrorPayload } from '../../dto/response/application/error.response';

export class ValidationHandler implements PipeTransform {
  async transform(value, metadata: ArgumentMetadata) {
    if (!value) {
      throw new BadRequestException('No data submitted');
    }

    const { metatype } = metadata;
    if (!metatype || !this.toValidate(metatype)) {
      return value;
    }
    const object = plainToClass(metatype, value);
    const [errors] = await Promise.all([validate(object)]);
    if (errors.length > 0) {
      throw new ValidationException(this.buildError(errors));
    }
    return value;
  }

  private buildError(errors): FieldErrorPayload[] {
    const result = [];
    errors.forEach(el => {
      const prop = el.property;
      const propErrors = [];
      Object.entries(el.constraints).forEach(constraint => {
        propErrors.push(`${constraint[1]}`);
      });
      result.push({
        field: prop,
        error: propErrors,
      });
    });
    return result;
  }

  private toValidate(metatype): boolean {
    const types = [String, Boolean, Number, Array, Object];
    return !types.find(type => metatype === type);
  }
}
