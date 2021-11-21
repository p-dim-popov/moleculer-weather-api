import { HttpException, HttpStatus, Injectable, Type } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./users.entity";
import { Repository } from "typeorm";
import * as bcrypt from "bcrypt";
import { WannabeAuthUserDto } from "../auth/wannabe-auth-user.dto";
import { Mapper } from "../utils/Mapper";

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
    ) {}

    findOne =
        <T>(type: Type<T | User> = User) =>
        (id: string): Promise<T | User> =>
            this.usersRepository.findOne(id).then(Mapper.mapTo(type));

    async remove(id: string): Promise<void> {
        await this.usersRepository.delete(id);
    }

    findOneByEmail =
        (mappedType = User) =>
        (email: string) =>
            this.usersRepository
                .findOne({ where: { email } })
                .then(Mapper.mapTo(mappedType));

    async existsByEmail(email: string): Promise<boolean> {
        const user = await this.usersRepository.findOne({
            where: { email },
            select: ["id"],
        });

        return !!user?.id;
    }

    async create(email: string, password: string) {
        const hashedPassword = await bcrypt.hash(password, 12);
        await this.usersRepository.insert({ email, password: hashedPassword });
    }

    async register(user: WannabeAuthUserDto) {
        if (!user.email || !user.password) {
            throw new HttpException("Invalid data", HttpStatus.BAD_REQUEST);
        }

        const userExists = await this.existsByEmail(user.email);
        if (userExists) {
            throw new HttpException(
                "Not Acceptable",
                HttpStatus.NOT_ACCEPTABLE,
            );
        }

        await this.create(user.email, user.password);
    }
}
