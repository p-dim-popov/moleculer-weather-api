import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { User } from "../users/users.entity";
import { InjectRepository } from "@nestjs/typeorm";
import * as lodash from "lodash";
import { ILocations } from "./locations";

@Injectable()
export class LocationsService {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
    ) {}

    async findWeather(userId: string) {
        const { locations } = await this.usersRepository.findOne({
            where: { id: userId },
            select: ["locations"],
        });

        return locations.map((l) => ({ name: l, }));
    }

    async searchLocations(location: string) {
        return await Promise.resolve(location);
    }

    async findAllOfUser(userId: string) {
        const { locations } = await this.usersRepository.findOne({
            where: { id: userId },
            select: ["locations"],
        });

        return locations;
    }

    async addLocations(locations: ILocations, userId: string) {
        const user = await this.usersRepository.findOne(userId);
        user.locations = [...new Set([...user.locations, ...locations])];
        await this.usersRepository.save(user);
    }

    async deleteLocations(locations: ILocations, userId: string) {
        const user = await this.usersRepository.findOne(userId);
        user.locations = lodash.without(user.locations, ...locations);
        await this.usersRepository.save(user);
    }

    async deleteAllLocations(userId: string) {
        const user = await this.usersRepository.findOne(userId);
        user.locations = [];
        await this.usersRepository.save(user);
    }
}
