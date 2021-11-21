import { ApiProperty } from "@nestjs/swagger";

export class WannabeAuthUserDto {
    @ApiProperty()
    email: string;

    @ApiProperty()
    password: string;
}
