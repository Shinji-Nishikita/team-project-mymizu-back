import {MigrationInterface, QueryRunner} from "typeorm";

export class first1617325277048 implements MigrationInterface {
    name = 'first1617325277048'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "monster" ("id" SERIAL NOT NULL, "currentHP" integer NOT NULL, "maxHP" integer NOT NULL, "startDate" date NOT NULL, CONSTRAINT "PK_9d95b6eedf1fbbea6b329b91f81" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "username" character varying NOT NULL, "level" integer NOT NULL, "attackPower" integer NOT NULL, "monsterId" integer, CONSTRAINT "REL_4432717f979c36f35c5202cbfa" UNIQUE ("monsterId"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_4432717f979c36f35c5202cbfa9" FOREIGN KEY ("monsterId") REFERENCES "monster"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_4432717f979c36f35c5202cbfa9"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "monster"`);
    }

}
