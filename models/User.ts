import { DataType, Sequelize } from 'sequelize-typescript';

const sequelize = new Sequelize('database', 'user', 'password', {
	host: 'localhost',
	dialect: 'sqlite',
	logging: false,
	storage: 'database.sqlite',
});

const User = sequelize.define('Users', {
	DiscordID: {
		type: DataType.STRING,
	},
	RblxID: {
		type: DataType.STRING,
	},
	points: {
		type: DataType.INTEGER,
	},
	GroupID: {
		type: DataType.STRING,
	},
}, {
	timestamps: false,
});

export function userInit() {
	User.sync({ force: true });
	console.log('User synced');
}