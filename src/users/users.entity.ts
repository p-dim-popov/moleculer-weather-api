import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    BeforeInsert,
    BeforeUpdate,
    AfterLoad,
} from "typeorm";
import Locations from "../locations/locations";

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
    locations: Locations = undefined;

    @BeforeUpdate()
    @BeforeInsert()
    locationsSerialize() {
        // @ts-ignore
        this.locations = Locations.serialize(this.locations);
    }

    @AfterLoad()
    locationsDeserialize() {
        this.locations = Locations.deserialize(this.locations);
    }
}
