import { Type } from "@nestjs/common";

export const Mapper = {
    mapTo:
        <TOutput>(outputType: Type<TOutput>) =>
        <TInput>(inputObject: TInput): TOutput => {
            const instance = new outputType();
            for (const property in instance) {
                instance[property] = inputObject[property.toString()];
            }

            return instance;
        },
};
