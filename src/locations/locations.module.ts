import { Module } from "@nestjs/common";
import { LocationsService } from "./locations.service";
import { LocationsController } from "./locations.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "../users/users.entity";

@Module({
    imports: [TypeOrmModule.forFeature([User])],
    providers: [LocationsService],
    controllers: [LocationsController],
    exports: [LocationsService],
})
export class LocationsModule {}
