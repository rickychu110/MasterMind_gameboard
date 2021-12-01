// Update with your config settings.
import dotenv from 'dotenv';
dotenv.config();
module.exports = {

  development: {
    client: "postgresql",
    connection: {
      user:process.env.DB_USERNAME,
      password:process.env.DB_PASSWORD,
      database:process.env.DB_NAME,
      host:process.env.DB_HOST
    }
  },

  staging: {
    client: "postgresql",
    connection: {
      database: "my_db",
      user: "username",
      password: "password"
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: "knex_migrations"
    }
  },

  production: {
    client: "postgresql",
    connection: {
      database: "my_db",
      user: "username",
      password: "password"
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: "knex_migrations"
    }
  }

};
