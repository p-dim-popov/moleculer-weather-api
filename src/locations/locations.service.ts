import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { User } from "../users/users.entity";
import { InjectRepository } from "@nestjs/typeorm";
import * as lodash from "lodash";
import Locations from "./locations";
import { HttpService } from "@nestjs/axios";
import { LocationInfo } from "../http/weather-api/interfaces/current-weather.response";
import { firstValueFrom } from "rxjs";
import { PossibleLocation } from "../http/weather-api/interfaces/geocoding.response";

@Injectable()
export class LocationsService {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
        private httpService: HttpService,
    ) {}

    async findWeather(userId: string): Promise<LocationInfo[]> {
        const { locations } = await this.usersRepository.findOne({
            where: { id: userId },
            select: ["locations"],
        });

        return await Promise.all(
            locations.map((location) =>
                firstValueFrom(
                    this.httpService.get<LocationInfo>("/data/2.5/weather", {
                        params: {
                            q: location,
                            units: "metric",
                        },
                    }),
                ).then((value) => value.data),
            ),
        );
    }

    async searchLocations(location: string): Promise<PossibleLocation[]> {
        return await firstValueFrom(
            this.httpService.get<PossibleLocation[]>("/geo/1.0/direct", {
                params: {
                    q: location,
                    limit: 5,
                },
            }),
        ).then((value) => value.data);
    }

    async findAllOfUser(userId: string) {
        const { locations } = await this.usersRepository.findOne({
            where: { id: userId },
            select: ["locations"],
        });

        return locations;
    }

    async addLocations(locations: Locations, userId: string) {
        const user = await this.usersRepository.findOne(userId);
        user.locations = [...new Set([...user.locations, ...locations])];
        await this.usersRepository.save(user);
    }

    async deleteLocations(locations: Locations, userId: string) {
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
