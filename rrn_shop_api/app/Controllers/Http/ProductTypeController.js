'use strict'
const _ = require('lodash');
const BaseController = use('BaseController')
const ProductType = use('App/Models/ProductType')
const ProductTypeImage = use('App/Models/ProductTypeImage')
const Helpers = use('Helpers')
const product_type_path = Helpers.publicPath('')

class ProductTypeController extends BaseController {
    constructor() {
        super(ProductType)
        this.sub_image_path = '/upload/product_type/product_type_';
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
            body["name_en"] = body["name_en"].trim()
            body["name_kh"] = body["name_kh"].trim()
                // body["description"] = body["description"].trim()

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
                    ProductTypeImage,
                    product_type_path,
                    this.sub_image_path,
                    "product_type_id"
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
            modelQuery.join("product_type_image", "product_type_image.product_type_id", "product_type.id")
            modelQuery.select(['product_type.*'])
            modelQuery.with('product_type_image')
            modelQuery.where('product_type.id', id)
            modelQuery.whereIn("product_type.status_id", [this.status.$ACTIVE, this.status.$INACTIVE])
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
            body["name_en"] = body["name_en"].trim()
            body["name_kh"] = body["name_kh"].trim()
                // body["description"] = body["description"].trim()
            let model = await this.model.find(id)

            const res_product_type_image = await ProductTypeImage.query()
                .where('product_type_id', model.id)
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
                            ProductTypeImage,
                            product_type_path,
                            this.sub_image_path,
                            "product_type_id")
                        if (!_.isEmpty(imageFile)) {
                            super.deleteImage(
                                ProductTypeImage,
                                res_product_type_image
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

module.exports = ProductTypeController