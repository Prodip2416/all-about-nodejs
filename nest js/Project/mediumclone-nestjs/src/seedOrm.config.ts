import config from "./typeorm.config";

const SeedConfig = {
    ...config,
    migrations: ['src/seeds/*.ts'],
    cli:{
        migrationsDir:'src/seeds'
    }
}
export default SeedConfig;