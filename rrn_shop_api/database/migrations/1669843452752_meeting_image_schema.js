'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class MeetingImageSchema extends Schema {
    up() {
        table.increments()
        table.integer('meeting_id').unsigned().references('id').inTable('meeting')
        table.string('image_path', 255).notNullable()
        table.timestamps()
    }

    down() {
        this.drop('meeting_image')
    }
}

module.exports = MeetingImageSchema