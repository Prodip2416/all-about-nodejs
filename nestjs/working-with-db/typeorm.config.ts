import { DataSource } from 'typeorm';

export default new DataSource({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'root',
  database: 'nestjs_typeorm',
  entities: ['dist/**/*.entity.js'],
  migrations: ['migrations/*.ts'],
});
