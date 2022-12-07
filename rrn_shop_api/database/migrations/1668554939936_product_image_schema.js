'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ProductImageSchema extends Schema {
    up() {
        table.increments()
        table.integer('product_id').unsigned().references('id').inTable('product')
        table.string('image_path', 255).notNullable()
        table.timestamps()
    }

    down() {
        this.drop('product_image')
    }
}

module.exports = ProductImageSchema