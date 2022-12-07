'use strict'
const _ = require('lodash');
const BaseController = use('BaseController')
const Product = use('App/Models/Product')
const Sell = use('App/Models/Sell')
const SellProduct = use('App/Models/SellProduct')

class SellController extends BaseController {
    constructor() {
        super(Sell)
    }

    async pagination({ request, auth, response }) {
        try {

            let modelQuery = this.model.query()
            modelQuery.select(['sell.*'])
            modelQuery.whereIn("sell.status_id", [this.status.$ACTIVE, this.status.$INACTIVE])
            const queryParams = request.get()
            if (queryParams) {
                let page = queryParams.page
                let perPage = queryParams.perPage
                let orderBy = queryParams.orderBy
                let direction = queryParams.isDesc == "true" ? "desc" : "asc"
                    // sort
                if (orderBy && direction) {
                    modelQuery.orderBy(orderBy, direction)
                } else {
                    modelQuery.orderBy("sell.updated_at", "desc")
                }
                // search
                if (queryParams.filterBy && queryParams.filter) {
                    let filterBy = queryParams.filterBy.split(',')
                    let filter = queryParams.filter
                    modelQuery.where((builder) => {
                        for (const iterator of filterBy) {
                            if (filter) builder.orWhere(iterator, 'LIKE', '%' + filter + '%')
                        }
                    })
                }
                // select
                if (queryParams.select) {
                    modelQuery.select(queryParams.select.split(","))
                }
                // include model
                if (queryParams.include) {
                    let include = queryParams.include.split(',')
                    for (const iterator of include) {
                        modelQuery.with(iterator, builder => {
                            builder.where('status_id', this.status.$ACTIVE)
                        })
                    }
                }
                let datas = await modelQuery.paginate(page, perPage)
                if (!_.isEmpty(datas)) {
                    return response.json({ 'status': 'success', 'data': datas }, 200)
                }
                return response.json({ 'status': 'error', 'error': "DATA_NOT_FOUND" }, 200)
            }
        } catch (error) {
            return response.json({ 'status': 'error', 'error': error.toString() }, 200)
        }
    }

    async get({ request, auth, response }) {
        try {
            const id = request.params.id
            let modelQuery = this.model.query()
            modelQuery.join("user", "user.id", "sell.user_id")
                // modelQuery.join("product", "product.id", "sell.product_id")
            modelQuery.with('user', (builder) => {
                builder.where('status_id', this.status.$ACTIVE)
            })
            modelQuery.with('sell_product', (builder) => {
                builder.where('status_id', this.status.$ACTIVE)
            })
            modelQuery.select(['sell.*'])
            modelQuery.where('sell.id', id)
            modelQuery.whereIn("sell.status_id", [this.status.$ACTIVE, this.status.$INACTIVE])
            let data = await modelQuery.first()
            return response.json({ 'status': 'success', 'data': data }, 200)
        } catch (error) {
            return response.json({ 'status': 'error', 'error': error.toString() }, 200)
        }
    }

    async updateStatus({ request, auth, response }) {
        try {
            const id = request.params.id
            let body = request.all()
            let model = await this.model.find(id)
            model["status_id"] = body.status_id
            if (await model.save()) {
                return response.json({ 'status': 'success', 'data': "SUCCESS_TO_SAVE_DATA" }, 200)
            } else {
                return response.json({ 'status': 'error', 'error': "FAIL_TO_SAVE_DATA" }, 200)
            }
        } catch (error) {
            return response.json({ 'status': 'error', 'error': error.toString() }, 200)
        }
    }

