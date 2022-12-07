'use strict'
const _ = require('lodash');
const BaseController = use('BaseController')
const MeetingImage = use('App/Models/MeetingImage')
const Meeting = use('App/Models/Meeting')
const Helpers = use('Helpers')
const meeting_path = Helpers.publicPath('')

class MeetingController extends BaseController {
    constructor() {
        super(Meeting)
        this.sub_image_path = '/upload/meeting/meeting-';
    }

    async pagination({ request, auth, response }) {
        try {

            let modelQuery = this.model.query()
            modelQuery.whereIn("meeting.status_id", [this.status.$ACTIVE, this.status.$INACTIVE])
            modelQuery.select("*")
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
                    modelQuery.orderBy("user.updated_at", "desc")
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
                // include model
                if (queryParams.include) {
                    let include = queryParams.include.split(',')
                    for (const iterator of include) {
                        modelQuery.with(iterator, builder => {
                            builder.where('status_id', 1)
                        })
                    }
                }
                //modelQuery.where("user.id", "!=", auth.user.id)
                let datas = await modelQuery.paginate(page, perPage)
                console.log(datas)
                if (!_.isEmpty(datas)) {
                    return response.json({ 'status': 'success', 'data': datas }, 200)
                }
                return response.json({ 'status': 'error', 'error': "DATA_NOT_FOUND" }, 200)
            }
        } catch (error) {
            return response.json({ 'status': 'error', 'error': error.toString() }, 200)
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
                    MeetingImage,
                    meeting_path,
                    this.sub_image_path,
                    "meeting_id"
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
            modelQuery.join("meeting_image", "meeting_image.meeting_id", "meeting.id")
            modelQuery.select(['meeting.*'])
            modelQuery.with('meeting_image')
            modelQuery.where('meeting.id', id)
            modelQuery.whereIn("meeting.status_id", [this.status.$ACTIVE, this.status.$INACTIVE])
            let data = await modelQuery.first()
            console.log(data)
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

            const res_meeting_image = await MeetingImage.query()
                .where('meeting_id', model.id)
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
                            MeetingImage,
                            meeting_path,
                            this.sub_image_path,
                            "meeting_id")
                        if (!_.isEmpty(imageFile)) {
                            super.deleteImage(
                                MeetingImage,
                                res_meeting_image
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

module.exports = MeetingController