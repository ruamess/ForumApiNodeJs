const bcrypt = require('bcryptjs')
const { User } = require('../models/models')
const Router = require('express')
const router = new Router()


router.post('/registration', async (req, res) => {
	try {
		const { username, password } = req.body
		const candidate = await User.findOne({ where: { username } })
		if (!username || !password) {
			return res.status(400).json({ error: 'Неправильный email или password' })
		}
		if (candidate) {
			return res.status(400).json({ error: 'Пользователь с таким email уже существует' })
		}
		const hashPassword = await bcrypt.hash(password, 1)
		await User.create({ username, password: hashPassword })
		return res.status(201).json({ message: true })

	} catch (e) {
		console.log(e)
		return res.status(400).json({ error: 'Пожалуйста проверьте правильность введенных полей!' })
	}
})


router.post('/login', async (req, res) => {
	try {
		const { username, password } = req.body
		const user = await User.findOne({ where: { username } })
		if (!user) {
			return res.status(400).json({ error: 'Пользователь не найден' })
		}
		let comparePassword = bcrypt.compareSync(password, user.password)
		if (!comparePassword) {
			return res.status(400).json({ error: 'Неверный пароль' })
		}
		const userData = {
			id: user.id,
			username: user.username,
			password: user.password,
		}
		return res.status(200).json({ user: userData })
	} catch (e) {
		console.log(e)
		return res.status(400).json({ error: 'Пожалуйста проверьте правильность введенных полей!' })
	}
})


router.post('/get', async (req, res) => {
	try {
		const { id } = req.body
		const user = await User.findOne({ where: { id } })
		if (!user) {
			return res.status(200).json({ error: 'Неверный id пользователя' })
		}
		return res.status(200).json(user)
	} catch (e) {
		console.log(e)
		return res.status(400).json({ error: 'Пожалуйста проверьте правильность введенных полей!' })
	}
})


module.exports = router