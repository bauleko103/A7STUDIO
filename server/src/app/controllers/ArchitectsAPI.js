const mongoose = require('mongoose');

// models
const Architect = require('../models/Architect');

class ArchitectsAPI {
    // [GET] /api/architects
    async findAll(req, res) {
        try {
            const architects = await Architect
                .find({});
            res.json(architects);
        } catch (error) {
            console.log(error);
        }
    };

    // [GET] /api/architects/:architectId
    async findById(req, res) {
        try {
            const { architectId } = req.params;
            const architect = await Architect
                .findOne({ _id: architectId });
            res.json(architect);
        } catch (error) {
            console.log(error);
        }
    };

    // [POST] /api/architects
    /*
        body {
            name: String,
            image: File,
            subtitle: String
        }
    */
    async insert(req, res) {
        try {
            const architect = new Architect({
                ...req.body,
                image: req.file.originalname
            });
            await architect.save();
            res.json({
                statusText: 'success',
                message: 'Thêm mới kiến trúc sư thành công',
                architect
            });
        } catch (error) {
            console.log(error);
        }
    };

    // [PUT] /api/architects/:architectId
    /*
        body {
            name: String,
            image: File,
            subtitle: String
        }
    */
    async edit(req, res) {
        try {
            const { architectId } = req.params;
            const { image, ...architectBody } = req.body;
            const body = {
                ...architectBody
            };
            if (req.file) {
                body.image = req.file.originalname
            }
            const architect = await Architect
                .findByIdAndUpdate(architectId, body, {
                    new: true
                });
            res.json({
                statusText: 'success',
                message: 'Cập nhật kiến trúc sư thành công',
                architect
            });
        } catch (error) {
            console.log(error);
        }
    };

    // [DELETE] /api/architects/:architectId
    async deleteById(req, res) {
        try {
            const deletor = mongoose.Types.ObjectId("53da93b16b4a6670076b16bf");
            const { architectId } = req.params;
            const result = await Architect
                .delete({ _id: architectId }, deletor);
            res.json({
                statusText: 'success',
                message: 'Xóa kiến trúc sư thành công',
                ...result,
                architectId
            });
        } catch (error) {
            console.log(error);
        }
    };

    // [DELETE] /api/architects
    /*
        body {
            architects: Array
        }
    */
    async deleteAll(req, res) {
        try {
            const deletor = mongoose.Types.ObjectId("53da93b16b4a6670076b16bf");
            const { architectIds } = req.body;
            const result = await Architect
                .delete({ _id: { $in: architectIds } }, deletor);
            res.json({
                statusText: 'success',
                message: 'Xóa kiến trúc sư thành công',
                ...result,
                architectIds
            });
        } catch (error) {
            console.log(error);
        }
    };
};

module.exports = new ArchitectsAPI;
