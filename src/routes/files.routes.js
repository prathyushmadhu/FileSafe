const express = require('express');
const {uploadFile, listFiles, fetchFile, updateFile} = require('../controllers/file.controller');
const { authenticateUser } = require('../utils/auth.util');
const upload = require('../config/multer.config');

const router = express.Router();

router.post('/',authenticateUser, upload.single('file'), uploadFile);
router.get('/', authenticateUser, listFiles);
router.get('/:id', authenticateUser, fetchFile);
router.put('/:id', authenticateUser,  updateFile);


module.exports = router;

