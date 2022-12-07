'use strict'
const _ = require('lodash');
const BaseController = use('BaseController')
const Product = use('App/Models/Product')
const ProductImage = use('App/Models/ProductImage')
const Helpers = use('Helpers')
const product_path = Helpers.publicPath('')


class ProductController extends BaseController {
    constructor() {
        super(Product)
        this.sub_image_path = '/upload/product/product-';
    }

    async list({
        request,
        auth,
        response
    }) {
        try {
            let modelQuery = this.model.query()
            modelQuery.where('status_id', 1)
            modelQuery.where('stock', '>=', 0)
            modelQuery.orderBy("updated_at", "desc")
            let datas = await modelQuery.fetch();
            if (!_.isEmpty(datas)) {
                return response.json({
                    'status': 'success',
                    'data': datas
                }, 200)
            }
            return response.json({
                'status': 'error',
                'error': "DATA_NOT_FOUND"
            }, 200)
        } catch (error) {
            return response.json({
                'status': 'error',
                'error': "ข้อมูลเกิดข้อผิดพลาด"
            }, 200)
        }
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
                    ProductImage,
                    product_path,
                    this.sub_image_path,
                    "product_id"
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
            modelQuery.join("product_image", "product_image.product_id", "product.id")
            modelQuery.select(['product.*'])
            modelQuery.with('product_image')
            modelQuery.where('product.id', id)
            modelQuery.whereIn("product.status_id", [this.status.$ACTIVE, this.status.$INACTIVE])
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

    async updateBestSelling({
        request,
        response
    }) {
        try {
            const id = request.params.id
            let body = request.all()
            let model = await this.model.find(id)
            model["best_selling"] = body.best_selling
            if (await model.save()) {
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

            const res_product_image = await ProductImage.query()
                .where('product_id', model.id)
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
                            ProductImage,
                            product_path,
                            this.sub_image_path,
                            "product_id")
                        if (!_.isEmpty(imageFile)) {
                            super.deleteImage(
                                ProductImage,
                                res_product_image
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

module.exports = ProductController