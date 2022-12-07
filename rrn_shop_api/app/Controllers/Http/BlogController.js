'use strict'
const _ = require('lodash');
const BaseController = use('BaseController')
const Blog = use('App/Models/Blog')
const BlogImage = use('App/Models/BlogImage')
const Helpers = use('Helpers')
const blog_path = Helpers.publicPath('')

class BlogController extends BaseController {
    constructor() {
        super(Blog)
        this.sub_image_path = '/upload/blog/blog_';
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
            body["title"] = body["title"].trim()
            body["subtitle"] = body["subtitle"].trim()

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
                    BlogImage,
                    blog_path,
                    this.sub_image_path,
                    "blog_id"
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
            modelQuery.join("blog_image", "blog_image.blog_id", "blog.id")
            modelQuery.select(['blog.*'])
            modelQuery.with('blog_image')
            modelQuery.where('blog.id', id)
            modelQuery.whereIn("blog.status_id", [this.status.$ACTIVE, this.status.$INACTIVE])
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
            body["title"] = body["title"].trim()
            body["subtitle"] = body["subtitle"].trim()
            let model = await this.model.find(id)

            const res_blog_image = await BlogImage.query()
                .where('blog_id', model.id)
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
                            BlogImage,
                            blog_path,
                            this.sub_image_path,
                            "blog_id")
                        if (!_.isEmpty(imageFile)) {
                            super.deleteImage(
                                BlogImage,
                                res_blog_image
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

module.exports = BlogController