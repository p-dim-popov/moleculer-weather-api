import {
    Body,
    Controller,
    HttpCode,
    HttpException,
    HttpStatus,
    Post,
    Request,
    UseGuards,
} from "@nestjs/common";
import { UsersService } from "../users/users.service";
import { LocalAuthGuard } from "./local-auth.guard";
import { AuthService } from "./auth.service";
import { WannabeAuthUserDto } from "./wannabe-auth-user.dto";

@Controller("auth")
export class AuthController {
    constructor(
        private usersService: UsersService,
        private authService: AuthService,
    ) {}

    @UseGuards(LocalAuthGuard)
    @Post("login")
    async login(@Body() user: WannabeAuthUserDto, @Request() req) {
        return this.authService.login(req.user);
    }

    @HttpCode(HttpStatus.CREATED)
    @Post("register")
    register(@Body() user: WannabeAuthUserDto) {
        return this.usersService.register(user);
    }
}
