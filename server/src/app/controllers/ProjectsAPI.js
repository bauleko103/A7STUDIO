const mongoose = require('mongoose');

// models
const Project = require('../models/Project');
const Architect = require('../models/Architect');

class ProjectsAPI {
    // [GET] /api/projects/:page/:number
    async findAllWithPagination(req, res) {
        try {
            let { page, number } = req.params;
            page = parseInt(page);
            number = parseInt(number);
            const totalProject = await Project
                .count({});
            const totalPage = Math.ceil(totalProject / number);
            const projects = await Project
                .find({})
                .skip((page - 1) * number)
                .limit(number);
            res.json({
                projects,
                pagination: {
                    totalPage,
                    currentPage: page
                }
            });
        } catch (error) {
            console.log(error);
        }
    };

    // [GET] /api/projects
    async findAll(req, res) {
        try {
            const projects = await Project
                .find({});
            res.json(projects);
        } catch (error) {
            console.log(error);
        }
    };

    // [GET] /api/projects/:projectSlug
    async findBySlug(req, res) {
        try {
            const { projectSlug } = req.params;
            const project = await Project
                .findOne({ slug: projectSlug });
            if (!project) {
                res.json({
                    status: 'error',
                    message: 'Project not found!'
                })
                return;
            };
            const { architectId, ...part } = project.toObject();
            const architect = await Architect
                .findOne({ _id: architectId });
            const prevProject = await Project
                .findOne({ _id: { $lt: project._id } }).sort({ _id: -1 });
            const nextProject = await Project
                .findOne({ _id: { $gt: project._id } }).sort({ _id: 1 });
            res.json({
                project: {
                    ...part,
                    architect
                },
                prevProject,
                nextProject
            });
        } catch (error) {
            console.log(error);
        }
    };

    // [POST] /api/projects
    /*
        body {
            name: String,
            image: Files,
            subtitle: String,
            description: String,
            architectId: String
        }
    */
    async insert(req, res) {
        try {
            const images = req.files.map(file => file.originalname);
            const project = new Project({
                ...req.body,
                images
            });
            const isDeleted = await Project
                .findOneDeleted({ name: project.name });
            if (isDeleted) {
                res.json({
                    statusText: 'info',
                    message: 'Dự án tồn tại trong thùng rác!',
                    project: isDeleted
                });
                return;
            };
            await project.save();
            res.json({
                statusText: 'success',
                message: 'Thêm mới dự án thành công',
                project
            });
        } catch (error) {
            console.log(error);
        }
    };

    // [PUT] /api/project/:projectId
    /*
        body {
            name: String,
            image: Files,
            subtitle: String,
            description: String,
            architectId: String
        }
    */
    async edit(req, res) {
        try {
            const { projectId } = req.params;
            const { name, images, imagesString, ...newBody } = req.body;
            const isDeleted = await Project
                .findOneDeleted({ name: name });
            if (isDeleted) {
                res.json({
                    statusText: 'info',
                    message: 'Dự án tồn tại trong thùng rác!',
                    project: isDeleted
                });
                return;
            };
            const body = {
                ...newBody
            };
            if (req.files.length > 0) {
                const images = req.files.map(file => file.originalname);
                body.images = images
            } else {
                body.images = imagesString ? imagesString : [];
            }
            if (name) {
                const project = await Project
                    .findById(projectId);
                project.name = name;
                await project.save();
            }
            const _project = await Project
                .findByIdAndUpdate(projectId, body, {
                    new: true
                });
            res.json({
                statusText: 'success',
                message: 'Cập nhật dự án thành công',
                project: _project
            });
        } catch (error) {
            console.log(error);
        }
    };

    // [DELETE] /api/projects/:projectId
    async deleteById(req, res) {
        try {
            const deletor = mongoose.Types.ObjectId("53da93b16b4a6670076b16bf");
            const { projectId } = req.params;
            const result = await Project
                .delete({ _id: projectId }, deletor);
            res.json({
                statusText: 'success',
                message: 'Xóa dự án thành công',
                ...result,
                projectId
            });
        } catch (error) {
            console.log(error);
        }
    };

    // [PATCH] /api/projects
    /*
        body {
            projectIds: Array
        }
    */
    async deleteAll(req, res) {
        try {
            const deletor = mongoose.Types.ObjectId("53da93b16b4a6670076b16bf");
            const { projectIds } = req.body;
            const result = await Project
                .delete({ _id: { $in: projectIds } }, deletor);
            res.json({
                statusText: 'success',
                message: 'Xóa dự án thành công',
                ...result,
                projectIds
            });
        } catch (error) {
            console.log(error);
        }
    };

    // [PATCH] /api/projects/restore/:projectId
    async restoreById(req, res) {
        try {
            const { projectId } = req.params;
            await Project
                .restore({ _id: projectId });
            res.json({
                statusText: 'success',
                message: 'Khôi phục dự án thành công'
            });
        } catch (error) {
            console.log(error);
        }
    };
};

module.exports = new ProjectsAPI;
