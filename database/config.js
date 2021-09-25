let knex = require('knex')({
    client: 'sqlite3',
    useNullAsDefault:true,
    connection: {
        filename: "./database/database.db"
    }
});

module.exports = knex;
