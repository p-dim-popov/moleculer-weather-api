import { Controller, Get, Request, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { ApiBearerAuth } from "@nestjs/swagger";
import { UsersService } from "./users.service";
import { UserDto } from "./user.dto";

@Controller("users")
export class UsersController {
    constructor(private usersService: UsersService) {}

    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @Get("me")
    async getProfile(@Request() req) {
        return await this.usersService.findOne(UserDto)(req.user.id);
    }
}
