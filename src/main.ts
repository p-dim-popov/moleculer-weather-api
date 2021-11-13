import { NestFactory } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { AppModule } from "./app.module";
import { version } from "../package.json";

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.enableCors();

    const config = new DocumentBuilder()
        .setVersion(version)
        .addBearerAuth(
            {
                description:
                    "Please enter token in following format: Bearer ${JWT}",
                name: "Authorization",
                bearerFormat: "Bearer",
                scheme: "Bearer",
                type: "http",
                in: "Header",
            }
        )
        .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup("docs", app, document);

    await app.listen(3000);
}
bootstrap();
