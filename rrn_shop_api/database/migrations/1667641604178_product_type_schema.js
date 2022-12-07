'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ProductTypeSchema extends Schema {
    up() {
        this.create('product_type', (table) => {
            table.increments()
            table.string('name_en', 256).notNullable()
            table.string('name_kh', 256).notNullable()
            table.string('description', 255).notNullable()
            table.integer('status_id', 10).notNullable()
            table.timestamps()
        })
    }

    down() {
        this.drop('product_type')
    }
}

module.exports = ProductTypeSchema