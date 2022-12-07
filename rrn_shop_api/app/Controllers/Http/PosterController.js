'use strict'
const _ = require('lodash');
const BaseController = use('BaseController')
const Poster = use('App/Models/Poster')
const PosterImage = use('App/Models/PosterImage')
const Helpers = use('Helpers')
const poster_path = Helpers.publicPath('')

class PosterController extends BaseController {
    constructor() {
        super(Poster)
        this.sub_image_path = '/upload/poster/poster_';
    }
    async create({
        request,
        response
    }) {
        try {
            const validationOptions = {
                size: '20mb',
            };

            const imageFile = request.file('images', validationOptions);

            let model = await new this.model();
            let body = request.all()

            Object.keys(body).forEach((value) => {
                Object.values(model.$visible).forEach((value_visible) => {
                    if (value == value_visible) {
                        model[value] = body[value]
                    }
                })
            })

            model["status_id"] = this.status.$ACTIVE

            if (body['imageLength'] > 0 && await model.save()) {
                let result = await this.saveImage(
                    model.id,
                    imageFile,
                    body['imageLength'],
                    PosterImage,
                    poster_path,
                    this.sub_image_path,
                    "poster_id"
                );
                if (result == true) {
                    return response.json({
                        'status': 'success',
                        'data': "SUCCESS_TO_SAVE_DATA"
                    }, 200)
                } else {
                    return response.json({
                        'status': 'error',
                        'error': "FAIL_TO_SAVE_DATA"
                    }, 200)
                }
            } else {
                return response.json({
                    'status': 'error',
                    'error': "FAIL_TO_SAVE_DATA"
                }, 200)
            }
        } catch (error) {
            return response.json({
                'status': 'error',
                'error': error.toString()
            }, 200)
        }
    }

    async get({
        request,
        response
    }) {
        try {

            const id = request.params.id
            let modelQuery = this.model.query()
            modelQuery.join("poster_image", "poster_image.poster_id", "poster.id")
            modelQuery.select(['poster.*'])
            modelQuery.with('poster_image')
            modelQuery.where('poster.id', id)
            modelQuery.whereIn("poster.status_id", [this.status.$ACTIVE, this.status.$INACTIVE])
            let data = await modelQuery.first()
            return response.json({
                'status': 'success',
                'data': data
            }, 200)
        } catch (error) {
            return response.json({
                'status': 'error',
                'error': error.toString()
            }, 200)
        }
    }



    async update({
        request,
        response
    }) {
        try {
            const validationOptions = {
                size: '20mb',
            };
            const imageFile = request.file('images', validationOptions);
            const id = request.params.id
            let body = request.all()
            let model = await this.model.find(id)

            const res_poster_image = await PosterImage.query()
                .where('poster_id', model.id)
                .fetch()

            if (!_.isEmpty(model)) {
                Object.keys(body).forEach((value) => {
                        Object.values(model.$visible).forEach((value_visible) => {
                            if (value == value_visible) {
                                model[value] = body[value]
                            }
                        })
                    })
                    //============ handle image ============
                if (body['imageLength'] > 0) {
                    try {
                        model.save()

                        super.saveImage(
                            model.id,
                            imageFile,
                            body['imageLength'],
                            PosterImage,
                            poster_path,
                            this.sub_image_path,
                            "poster_id")
                        if (!_.isEmpty(imageFile)) {
                            super.deleteImage(
                                PosterImage,
                                res_poster_image
                            )
                        }
                    } catch {
                        return false;
                    }
                    return response.json({
                        'status': 'success',
                        'data': "SUCCESS_TO_SAVE_DATA"
                    }, 200)

                } else {
                    return response.json({
                        'status': 'error',
                        'error': "FAIL_TO_SAVE_DATA"
                    }, 200)

                }
            } else {
                return response.json({
                    'status': 'error',
                    'error': "DATA_INVALID"
                }, 200)
            }

        } catch (error) {
            return response.json({
                'status': 'error',
                'error': error.toString()
            }, 200)
        }
    }
}

module.exports = PosterController