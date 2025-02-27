import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'varchar', length: 255, unique: true })
  email: string;

  @Column({ type: 'varchar', length: 25, nullable: true })
  phone: string;

  @Column({ type: 'varchar', length: 255 })
  password: string;

  @Column({ type: 'boolean', default: true })
  isActive: boolean;

  // @BeforeInsert()
  // async hashPassword() {
  //   if (this.password) {

  //     const bcrypt = require('bcrypt');
  //     this.password = await bcrypt.hash(this.password, 10);
  //   }
  // }
}
