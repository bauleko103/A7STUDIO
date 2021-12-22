// models
const Menu = require('../models/Menu');

class MenusAPI {
    // [GET] /api/menus
    async findAll(req, res) {
        try {
            const menus = await Menu
                .find({});
            res.json(menus);
        } catch (error) {
            console.log(error);
        }
    };

    // [PUT] /api/menus
    /*
        body {
            data: Array
        }
    */
    async edit(req, res) {
        try {
            await Promise.all(req.body.map(async menu => {
                const { key, ...body } = menu;
                await Menu
                    .findOneAndUpdate({
                        key: key
                    }, {
                        ...body
                    }, {
                        upsert: true
                    });
            }));
            res.json({
                statusText: 'success',
                message: 'Cập nhật thành công'
            });
        } catch (error) {
            console.log(error);
        }
    };
};

module.exports = new MenusAPI;
