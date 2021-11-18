import { ExtractJwt, Strategy } from "passport-jwt";
import { PassportStrategy } from "@nestjs/passport";
import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { UserDto } from "../users/user.dto";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private config: ConfigService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: !!config.get("IS_DEVELOPMENT"),
            secretOrKey: config.get<string>("JWT__SECRET"),
        });
    }

    async validate(payload: any): Promise<Partial<UserDto>> {
        return { id: payload.sub, email: payload.email };
    }
}
