const Router = require('express')
const userController = require('../controllers/userController')
const postController = require('../controllers/postController')
const commentController = require('../controllers/commentController')
const questionController = require('../controllers/questionController')
const router = new Router()


router.use('/user', userController)
router.use('/post', postController)
router.use('/question', questionController)
router.use('/comment', commentController)


module.exports = router