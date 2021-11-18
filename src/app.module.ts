import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigModule } from "@nestjs/config";
import { UsersModule } from "./users/users.module";
import { AuthModule } from "./auth/auth.module";
import { MvcModule } from "./mvc/mvc.module";
import { LocationsModule } from "./locations/locations.module";
import TypeOrmModuleConfig from "../ormconfig";

@Module({
    imports: [
        ConfigModule.forRoot(),
        TypeOrmModule.forRoot(TypeOrmModuleConfig),
        UsersModule,
        AuthModule,
        MvcModule,
        LocationsModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
