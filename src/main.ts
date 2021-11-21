import { NestFactory } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { AppModule } from "./app.module";
import { version } from "../package.json";
import * as path from "path";
import { NestExpressApplication } from "@nestjs/platform-express";
import * as cookieParser from "cookie-parser";
import { create } from "express-handlebars";
import * as timezones from "./data/timezones.json";

const hbs = create({
    extname: "hbs",
    helpers: {
        json: (context) => JSON.stringify(context),
        formatTzCode: (code: number, format: string) => {
            const timezone = timezones.find((x) => x.code === String(code));
            return Object.entries(timezone).reduce(
                (result, [key, value]) =>
                    result.replace(new RegExp(`(\{\{${key}\}\})+`), value),
                format,
            );
        },
    },
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
        .setDescription(
            "EXPIRED jwt: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGxvY2FsaG9zdCIsInN1YiI6ImUyM2FmMjQ2LTYzZTMtNGExNy05MGVkLTc0Y2I5ZTFlNWIzOSIsImlhdCI6MTYzNzMzNzE0MywiZXhwIjoxNjM3MzM4MDQzfQ.0caIRtLfKPlUgjuGZ9hBQ_q4A6O4ejgMgWOEKMHuaa4",
        )
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
