'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class SellProductSchema extends Schema {
  up () {
    this.table('sell_products', (table) => {
      // alter table
    })
  }

  down () {
    this.table('sell_products', (table) => {
      // reverse alternations
    })
  }
}

module.exports = SellProductSchema
