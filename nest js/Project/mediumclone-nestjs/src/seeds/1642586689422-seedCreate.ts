import {MigrationInterface, QueryRunner} from "typeorm";

export class SeedsCreate1642586689422 implements MigrationInterface {
    name = 'SeedsCreate1642586689422'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`INSERT INTO Tags (name) VALUES ('dragon'), ('archor'), ('wizerd')`);

        //Password : 12345
        await queryRunner.query(`INSERT INTO Users (username, email, password)
         VALUES ('foo', 'foo@gmail.com','$2b$10$wfJUFWTjxst8f0AA9pIZCuAsacDnVn3g.0CNuxEzKehFcKDddWwgS') `);

        await queryRunner.query(`INSERT INTO articles (slag, title, description, body, "tagList", "authorId")
         VALUES ('first article', 'first title','this is description', 'this is body', 'coffee, dragon', 1),
         ('second article', '2nd title','this is description', 'this is body', 'coffee, dragon', 1) `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    
    }

}
