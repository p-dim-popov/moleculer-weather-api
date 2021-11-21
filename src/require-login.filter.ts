import {
    ArgumentsHost,
    Catch,
    ExceptionFilter,
    HttpException,
    HttpStatus,
} from "@nestjs/common";
import { Request, Response } from "express";

@Catch()
export class RequireLoginFilter<T extends HttpException>
    implements ExceptionFilter
{
    catch(exception: T, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const status = exception?.getStatus?.();

        if (status !== HttpStatus.UNAUTHORIZED) {
            throw exception;
        }

        const request = ctx.getRequest<Request>();

        response
            .clearCookie("access_token")
            .status(status)
            .redirect(
                `/login?${new URLSearchParams({ redirect: request.url })}`,
            );
    }
}
