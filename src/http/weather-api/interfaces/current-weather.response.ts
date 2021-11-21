import { ApiProperty } from "@nestjs/swagger";

export class Coord {
    @ApiProperty()
    lon: number;
    @ApiProperty()
    lat: number;
}

export class Clouds {
    @ApiProperty()
    all: number;
}

export class Main {
    @ApiProperty()
    temp: number;
    @ApiProperty()
    feels_like: number;
    @ApiProperty()
    temp_min: number;
    @ApiProperty()
    temp_max: number;
    @ApiProperty()
    pressure: number;
    @ApiProperty()
    humidity: number;
}

export class Sys {
    @ApiProperty()
    type: number;
    @ApiProperty()
    id: number;
    @ApiProperty()
    message: number;
    @ApiProperty()
    country: string;
    @ApiProperty()
    sunrise: number;
    @ApiProperty()
    sunset: number;
}

export class Weather {
    @ApiProperty()
    id: number;
    @ApiProperty()
    main: string;
    @ApiProperty()
    description: string;
    @ApiProperty()
    icon: string;
}

export class Wind {
    @ApiProperty()
    speed: number;
    @ApiProperty()
    deg: number;
}

export class LocationInfo {
    @ApiProperty()
    coord: Coord;
    weather: Weather[];
    @ApiProperty()
    base: string;
    @ApiProperty()
    main: Main;
    @ApiProperty()
    visibility: number;
    @ApiProperty()
    wind: Wind;
    @ApiProperty()
    clouds: Clouds;
    @ApiProperty()
    dt: number;
    @ApiProperty()
    sys: Sys;
    @ApiProperty()
    timezone: number;
    @ApiProperty()
    id: number;
    @ApiProperty()
    name: string;
    @ApiProperty()
    cod: number;
}
