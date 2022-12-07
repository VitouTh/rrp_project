'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Poster extends Model {
    static get table() {
        return 'poster'
    }

    static get visible() {
        return ['id', 'description', 'created_at', 'updated_at', 'status_id']
    }

    poster_image() {
        return this.hasMany('App/Models/PosterImage')
    }
}

module.exports = Poster