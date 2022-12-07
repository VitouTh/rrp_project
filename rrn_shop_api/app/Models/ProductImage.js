'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class ProductImage extends Model {
    static get table() {
        return 'product_image'
    }

    static get visible() {
        return ['id', 'image_path', 'created_at', 'updated_at', 'status_id']
    }
}

module.exports = ProductImage