'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class ProductType extends Model {
    static get table() {
        return 'product_type'
    }

    static get visible() {
        return ['id', 'name_en', 'name_kh', 'description', 'created_at', 'updated_at', 'status_id']
    }

    product_type_image() {
        return this.hasMany('App/Models/ProductTypeImage')
    }

}

module.exports = ProductType