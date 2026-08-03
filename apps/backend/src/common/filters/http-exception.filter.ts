import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();

    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const exceptionResponse =
      exception instanceof HttpException
        ? exception.getResponse()
        : 'Internal Server Error';

    let message = 'Unexpected error';

    if (typeof exceptionResponse === 'string') {
      message = exceptionResponse;
    } else if (
      typeof exceptionResponse === 'object' &&
      exceptionResponse !== null &&
      'message' in exceptionResponse
    ) {
      const exceptionMessage = exceptionResponse.message;

      message = Array.isArray(exceptionMessage)
        ? exceptionMessage.join(', ')
        : String(exceptionMessage);
    }

    response.status(status).json({
      success: false,
      message,
      error: {
        statusCode: status,
        code: HttpStatus[status] ?? 'UNKNOWN_ERROR',
      },
      path: request.url,
      timestamp: new Date().toISOString(),
    });
  }
}
