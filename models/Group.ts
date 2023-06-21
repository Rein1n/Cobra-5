import { DataType, Sequelize } from 'sequelize-typescript';

const sequelize = new Sequelize();

const Group = sequelize.define('Group', {
	GroupID: {
		type: DataType.STRING,
	},
	GuildID: {
		type: DataType.STRING,
	},
}, {
	timestamps: false,
});

export default Group;