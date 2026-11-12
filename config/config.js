require('dotenv').config();

const username = process.env.DBUSERNAME;
const password = process.env.DBPASSWORD;
const name = process.env.DBNAME;
const host = process.env.DBHOST;

module.exports = 
{
  "development": {
    "username": username,
    "password": password,
    "database": name,
    "host": host,
    "dialect": "mysql"
  },
  "test": {
    "username": "root",
    "password": null,
    "database": "database_test",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "production": {
    "username": "root",
    "password": null,
    "database": "database_test",
    "host": "127.0.0.1",
    "dialect": "mysql"
  }
}
