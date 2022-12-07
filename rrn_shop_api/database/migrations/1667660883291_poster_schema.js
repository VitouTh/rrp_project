'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class PosterSchema extends Schema {
    up() {
        table.increments()
        table.string('description').notNullable()
        table.timestamps()
    }

    down() {
        this.drop('poster')
    }
}

module.exports = PosterSchema