const express = require('express');
const fileController = require('../controllers/file.controller');
const {  authenticateUser } = require('../utils/auth.util');

const router = express.Router();

router.get('/', authenticateUser, fileController.listFiles);
router.get('/:id', authenticateUser, fileController.downloadFile);
router.put('/:id', authenticateUser,  fileController.updateFile);
router.delete('/:id', authenticateUser, fileController.deleteFile);


module.exports = router;

