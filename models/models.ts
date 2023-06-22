import User from './User.js';
import Group from './Group.js';
import Network from './Network.js';
import { Sequelize } from 'sequelize-typescript';

const sequelize = new Sequelize('database', 'user', 'password', {
	host: 'localhost',
	dialect: 'sqlite',
	logging: false,
	storage: 'database.sqlite',
});

try {
	await sequelize.authenticate();
	console.log('Connection has been established successfully.');
}
catch (error) {
	console.error('Unable to connect to the database:', error);
}

Group.belongsTo(Network);
Network.hasMany(Group);
User.belongsTo(Group);
Group.hasMany(User);

Network.create;
Group.create;
User.create;
await sequelize.sync({ force: true })
	.catch(error =>
		console.log(error));

export { Network, Group, User };