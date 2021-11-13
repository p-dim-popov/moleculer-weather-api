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
import { AuthGuard } from "@nestjs/passport";
import { UsersService } from "../users/users.service";

@Controller("auth")
export class AuthController {
    constructor(private usersService: UsersService) {}

    @UseGuards(AuthGuard("local"))
    @Post("login")
    async login(@Request() req) {
        return req.user;
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
