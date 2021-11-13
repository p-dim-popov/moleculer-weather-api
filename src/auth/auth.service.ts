import { Injectable } from "@nestjs/common";
import { UsersService } from "../users/users.service";
import { User } from "../users/users.entity";
import * as bcrypt from "bcrypt";

@Injectable()
export class AuthService {
    constructor(private usersService: UsersService) {}

    async validateUser(
        email: string,
        password: string,
    ): Promise<Partial<User> | null> {
        const user = await this.usersService.findOneByEmail(email);
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return null;
        }

        const { password: _, ...result } = user;
        return result;
    }
}
