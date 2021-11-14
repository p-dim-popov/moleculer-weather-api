import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { UsersModule } from "../users/users.module";
import { PassportModule } from "@nestjs/passport";
import { LocalStrategy } from "./local.strategy";
import { AuthController } from "./auth.controller";
import { JwtModule } from "@nestjs/jwt";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { JwtStrategy } from "./jwt.strategy";
import { CookieJwtStrategy } from "./cookie-jwt.strategy";

@Module({
    imports: [
        ConfigModule,
        UsersModule,
        PassportModule,
        JwtModule.registerAsync({
            useFactory: (config: ConfigService) => ({
                secret: config.get<string>("JWT__SECRET"),
                signOptions: {
                    expiresIn: config.get<string>("JWT__EXPIRATION_TIME"),
                },
            }),
            inject: [ConfigService],
            imports: [ConfigModule],
        }),
    ],
    providers: [AuthService, LocalStrategy, JwtStrategy, CookieJwtStrategy],
    exports: [AuthService],
    controllers: [AuthController],
})
export class AuthModule {}
