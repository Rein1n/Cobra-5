import { sequelize } from '../index.js';
import User from './User.js';
import Group from './Group.js';
import Network from './Network.js';

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

module.exports = { Network, Group, User };