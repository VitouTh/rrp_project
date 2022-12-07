'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class UserUserType extends Model {
    static $ADMIN = 1

    static get table() {
        return 'user_user_type'
    }

    static get visible() {
        return ['id', 'user_type_id', 'user_id']
    }

    user() {
        return this.belongsToMany('App/Models/User')
    }
}

module.exports = UserUserType