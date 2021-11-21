export default class Locations extends Array<string> {
    static serialize = (locations: Locations): string => {
        return (locations ?? [""]).join(";");
    };

    static deserialize = (locations: Locations | string): Locations => {
        if (Array.isArray(locations)) return locations;

        return locations.split(";").filter((x) => !!x);
    };

    static Invalid = class {
        constructor(public locations: Locations) {}
    };

    static getInvalid = (locations: Locations): Locations =>
        locations.filter((l) => !l.includes(","));

    static validate = (slug: Locations | string): Locations => {
        const locations = Locations.deserialize(slug);
        const invalidLocations = Locations.getInvalid(locations);

        if (!!invalidLocations.length) {
            throw new Locations.Invalid(invalidLocations);
        }

        return locations;
    };
}
