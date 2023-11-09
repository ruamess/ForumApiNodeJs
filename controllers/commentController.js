const { Comment, Post, Question } = require('../models/models')
const Router = require('express')
const router = new Router()


router.post('/create', async (req, res) => {
  try {
    const { username, postId, questionId, text } = req.body
    if (postId) {
      const post = await Post.findOne({ where: { id: postId } })
      if (!post) {
        return res.status(400).json({ error: "Поста c таким id не существует" })
      }
      await Comment.create({ postId, username, text })
      return res.status(200).json({ message: "Комментарий создан" })
    }
    if (questionId) {
      const question = await Question.findOne({ where: { id: questionId } })
      if (!question) {
        return res.status(400).json({ error: "Вопроса c таким id не существует" })
      }
      await Comment.create({ questionId, username, text })
      return res.status(200).json({ message: "Комментарий создан" })
    }
  } catch (e) {
    console.log(e)
    return res.status(400).json({ error: 'Пожалуйста проверьте правильность введенных полей!' })
  }
})


router.delete('/delete', async (req, res) => {
  try {
    const { postId, questionId } = req.body
    if (postId) {
      const postComment = await Comment.findOne({ where: { postId } })
      if (!postComment) {
        return res.status(400).json({ error: "Поста c таким id не существует" })
      }
      await postComment.destroy()
      return res.status(200).json({ message: "Комментарий успешно удален" })
    }
    if (questionId) {
      const questionComment = await Comment.findOne({ where: { questionId } })
      if (!questionComment) {
        return res.status(400).json({ error: "Вопроса c таким id не существует" })
      }
      await questionComment.destroy()
      return res.status(200).json({ message: "Комментарий успешно удален" })
    }
  } catch (e) {
    console.log(e)
    return res.status(400).json({ error: 'Пожалуйста проверьте правильность введенных полей!' })
  }
})


router.post('/get', async (req, res) => {
  try {
    const { postId, questionId } = req.body
    if (postId) {
      const postComments = await Comment.findAll({ where: { postId } })
      return res.status(200).json(postComments)
    }
    if (questionId) {
      const questionComments = await Comment.findAll({ where: { questionId } })
      return res.status(200).json(questionComments)
    }
  } catch (e) {
    console.log(e)
    return res.status(400).json({ error: 'Пожалуйста проверьте правильность введенных полей!' })
  }
})


module.exports = router