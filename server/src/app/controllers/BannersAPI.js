// models
const Banner = require('../models/Banner');

class BannersAPI {
    // [GET] /api/banners
    async findByKey(req, res) {
        try {
            const banner = await Banner
                .findOne({ key: 'banner' });
            res.json(banner);
        } catch (error) {
            console.log(error);
        }
    };

    // [PUT] /api/menus
    /*
        body {
            banners: Files
        }
    */
    async edit(req, res) {
        try {
            const { bannersString } = req.body;
            let bannerFiles = [];
            if (req.files.length > 0) {
                bannerFiles = req.files.map(file => file.originalname);
            }
            await Banner
                .findOneAndUpdate({
                    key: 'banner'
                }, {
                    banners: req.files.length > 0 ? bannerFiles : bannersString ? bannersString : []
                }, {
                    upsert: true
                });
            res.json({
                statusText: 'success',
                message: 'Cập nhật thành công'
            });
        } catch (error) {
            console.log(error);
        }
    };
};

module.exports = new BannersAPI;
