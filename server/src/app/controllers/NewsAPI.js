const mongoose = require('mongoose');

// models
const News = require('../models/News');

class NewsAPI {
    // [GET] /api/news/:page/:number
    async findAllWithPagination(req, res) {
        try {
            let { page, number } = req.params;
            page = parseInt(page);
            number = parseInt(number);
            const totalNews = await News
                .count({});
            const totalPage = Math.ceil(totalNews / number);
            const news = await News
                .find({})
                .skip((page - 1) * number)
                .limit(number);
            res.json({
                news,
                pagination: {
                    totalPage,
                    currentPage: page
                }
            });
        } catch (error) {
            console.log(error);
        }
    };

    // [GET] /api/news
    async findAll(req, res) {
        try {
            const news = await News
                .find({});
            res.json(news);
        } catch (error) {
            console.log(error);
        }
    };

    // [GET] /api/news/:newsSlug
    async findBySlug(req, res) {
        try {
            const { newsSlug } = req.params;
            const news = await News
                .findOne({ slug: newsSlug });
            if (!news) {
                res.json({
                    status: 'error',
                    message: 'News not found!'
                })
                return;
            };
            const prevNews = await News
                .findOne({ _id: { $lt: news._id } }).sort({ _id: -1 });
            const nextNews = await News
                .findOne({ _id: { $gt: news._id } }).sort({ _id: 1 });
            res.json({
                news,
                prevNews,
                nextNews
            });
        } catch (error) {
            console.log(error);
        }
    };

    // [POST] /api/news
    /*
        body {
            title: String,
            image: File,
            description: String
        }
    */
    async insert(req, res) {
        try {
            const news = new News({
                ...req.body,
                image: req.file.originalname
            });
            const isDeleted = await News
                .findOneDeleted({ title: news.title });
            if (isDeleted) {
                res.json({
                    statusText: 'info',
                    message: 'Tin tức tồn tại trong thùng rác!',
                    news: isDeleted
                });
                return;
            };
            await news.save();
            res.json({
                statusText: 'success',
                message: 'Thêm mới tin tức thành công',
                news: news
            });
        } catch (error) {
            console.log(error);
        }
    };

    // [PUT] /api/news/:newsId
    /*
        body {
            title: String,
            image: File,
            description: String
        }
    */
    async edit(req, res) {
        try {
            const { newsId } = req.params;
            const { title, image, ...newBody } = req.body;
            const isDeleted = await News
                .findOneDeleted({ title: title });
            if (isDeleted) {
                res.json({
                    statusText: 'info',
                    message: 'Tin tức tồn tại trong thùng rác!',
                    news: isDeleted
                });
                return;
            };
            const body = {
                ...newBody
            };
            if (req.file) {
                body.image = req.file.originalname
            }
            if (title) {
                const news = await News
                    .findById(newsId);
                news.title = title;
                await news.save();
            }
            const _news = await News
                .findByIdAndUpdate(newsId, body, {
                    new: true
                });
            res.json({
                statusText: 'success',
                message: 'Cập nhật tin tức thành công',
                news: _news
            });
        } catch (error) {
            console.log(error);
        }
    };

    // [DELETE] /api/new/:newsId
    async deleteById(req, res) {
        try {
            const deletor = mongoose.Types.ObjectId("53da93b16b4a6670076b16bf");
            const { newsId } = req.params;
            const result = await News
                .delete({ _id: newsId }, deletor);
            res.json({
                statusText: 'success',
                message: 'Xóa tin tức thành công',
                ...result,
                newsId
            });
        } catch (error) {
            console.log(error);
        }
    };

    // [PATCH] /api/news
    /*
        body {
            newsIds: Array
        }
    */
    async deleteAll(req, res) {
        try {
            const deletor = mongoose.Types.ObjectId("53da93b16b4a6670076b16bf");
            const { newsIds } = req.body;
            const result = await News
                .delete({ _id: { $in: newsIds } }, deletor);
            res.json({
                statusText: 'success',
                message: 'Xóa tin tức thành công',
                ...result,
                newsIds
            });
        } catch (error) {
            console.log(error);
        }
    };

    // [PATCH] /api/news/restore/:newsId
    async restoreById(req, res) {
        try {
            const { newsId } = req.params;
            await News
                .restore({ _id: newsId });
            res.json({
                statusText: 'success',
                message: 'Khôi phục tin tức thành công'
            });
        } catch (error) {
            console.log(error);
        }
    };
};

module.exports = new NewsAPI;
