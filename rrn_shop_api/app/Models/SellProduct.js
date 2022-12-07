'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class SellProduct extends Model {
    static get table() {
        return 'sell_product'
    }

    static get visible() {
        return ['id', 'sell_id', 'product_id', 'quantity', 'total', 'created_at', 'upadated_at', 'status_id']
    }
}

module.exports = SellProduct