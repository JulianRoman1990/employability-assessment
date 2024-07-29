import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';

//The method provided handles errors related to operations in the MongoDB database.

@Injectable()
export class ErrorService {
  createError(error: any) {
    if (error.name === 'MongoServerError' && error.code === 11000) {
      throw new BadRequestException(
        `The ${Object.keys(error.keyValue)} already exist`,
      );
    } else {
      throw new InternalServerErrorException(error.message);
    }
  }
}