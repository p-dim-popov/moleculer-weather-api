import {HttpException, HttpStatus, Injectable} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./users.entity";
import { Repository } from "typeorm";
import * as bcrypt from "bcrypt";
import {WannabeAuthUserDto} from "../auth/wannabe-auth-user.dto";

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
    ) {}

    findAll(): Promise<User[]> {
        return this.usersRepository.find();
    }

    findOne(id: string): Promise<User> {
        return this.usersRepository.findOne(id);
    }

    async remove(id: string): Promise<void> {
        await this.usersRepository.delete(id);
    }

    async findOneByEmail(email: string) {
        return this.usersRepository.findOne({ where: { email } });
    }

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
