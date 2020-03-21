// Update with your config settings.

module.exports = {

  development: {
    client: 'postgresql',
    connection: {
      host: process.env.DB_SERVER,
      port: process.env.DB_PORT,
      database: process.env.DB_NAME,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'test'
    }
  },

  staging: {
    client: 'postgresql',
    connection: {
      host: 'localhost',
      port: '5432',
      database: 'test',
      user:     'postgres',
      password: '@DB12171995*'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: 'postgresql',
    connection: {
      host: '185.27.133.7',
      port: '5432',
      database: 'brianeta_briantastic',
      user:     'brianeta_bird',
      password: '@DB12171995*'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }

};
