// models
const Footer = require('../models/Footer');

class FooterAPI {
    // [GET] /api/footer
    async findByKey(req, res) {
        try {
            const footer = await Footer
                .find({ key: 'footer' });
            res.json(footer);
        } catch (error) {
            console.log(error);
        }
    };

    // [PUT] /api/footer/connect
    /*
        body {
            connect: Array,
            key: String
        }
    */
    async editConnect(req, res) {
        try {
            const { connect } = req.body;
            await Footer
                .findOneAndUpdate({
                    key: 'footer'
                }, {
                    connect
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

    // [PUT] /api/footer/contact
    /*
        body {
            contact: Array,
            key: String
        }
    */
    async editContact(req, res) {
        try {
            const { contact } = req.body;
            await Footer
                .findOneAndUpdate({
                    key: 'footer'
                }, {
                    contact
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

    // [PUT] /api/footer/support
    /*
        body {
            support: Array,
            key: String
        }
    */
    async editSupport(req, res) {
        try {
            const { support } = req.body;
            await Footer
                .findOneAndUpdate({
                    key: 'footer'
                }, {
                    support
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

module.exports = new FooterAPI;
