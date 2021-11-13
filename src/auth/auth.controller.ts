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

@Controller("auth")
export class AuthController {
    constructor(
        private usersService: UsersService,
        private authService: AuthService,
    ) {}

    @UseGuards(LocalAuthGuard)
    @Post("login")
    async login(@Request() req) {
        return this.authService.login(req.user);
    }

    @HttpCode(HttpStatus.CREATED)
    @Post("register")
    async register(
        @Body("email") email: string,
        @Body("password") password: string,
    ) {
        if (!email || !password) {
            throw new HttpException("Invalid data", HttpStatus.BAD_REQUEST);
        }

        const userExists = await this.usersService.existsByEmail(email);
        if (userExists) {
            throw new HttpException(
                "Not Acceptable",
                HttpStatus.NOT_ACCEPTABLE,
            );
        }

        await this.usersService.create(email, password);
    }
}
