const parse = require('pg-connection-string');

let config = {
   "type": 'postgres',
   "host": process.env.DB_HOST,
   "port": process.env.DB_PORT,
   "username": process.env.DB_USERNAME,
   "password": process.env.DB_PASSWORD,
   "database": process.env.DB_DATABASE,
   "url": process.env.DATABASE_URL,
   "synchronize": true,
   "logging": false,
   ssl: {rejectUnauthorized:false},
   "entities": [
      "src/entity/**/*.ts"
   ],
   "migrations": [
      "src/migration/**/*.ts"
   ],
   "subscribers": [
      "src/subscriber/**/*.ts"
   ],
   "cli": {
      "entitiesDir": "src/entity",
      "migrationsDir": "src/migration",
      "subscribersDir": "src/subscriber"
   }
}

// const productionConn = null
// if (process.env.DATABASE_URL){
//    config = {}
//    config.type='postgres';
//    config.url = parse(process.env.DATABASE_URL);
//    config.ssl = {rejectUnauthorized:false};
// }

module.exports = config;