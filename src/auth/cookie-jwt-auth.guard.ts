import { Injectable } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

@Injectable()
export class CookieJwtAuthGuard extends AuthGuard("cookie-jwt") {}
