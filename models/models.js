const sequelize = require('../db')
const { DataTypes, INTEGER } = require('sequelize')


const User = sequelize.define('user', {
	id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
	username: { type: DataTypes.STRING, unique: true },
	password: { type: DataTypes.STRING },
	posts: { type: DataTypes.ARRAY(INTEGER), defaultValue: [] },
	questions: { type: DataTypes.ARRAY(INTEGER), defaultValue: [] },
})


const Comment = sequelize.define('comment', {
	id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
	postId: { type: DataTypes.INTEGER },
	questionId: { type: DataTypes.INTEGER },
	username: { type: DataTypes.STRING },
	text: { type: DataTypes.STRING }
})


const Question = sequelize.define('question', {
	id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
	userId: { type: DataTypes.INTEGER },
	title: { type: DataTypes.STRING },
	text: { type: DataTypes.STRING },
})


const Post = sequelize.define('post', {
	id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
	userId: { type: DataTypes.INTEGER },
	imageUrl: { type: DataTypes.STRING },
	title: { type: DataTypes.STRING },
	text: { type: DataTypes.STRING },
	contacts: { type: DataTypes.STRING },
	price: { type: DataTypes.STRING }
})


module.exports = {
	User,
	Post,
	Comment,
	Question
}