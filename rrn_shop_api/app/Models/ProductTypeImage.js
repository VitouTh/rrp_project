'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class ProductTypeImage extends Model {
    static get table() {
        return 'product_type_image'
    }

    static get visible() {
        return ['id', 'image_path', 'created_at', 'upadated_at', 'status_id']
    }
}

module.exports = ProductTypeImage