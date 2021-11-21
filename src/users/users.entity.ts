import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    BeforeInsert,
    BeforeUpdate,
    AfterLoad,
} from "typeorm";
import Location from "../locations/location";

@Entity()
export class User {
    @PrimaryGeneratedColumn("uuid")
    id: string = undefined;

    @Column({
        unique: true,
    })
    email: string = undefined;

    @Column()
    password: string = undefined;

    @Column("text")
    locations: Location[] = undefined;

    @BeforeUpdate()
    @BeforeInsert()
    locationsSerialize() {
        // noinspection UnnecessaryLocalVariableJS
        const serialized = Location.serialize(this.locations);
        // @ts-ignore
        this.locations = serialized;
    }

    @AfterLoad()
    locationsDeserialize() {
        this.locations = Location.deserialize(this.locations);
    }
}
