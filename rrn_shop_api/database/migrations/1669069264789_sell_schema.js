'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class SellSchema extends Schema {
  up () {
    this.table('sells', (table) => {
      // alter table
    })
  }

  down () {
    this.table('sells', (table) => {
      // reverse alternations
    })
  }
}

module.exports = SellSchema
