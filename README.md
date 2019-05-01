# Restful API Wallet
A NodeJS Restful API to deposit, transfer and withdraw money.

# Installation
- Create database with name `wallet_api` or setting config database in folder /Config/Database.js :
```js
// Config/Database.js

const db = require('knex')({
  client: 'mysql',
  connection: {
    host: 'localhost',
    user: 'YOUR_DATABASE_USERNAME',
    password: 'YOUR_DATABASE_PASSWORD',
    database: 'YOUR_DATABASE_NAME'
  }
});

module.exports = db;
```
Note: setting your migration config in knexfile.js :
```js
// knexfile.js

development: {
    client: 'mysql',
    connection: {
      host: 'localhost',
      user: 'YOUR_DATABASE_USERNAME',
      password: 'YOUR_DATABASE_PASSWORD',
      database: 'YOUR_DATABASE_DATABASE'
    },
    migrations: {
      tableName: 'migrations'
    }
  }
```

- Run Migration
```sh
$ knex migration:latest
```
Note: if you not installed knex, first run this command
```sh
$ npm install knex --global
```

# Security
Restful API Wallet using `passport` module for Authentication Route:
```js
passport.authenticate('jwt', { session: false })
```

Use this header:
```sh
Authorization: Bearer <token>
```

How do i get Bearer Token ?
- PATH:
```
POST /auth/login
```

- Request Content-Type: `Application/json`

- Request Body:
```json
{
  "email": "example@example.com",
  "password": "example"
}
```

- Response if login success:
```json
{
  "status": true,
  "msg": "Login successfully.",
  "tk": "<token>"
}
```

# License
ISC License
