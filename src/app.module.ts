import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigModule } from "@nestjs/config";
import { UsersModule } from "./users/users.module";
import { AuthModule } from "./auth/auth.module";
import { MvcController } from './mvc/mvc.controller';
import { MvcModule } from './mvc/mvc.module';
import TypeOrmModuleConfig from "../ormconfig";

@Module({
    imports: [
        ConfigModule.forRoot(),
        TypeOrmModule.forRoot(TypeOrmModuleConfig),
        UsersModule,
        AuthModule,
        MvcModule,
    ],
    controllers: [AppController, MvcController],
    providers: [AppService],
})
export class AppModule {}
