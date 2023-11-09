const { User, Question } = require('../models/models')
const Router = require('express')
const router = new Router()


router.post('/create', async (req, res) => {
    try {
        const { userId, title, text } = req.body
        const user = await User.findOne({ where: { id: userId } })
        if (!user) {
            return res.status(400).json({ error: "Пользователя с таким id не существует" })
        }
        const question = await Question.create({ userId, title, text, })
        user.questions = [...user.questions, question.id]
        user.save()
        return res.status(200).json({ message: "Вопрос успешно создан" })
    } catch (e) {
        console.log(e)
        return res.status(400).json({ error: 'Пожалуйста проверьте правильность введенных полей!' })
    }
})


router.delete('/delete', async (req, res) => {
    try {
        const { questionId } = req.body
        const question = await Question.findOne({ where: { id: questionId } })
        if (!question) {
            return res.status(400).json({ error: "Вопроса с таким id не существует" })
        }
        const user = await User.findOne({ where: { id: question.userId } })
        if (!user) {
            return res.status(400).json({ error: "Пользователя с таким id не существует" })
        }
        user.questions = user.questions.filter(questionsId => questionsId !== questionId)
        await user.save()
        await question.destroy()
        return res.status(200).json({ message: "Вопрос успешно удален" })
    } catch (e) {
        console.log(e)
        return res.status(400).json({ error: 'Пожалуйста проверьте правильность введенных полей!' })
    }
})


router.get('/getAll', async (req, res) => {
    try {
        const questions = Question.findAll()
        return res.status(200).json(questions)
    } catch (e) {
        console.log(e)
        return res.status(400).json({ error: 'Пожалуйста проверьте правильность введенных полей!' })
    }
})


router.post('/getById', async (req, res) => {
    try {
        const { questionId } = req.body
        const question = Question.findOne({ where: { id: questionId } })
        if (!question) {
            return res.status(400).json({ error: 'Вопроса с таким id не существует' })
        }
        return res.status(200).json(question)
    } catch (e) {
        console.log(e)
        return res.status(400).json({ error: 'Пожалуйста проверьте правильность введенных полей!' })
    }
})


module.exports = router