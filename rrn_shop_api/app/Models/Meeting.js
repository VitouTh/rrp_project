'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Meeting extends Model {
    static get table() {
        return 'meeting'
    }

    static get visible() {
        return ['id', 'created_at', 'datetime', 'customer_id', 'admin_id', 'status_id', 'description']
    }

    user() {
        return this.belongsTo('App/Models/User')
    }

    meeting_image() {
        return this.hasMany('App/Models/MeetingImage')
    }
}

module.exports = Meeting