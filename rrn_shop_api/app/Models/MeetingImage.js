'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class MeetingImage extends Model {
    static get table() {
        return 'meeting_image'
    }

    static get visible() {
        return ['id', 'image_path', 'created_at', 'updated_at', 'status_id', 'meeting_id']
    }
}

module.exports = MeetingImage