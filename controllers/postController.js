const { Post, User } = require('../models/models')
const Router = require('express')
const router = new Router()


router.post('/create', async (req, res) => {
    try {
        const { userId, imageUrl, title, text, contacts, price } = req.body
        const user = await User.findOne({ where: { id: userId } })
        if (!user) {
            return res.status(400).json({ error: "Пользователя с таким id не существует" })
        }
        const post = await Post.create({ userId, imageUrl, title, text, contacts, price })
        user.posts = [...user.posts, post.id]
        user.save()
        return res.status(200).json({ message: "Пост успешно создан" })
    } catch (e) {
        console.log(e)
        return res.status(400).json({ error: 'Пожалуйста проверьте правильность введенных полей!' })
    }
})


router.delete('/delete', async (req, res) => {
    try {
        const { postId } = req.body
        const post = await Post.findOne({ where: { id: postId } })
        if (!post) {
            return res.status(400).json({ error: "Поста с таким id не существует" })
        }
        const user = await User.findOne({ where: { id: post.userId } })
        if (!user) {
            return res.status(400).json({ error: "Пользователя с таким id не существует" })
        }
        user.posts = user.posts.filter(postsId => postsId !== postId)
        await user.save()
        await post.destroy()
        return res.status(200).json({ message: "Пост успешно удален" })
    } catch (e) {
        console.log(e)
        return res.status(400).json({ error: 'Пожалуйста проверьте правильность введенных полей!' })
    }
})


router.get('/getAll', async (req, res) => {
    try {
        const posts = await Post.findAll()
        return res.status(200).json(posts)
    } catch (e) {
        console.log(e)
        return res.status(400).json({ error: 'Ошибка' })
    }
})

router.post('/getById', async (req, res) => {
    try {
        const { postId } = req.body
        const post = await Post.findOne({ where: { id: postId } })
        if (!post) {
            return res.status(400).json({ error: 'Поста с таким id не существует' })
        }
        return res.status(200).json(post)
    } catch (e) {
        console.log(e)
        return res.status(400).json({ error: 'Пожалуйста проверьте правильность введенных полей!' })
    }
})



module.exports = router