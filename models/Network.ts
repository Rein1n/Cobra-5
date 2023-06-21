import { DataType, Sequelize } from 'sequelize-typescript';

const sequelize = new Sequelize();

const Network = sequelize.define('Network', {
	Name: {
		type: DataType.STRING,
	},
}, {
	timestamps: false,
});

export default Network;