import { MigrationInterface, QueryRunner, Table, TableColumn, TableForeignKey } from "typeorm";

export class CreateUserProfileTables1709136000000 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        // Create profile table
        await queryRunner.createTable(
            new Table({
                name: "profile",
                columns: [
                    {
                        name: "id",
                        type: "integer",
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: "increment",
                    },
                    {
                        name: "gender",
                        type: "varchar",
                    },
                    {
                        name: "photo",
                        type: "varchar",
                    },
                ],
            }),
            true
        );

        // Create user table
        await queryRunner.addColumn(
            "users",
            new TableColumn({
                name: "profileId",
                type: "integer",
                isNullable: true, // or false if you want it required
            })
        );

        // Create foreign key
        await queryRunner.createForeignKey(
            "users",
            new TableForeignKey({
                columnNames: ["profileId"],
                referencedTableName: "profile",
                referencedColumnNames: ["id"],
                onDelete: "SET NULL", // or "CASCADE" or "RESTRICT" depending on your needs
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Drop tables in reverse order due to foreign key
        await queryRunner.dropTable("users");
        await queryRunner.dropTable("profile");
    }
}