const dotenv = require('dotenv')
const dialect = "mysql"
dotenv.config()

module.exports = {
  "development": {
    "username": process.env.DEV_DATABASE_USERNAME,
    "password": process.env.DEV_DATABASE_PASSWORD,
    "database": process.env.DEV_DATABASE_NAME,
    "host": process.env.DEV_DATABASE_HOST,
    "dialect": dialect,
    "operatorsAliases": false
  },
  "test": {
    "username": process.env.TEST_DATABASE_HOST,
    "password": process.env.TEST_DATABASE_HOST,
    "database": process.env.TEST_DATABASE_NAME,
    "host": process.env.TEST_DATABASE_HOST,
    "dialect": dialect,
    "operatorsAliases": false
  },
  "production": {
    "username": process.env.PROD_DATABASE_HOST,
    "password": process.env.PROD_DATABASE_HOST,
    "database": process.env.PROD_DATABASE_HOST,
    "host": process.env.PROD_DATABASE_HOST,
    "dialect": dialect,
    "operatorsAliases": false
  }
}
