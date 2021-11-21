import { Module } from "@nestjs/common";
import { LocationsService } from "./locations.service";
import { LocationsController } from "./locations.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "../users/users.entity";
import { HttpModule } from "@nestjs/axios";
import { ConfigModule, ConfigService } from "@nestjs/config";

@Module({
    imports: [
        ConfigModule,
        TypeOrmModule.forFeature([User]),
        HttpModule.registerAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => ({
                baseURL: "https://api.openweathermap.org",
                params: {
                    appid: configService.get<string>("WEATHER_API__KEY"),
                },
            }),
        }),
    ],
    providers: [LocationsService],
    controllers: [LocationsController],
    exports: [LocationsService],
})
export class LocationsModule {}
