import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    length: 200,
    nullable: false,
  })
  firstName: string;

  @Column({
    type: 'varchar',
    length: 200,
    nullable: true,
  })
  lastName: string;

  @Column({ type: 'varchar', length: 200, nullable: false, unique: true })
  email: string;

  @Column({
    type: 'varchar',
    length: 200,
    nullable: false,
  })
  password: string;
}
