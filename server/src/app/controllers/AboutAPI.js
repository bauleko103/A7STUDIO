// models
const About = require('../models/About');

class AboutAPI {
    // [GET] /api/about
    async findByKey(req, res) {
        try {
            const about = await About
                .findOne({ key: 'about-key' });
            res.json(about);
        } catch (error) {
            console.log(error);
        }
    };

    // [PUT] /api/about
    /*
        body {
            text: String
        }
    */
    async edit(req, res) {
        try {
            await About
                .findOneAndUpdate({
                    key: 'about-key'
                }, req.body, {
                    upsert: true
                });
            res.json({
                statusText: 'success',
                message: 'Cập nhật thông tin thành công'
            });
        } catch (error) {
            console.log(error);
        }
    };
};

module.exports = new AboutAPI;
