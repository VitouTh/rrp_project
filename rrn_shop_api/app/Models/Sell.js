'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Sell extends Model {
    static get table() {
        return 'sell'
    }

    static get visible() {
        return ['id', 'quantity', 'total', 'datetime', 'location', 'description', 'status_id', 'lat', 'lng']
    }

    user() {
        return this.belongsTo('App/Models/User')
    }

    product() {
        return this.belongsTo('App/Models/Product')
    }

    sell_product() {
        return this.hasMany('App/Models/SellProduct')
    }

}

module.exports = Sell