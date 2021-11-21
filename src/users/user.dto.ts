import { ApiProperty } from "@nestjs/swagger";

export class UserDto {
    @ApiProperty()
    id: string = undefined;

    @ApiProperty()
    email: string = undefined;

    @ApiProperty()
    locations: string[] = undefined;
}
