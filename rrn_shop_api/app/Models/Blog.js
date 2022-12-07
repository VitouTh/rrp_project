'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Blog extends Model {
    static get table() {
        return 'blog'
    }

    static get visible() {
        return ['id', 'title', 'subtitle', 'description', 'created_at', 'updated_at', 'status_id']
    }

    blog_image() {
        return this.hasMany('App/Models/BlogImage')
    }
}

module.exports = Blog