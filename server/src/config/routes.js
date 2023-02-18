const router = require('express').Router();


router.use('/posts', require('../controllers/posts'));


module.exports = router;
