'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ProductTypeImageSchema extends Schema {
    up() {
        table.increments()
        table.integer('product_type_id').unsigned().references('id').inTable('product_type')
        table.string('image_path', 255).notNullable()
        table.timestamps()
    }

    down() {
        this.drop('product_type_image')
    }
}

module.exports = ProductTypeImageSchema