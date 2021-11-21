import { ApiProperty } from "@nestjs/swagger";

export default class Location {
    static Invalid = class {
        constructor(public locations: Location[]) {}
    };

    static parse = (location: string): Location => {
        const [city, country] = location.split(",");
        const parsedLocation = new Location();

        parsedLocation.city = city;
        parsedLocation.country = country;

        return parsedLocation;
    };

    static serialize = (locations: Location[]): string => {
        return locations.map(Location.stringify).join(";");
    };

    static deserialize = (locations: Location[] | string): Location[] => {
        if (Array.isArray(locations)) return locations;

        return (locations as string)
            .split(";")
            .filter((x) => !!x)
            .map(Location.parse);
    };

    static getInvalid = (locations: Location[]): Location[] =>
        locations.filter((l) => !l.city || !l.country);

    static validate = (locations: Location[]): Location[] => {
        const invalidLocations = Location.getInvalid(locations);

        if (!!invalidLocations.length) {
            throw new Location.Invalid(invalidLocations);
        }

        return locations;
    };

    static stringify = (self: Location): string => {
        return `${self.city},${self.country}`;
    };

    static isEqual = (locationToCompare: Location) => (self: Location) => {
        return (
            locationToCompare === self ||
            (locationToCompare.city === self.city &&
                locationToCompare.country === self.country)
        );
    };

    @ApiProperty()
    city: string = undefined;
    @ApiProperty()
    country: string = undefined;
}
