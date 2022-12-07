'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CustomerSchema extends Schema {
  up () {
    this.table('customers', (table) => {
      // alter table
    })
  }

  down () {
    this.table('customers', (table) => {
      // reverse alternations
    })
  }
}

module.exports = CustomerSchema
