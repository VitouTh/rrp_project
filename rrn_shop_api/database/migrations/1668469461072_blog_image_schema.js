'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class BlogImageSchema extends Schema {
    up() {
        table.increments()
        table.integer('blog_id').unsigned().references('id').inTable('blog')
        table.string('image_path', 255).notNullable()
        table.timestamps()
    }

    down() {
        this.drop('blog_image')
    }
}

module.exports = BlogImageSchema