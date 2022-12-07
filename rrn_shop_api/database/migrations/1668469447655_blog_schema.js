'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class BlogSchema extends Schema {
    up() {
        table.increments()
        table.string('title', 255).notNullable()
        table.string('subtitle', 255).notNullable()
        table.string('description').notNullable()
        table.timestamps()
    }

    down() {
        this.drop('blog')
    }
}

module.exports = BlogSchema