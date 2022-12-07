'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Product extends Model {
    static get table() {
        return 'product'
    }

    static get visible() {
        return ['id', 'name_en', 'name_kh', 'description', 'stock', 'discount', 'sub_name', 'price', 'product_type_id', 'best_selling', 'created_at', 'updated_at', 'status_id']
    }

    product_image() {
        return this.hasMany('App/Models/ProductImage')
    }

    product_type() {
        return this.belongsTo('App/Models/ProductType')
    }
}

module.exports = Product