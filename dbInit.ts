import { sequelize } from './index.js';
import { userInit } from './models/User.js';
import { groupInit } from './models/Group.js';

try {
	await sequelize.authenticate();
	console.log('Connection has been established successfully.');
}
catch (error) {
	console.error('Unable to connect to the database:', error);
}
try {
	await groupInit();
	await userInit();
}
catch (error) {
	console.log(`There was an error while running the database sync: ${error}`);
}