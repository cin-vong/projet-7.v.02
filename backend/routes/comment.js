const express = require('express');
const router = express.Router();      
const commentCtrl = require('../controllers/comment');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');


router.get('/', commentCtrl.getAllComments);
router.post('/commenty', multer, commentCtrl.comment);
router.get('/:id', commentCtrl.getOneComment);
router.delete('/:id', commentCtrl.deleteComment);

module.exports = router;