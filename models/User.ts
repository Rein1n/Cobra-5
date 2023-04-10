import { Model, DataType } from 'sequelize-typescript';
import { sequelize } from '../index.js';

class User extends Model {
	declare DiscordID: string;
	declare RblxID: string;
	declare points: number;
	declare GroupID: string;
}

User.init ({
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
},	{ sequelize });