import dotenv from 'dotenv';
import type { Dialect } from 'sequelize';

dotenv.config();

interface DBConfig {
    host: string;
    user: string;
    password: string
    port: number
    database?: string
    dbType: Dialect
}
const port = Number(process.env.DB_PORT) || 3306;
const host = process.env.DB_HOST
const user = process.env.DB_USER
const password = process.env.DB_PASSWORD
const database = process.env.DB_NAME
if (!host) {
    throw new Error("DB Host is not set.")
}

if (!user) {
    throw new Error("DB User is not set.")
}


if (!password) {
    throw new Error("DB Password is not set.")
}

const dbConfig: DBConfig = {
    port,
    host,
    user,
    password,
    database,
    dbType: 'mariadb'
};

export default dbConfig;