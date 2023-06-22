import { Sequelize, DataType } from 'sequelize-typescript';

const sequelize = new Sequelize({
	dialect: 'sqlite',
	storage: 'database.sqlite',
});

try {
	await sequelize.authenticate();
	console.log('Connection has been established successfully.');
}
catch (error) {
	console.error('Unable to connect to the database:', error);
}

const Universe = sequelize.define('Universe', {
	Name: {
		type: DataType.STRING,
	},
}, {
	timestamps: false,
});

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

Group.belongsTo(Universe);
Universe.hasMany(Group);
User.belongsTo(Group);
Group.hasMany(User);

await sequelize.sync({ alter: true })
	.catch(error =>
		console.log(error));

export { Universe, Group, User };