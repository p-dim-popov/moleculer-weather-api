import { Injectable } from "@nestjs/common";
import { UsersService } from "../users/users.service";
import * as bcrypt from "bcrypt";
import { JwtService } from "@nestjs/jwt";
import { UserDto } from "../users/user.dto";

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
    ) {}

    async validateUser(
        email: string,
        password: string,
    ): Promise<UserDto | null> {
        const user = await this.usersService.findOneByEmail()(email);
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return null;
        }

        const { password: _, ...result } = user;
        return result;
    }

    async login(user: UserDto) {
        const payload = { email: user.email, sub: user.id };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }
}
