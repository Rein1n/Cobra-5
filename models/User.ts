import { DataType, Sequelize } from 'sequelize-typescript';

const sequelize = new Sequelize({ dialect: 'sqlite' });

const User = sequelize.define('Users', {
	RblxID: {
		type: DataType.STRING,
		allowNull: false,
	},
	points: {
		type: DataType.INTEGER,
		defaultValue: 0,
	},
}, {
	timestamps: false,
});

export default User;