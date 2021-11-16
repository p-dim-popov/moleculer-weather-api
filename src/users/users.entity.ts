import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    BeforeInsert,
    BeforeUpdate,
    AfterLoad,
} from "typeorm";

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
    locations: string[] = undefined;

    @BeforeUpdate()
    @BeforeInsert()
    locationsSerialize() {
        this.locations = this.locations.join(";") as unknown as string[];
    }

    @AfterLoad()
    locationsDeserialize() {
        this.locations = [...this.locations].join("").split(";");
    }
}
