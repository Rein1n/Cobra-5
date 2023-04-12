import { DataType, Sequelize } from 'sequelize-typescript';

const sequelize = new Sequelize('database', 'user', 'password', {
	host: 'localhost',
	dialect: 'sqlite',
	logging: false,
	storage: 'database.sqlite',
});

const Group = sequelize.define('Group', {
	RblxID: {
		type: DataType.STRING,
	},
	GuildID: {
		type: DataType.STRING,
	},
}, {
	timestamps: false,
});

export function groupInit() {
	Group.sync({ force: true });
	console.log('Group synced');
}