import { Transform } from 'class-transformer';

export function TransformToLowercase(): PropertyDecorator {
  return Transform((value: any) => value.value.toLowerCase());
}
