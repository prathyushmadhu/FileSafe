const express = require('express');
const authRoutes = require('./auth.routes');
const fileRoutes = require('./files.routes');


const router = express.Router();

router.use('/auth', authRoutes);

router.use('/files', filesRoutes);

module.exports = router;







