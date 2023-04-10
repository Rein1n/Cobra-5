import { Model, DataType } from 'sequelize-typescript';
import { sequelize } from '../index.js';

class Group extends Model {
	declare GroupID: string;
	declare GuildID: string;
}

Group.init ({
	RblxID: {
		type: DataType.STRING,
	},
	GuildID: {
		type: DataType.STRING,
	},
},	{ sequelize });