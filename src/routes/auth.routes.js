const express = require('express');
const {signUp, signIn} = require('../controllers/auth.controller');
const authenticateUser = require('../utils/auth.util');

const router = express.Router();

router.post('/signup', signUp);
router.post('/signin', signIn);

// authenticating routers using middleware
router.get('/user/profile', authenticateUser, (req, res) => {
    const userId = req.userId; 
    res.json({ userId });
  });

module.exports = router;