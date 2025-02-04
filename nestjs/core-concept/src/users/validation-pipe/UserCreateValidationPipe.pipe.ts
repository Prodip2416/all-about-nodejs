import {
  ArgumentMetadata,
  HttpException,
  HttpStatus,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { CreateUserDto } from '../dtos/createUser.dto';

@Injectable()
export class UserCreateValidationPipe implements PipeTransform {
  transform(value: CreateUserDto, metadata: ArgumentMetadata) {
    console.log(metadata);
    // Perform validation on the CreateUserDto here
    console.log('Validation Pipe Calling');

    const parseAge = parseInt(value.age.toString());
    if (isNaN(parseAge) || parseAge <= 0 || parseAge > 150) {
      throw new HttpException('Invalid age', HttpStatus.BAD_REQUEST);
    }
    return { ...value, age: parseAge };
  }
}
