'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class MeetingSchema extends Schema {
  up () {
    this.table('meetings', (table) => {
      // alter table
    })
  }

  down () {
    this.table('meetings', (table) => {
      // reverse alternations
    })
  }
}

module.exports = MeetingSchema
