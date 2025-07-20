import { Sequelize } from 'sequelize'
import mariadb from 'mariadb'
import dbConfig from '../config/db.config.ts'

const { dbType, host, password, port, user, database } = dbConfig

// Create the database if it doesn't exist
const initDB = async () => {
    const dbConnection = await mariadb.createConnection({ host, port, user, password })
    await dbConnection.query(`CREATE DATABASE IF NOT EXISTS \`${database}\``)
}

//instantiate Sequelize ORM for CRUD operations using the DAO (https://en.wikipedia.org/wiki/Data_access_object) pattern.
const sequelize = new Sequelize({
    dialect: dbType,
    host,
    password,
    port,
    username: user,
    database,
})

// Attempt to initialize database
try {
    await initDB()
    console.log('Database initialized')
} catch (error) {
    console.debug('Failed to initialize DB');
    console.error(error)
}

/**
 * @description Attempts to connect to database. 
 * Always returns an instance even if connection fails. 
 * Instance can still be used to debug connection issues.
 * @returns database client instance. 
 */
const dbConnect = async () => {
    try {
        await sequelize.authenticate();
        console.log('DB connected successfully.');
        return sequelize
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

export const dbClient = await dbConnect()