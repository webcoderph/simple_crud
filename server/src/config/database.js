const env = process.env.env || 'development';
const knex = require('knex');
const knexfile = require('./knexfile');

const db = knex(knexfile[env]);

module.exports = db;

