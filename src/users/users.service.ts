import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./users.entity";
import { Repository } from "typeorm";
import * as bcrypt from "bcrypt";

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
}
