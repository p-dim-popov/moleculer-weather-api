export type ILocations = string[];

export const Locations = {
    serialize: (locations: ILocations) => {
        return (locations ?? [""]).join(";") as unknown as string[];
    },

    deserialize: (locations: ILocations | string) => {
        if (Array.isArray(locations)) return locations;

        return locations.split(";").filter((x) => !!x);
    },

    getInvalid: (locations: ILocations) =>
        locations.filter((l) => !l.includes(",")),

    Invalid: class {
        constructor(public locations: string[]) {}
    },

    validate: (slug: ILocations | string): ILocations => {
        const locations = Locations.deserialize(slug);
        const invalidLocations = Locations.getInvalid(locations);

        if (!!invalidLocations.length) {
            throw new Locations.Invalid(invalidLocations);
        }

        return locations;
    },
};
