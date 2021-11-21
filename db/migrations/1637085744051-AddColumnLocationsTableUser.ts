import {MigrationInterface, QueryRunner} from "typeorm";

export class AddColumnLocationsTableUser1637085744051 implements MigrationInterface {
    name = 'AddColumnLocationsTableUser1637085744051'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`locations\` text NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`locations\``);
    }

}
