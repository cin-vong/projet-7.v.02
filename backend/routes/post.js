const express = require('express');
const router = express.Router();      
const postCtrl = require('../controllers/post');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

router.get('/', postCtrl.getAllPost);
router.post('/new', multer, postCtrl.createPost);
router.put('/:id', postCtrl.modifyOnePost);
router.get('/:id',  postCtrl.getOnePost);
router.delete('/:id', postCtrl.deletePost);

module.exports = router;

//auth probleme