    async create({ request, auth, response }) {
        try {
            let model = await new this.model();
            let body = request.all()
            model["user_id"] = body["user_id"]
            model["total"] = body["total"]
            model["datetime"] = body["datetime"]
            model["location"] = body["location"]
            model["lat"] = body["lat"]
            model["lng"] = body["lng"]
            model["status_id"] = this.status.$ACTIVE
            if (await model.save()) {
                body["productSelect"] = JSON.parse(body["productSelect"])
                for (let i = 0; i < body["productSelect"].length; i++) {
                    let sellProduct = new SellProduct()
                    let sell_product = body["productSelect"][i]
                    sellProduct["sell_id"] = model["id"]
                    sellProduct["product_id"] = sell_product.id
                    sellProduct["quantity"] = sell_product.quantity
                    sellProduct["total"] = sell_product.total
                    sellProduct["status_id"] = this.status.$ACTIVE

                    let productQuery = Product.query()
                    productQuery.where("id", sell_product.id)
                    productQuery.where("status_id", this.status.$ACTIVE)
                    let productData = await productQuery.first();

                    productData["stock"] = productData["stock"] - sell_product.quantity

                    await productData.save()
                    await sellProduct.save()
                }
                return response.json({ 'status': 'success', 'data': "SUCCESS_TO_SAVE_DATA" }, 200)
            } else {
                return response.json({ 'status': 'error', 'error': "FAIL_TO_SAVE_DATA" }, 200)
            }
        } catch (error) {
            return response.json({ 'status': 'error', 'error': error.toString() }, 200)
        }
    }

    async update({ request, auth, response }) {
        try {
            const id = request.params.id
            let body = request.all()
            let model = await this.model.find(id)
            if (!_.isEmpty(model)) {
                let modelQuery = this.model.query()
                modelQuery.whereIn("status_id", [this.status.$ACTIVE, this.status.$INACTIVE])
                Object.keys(body).forEach((value) => {
                    Object.values(model.$visible).forEach((value_visible) => {
                        if (value == value_visible) {
                            modelQuery.where(value, body[value])
                        }
                    })
                })
                let data = await modelQuery.first();
                if (!_.isEmpty(data)) {
                    return response.json({ 'status': 'error', 'error': "DATA_DUPICATE" }, 200)
                }
                model["user_id"] = body["user_id"]
                model["total"] = body["total"]
                model["datetime"] = body["datetime"]
                model["location"] = body["location"]
                model["lat"] = body["lat"]
                model["lng"] = body["lng"]
                model["status_id"] = this.status.$ACTIVE
                if (await model.save()) {
                    body["productSelect"] = JSON.parse(body["productSelect"])
                    let sellProduct = await SellProduct
                        .query()
                        .where('sell_id', model['id'])
                        .where('status_id', this.status.$ACTIVE)
                        .fetch()

                    for (let i = 0; i < sellProduct.rows.length; i++) {
                        let productQuery = Product.query()
                        productQuery.where("id", sellProduct.rows[i].$attributes.product_id)
                        productQuery.where("status_id", this.status.$ACTIVE)
                        let productData = await productQuery.first();

                        productData["stock"] = productData["stock"] + sellProduct.rows[i].$attributes.quantity

                        await productData.save()

                        let sellProductData = await SellProduct
                            .query()
                            .where('id', sellProduct.rows[i].$attributes.id)
                            .first()

                        sellProductData["status_id"] = this.status.$DELETED
                        await sellProductData.save()
                    }

                    for (let i = 0; i < body["productSelect"].length; i++) {
                        let sellProduct = new SellProduct()
                        let sell_product = body["productSelect"][i]
                        console.log(sell_product)
                        sellProduct["sell_id"] = model["id"]
                        console.log(sell_product.product_id)
                        sellProduct["product_id"] = sell_product.product_id
                        sellProduct["quantity"] = sell_product.quantity
                        sellProduct["total"] = sell_product.total
                        sellProduct["status_id"] = this.status.$ACTIVE

                        let productQuery = Product.query()
                        productQuery.where("id", sell_product.product_id)
                        productQuery.where("status_id", this.status.$ACTIVE)
                        let productData = await productQuery.first();
                        productData["stock"] = productData["stock"] - sell_product.quantity

                        await productData.save()
                        await sellProduct.save()
                    }
                    return response.json({ 'status': 'success', 'data': "SUCCESS_TO_SAVE_DATA" }, 200)
                } else {
                    return response.json({ 'status': 'error', 'error': "FAIL_TO_SAVE_DATA" }, 200)
                }
            }
            return response.json({ 'status': 'error', 'error': "DATA_INVALID" }, 200)
        } catch (error) {
            return response.json({ 'status': 'error', 'error': error.toString() }, 200)
        }
    }

}

module.exports = SellController