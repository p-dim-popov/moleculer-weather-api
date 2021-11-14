import { NestFactory } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { AppModule } from "./app.module";
import { version } from "../package.json";
import * as path from "path";
import { NestExpressApplication } from "@nestjs/platform-express";
import * as cookieParser from "cookie-parser";
import { create } from "express-handlebars";

const hbs = create({
    extname: "hbs",
});

async function bootstrap() {
    const app = await NestFactory.create<NestExpressApplication>(AppModule);
    app.use(cookieParser());
    app.enableCors();
    app.useStaticAssets(path.join(__dirname, "..", "public"));
    app.setBaseViewsDir(path.join(__dirname, "..", "views"));
    app.engine("hbs", hbs.engine);
    app.set("view engine", "hbs");

    const config = new DocumentBuilder()
        .setVersion(version)
        .addBearerAuth({
            description:
                "Please enter token in following format: Bearer ${JWT}",
            name: "Authorization",
            bearerFormat: "Bearer",
            scheme: "Bearer",
            type: "http",
            in: "Header",
        })
        .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup("docs", app, document);

    await app.listen(3000);
}
bootstrap();
