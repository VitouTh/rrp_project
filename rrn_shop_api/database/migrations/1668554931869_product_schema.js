'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ProductSchema extends Schema {
    up() {
        table.increments()
        table.string('name_en', 255).notNullable()
        table.string('name_kh', 255).notNullable()
        table.string('sub_name', 255).notNullable()
        table.float('price').notNullable()
        table.integer('float').notNullable()
        table.integer('discount').notNullable()
        table.integer('status_id').unsigned().references('id').inTable('status').notNullable().defaultTo(1)
        table.integer('status_id').unsigned().references('id').inTable('product_type').notNullable()
        table.integer('best_selling').notNullable().defaultTo(1)
        table.string('description').notNullable()
        table.timestamps()
    }

    down() {
        this.drop('product')
    }
}

module.exports = ProductSchema