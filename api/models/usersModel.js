const KNEX_DB = require('../../data/dbConfig.js')

module.exports = {
    insert,
    update,
    remove,
    getAll,
    findByID,
}

async function insert(user) {
    const [id] = await  KNEX_DB('USERS').insert(user)
    // - V1 - //
        // return KNEX_DB('USERS').where({ id }).first()
    // - V2 - //
        return findByID(id)
}
async function update(id, changes) {
    return null
}
async function remove(id) {
    return KNEX_DB('USERS').where({ id }).del()
}
async function getAll() {
    return null
}
async function findByID(id) {
    return KNEX_DB('USERS').where({ id }).first()
}