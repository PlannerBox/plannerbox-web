import { Injectable } from '@nestjs/common';

@Injectable()
export class JsonResult {
  public static Success(data: any, message: string = null) {
    return {
      data: data,
      message: message,
    };
  }

  public static Convert(message: string) {
    return {
      message: message,
    };
  }
}
