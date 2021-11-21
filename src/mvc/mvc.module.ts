import { Module } from "@nestjs/common";
import { AuthModule } from "../auth/auth.module";
import { MvcController } from "./mvc.controller";
import { UsersModule } from "../users/users.module";
import { LocationsModule } from "../locations/locations.module";

@Module({
    imports: [AuthModule, UsersModule, LocationsModule],
    controllers: [MvcController],
})
export class MvcModule {}
