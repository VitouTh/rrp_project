'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class PosterImageSchema extends Schema {
    up() {
        table.increments()
        table.integer('poster_id').unsigned().references('id').inTable('poster')
        table.string('image_path', 255).notNullable()
        table.timestamps()
    }

    down() {
        this.drop('poster_image')
    }
}

module.exports = PosterImageSchema