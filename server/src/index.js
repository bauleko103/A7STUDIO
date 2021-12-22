require('dotenv').config();
const express = require('express');
const path = require('path');
const initialRoutes = require('./routes');
const db = require('./config/db');
const cors = require('./config/cors');

const app = express();
const PORT = process.env.PORT || 5000;

db.connect();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors);
app.use('/images', express.static(path.join(__dirname, '../uploads')));

initialRoutes(app);

app.listen(PORT, () => {
    console.log(`Server is running at PORT ${PORT}`);
});
