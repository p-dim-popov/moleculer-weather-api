import {
    Body,
    Controller,
    Get,
    HttpStatus,
    Post,
    Redirect,
    Render,
    Req,
    Res,
    UseFilters,
    UseGuards,
} from "@nestjs/common";
import { Request, Response } from "express";
import { AuthService } from "../auth/auth.service";
import { CookieJwtAuthGuard } from "../auth/cookie-jwt-auth.guard";
import { WannabeAuthUserDto } from "../auth/wannabe-auth-user.dto";
import { RequireLoginFilter } from "../require-login.filter";
import { UsersService } from "../users/users.service";
import { ApiExcludeController } from "@nestjs/swagger";

@ApiExcludeController()
@Controller()
export class MvcController {
    constructor(
        private authService: AuthService,
        private usersService: UsersService,
    ) {}

    @Get(["/", "dashboard"])
    @UseGuards(CookieJwtAuthGuard)
    @UseFilters(RequireLoginFilter)
    @Render("home")
    viewHome() {
        return ["Weather data1", "Weather data2"];
    }

    @Get("login")
    @Render("login")
    viewLogin() {
        return {};
    }

    @Post("login")
    async login(
        @Body() { email, password }: WannabeAuthUserDto,
        @Req() req: Request,
        @Res() res: Response,
    ) {
        const user = await this.authService.validateUser(email, password);
        if (!user) {
            return res.render("login", {
                errors: ["Invalid email or password!"],
            });
        }

        const { access_token } = await this.authService.login(user);
        res.cookie("access_token", access_token);
        const redirect = req.query.redirect as string;
        res.redirect(redirect ?? "/");
    }

    @Get("register")
    @Render("register")
    viewRegister() {
        return {};
    }

    @Post("register")
    async register(@Body() user: WannabeAuthUserDto, @Res() res: Response) {
        try {
            await this.usersService.register(user);
            res.redirect("/login");
            return;
        } catch (error) {
            return res.render("register", {
                errors: ["All fields are required!", "Emails are unique"],
            });
        }
    }

    @Get("logout")
    @Redirect("/")
    logout(@Res() res: Response) {
        res.clearCookie("access_token");
    }
}
