import { DataType, Sequelize } from 'sequelize-typescript';

const sequelize = new Sequelize({ dialect: 'sqlite' });

const Group = sequelize.define('Group', {
	GroupID: {
		type: DataType.STRING,
		allowNull: false,
	},
	GuildID: {
		type: DataType.STRING,
		allowNull: false,
	},
}, {
	timestamps: false,
});

export default Group;