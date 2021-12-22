// 
const projectsRouter = require('./projects');
const architectsRouter = require('./architects');
const newsRouter = require('./news');
const aboutRouter = require('./about');
const accountsRouter = require('./accounts');
const menusRouter = require('./menus');
const footerRouter = require('./footer');
const bannersRouter = require('./banners');

const initialRoutes = (app) => {
    app.use('/api/projects', projectsRouter);
    app.use('/api/architects', architectsRouter);
    app.use('/api/news', newsRouter);
    app.use('/api/about', aboutRouter);
    app.use('/api/accounts', accountsRouter);
    app.use('/api/menus', menusRouter);
    app.use('/api/footer', footerRouter);
    app.use('/api/banners', bannersRouter);
};

module.exports = initialRoutes;
