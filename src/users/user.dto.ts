import { ApiProperty } from "@nestjs/swagger";
import Locations from "../locations/locations";

export class UserDto {
    @ApiProperty()
    id: string = undefined;

    @ApiProperty()
    email: string = undefined;

    @ApiProperty()
    locations: Locations = undefined;
}
