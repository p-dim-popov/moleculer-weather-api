import { ApiProperty } from "@nestjs/swagger";
import Location from "../locations/location";

export class UserDto {
    @ApiProperty()
    id: string = undefined;

    @ApiProperty()
    email: string = undefined;

    @ApiProperty({ type: Location })
    locations: Location[] = undefined;
}
