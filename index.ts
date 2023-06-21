import 'dotenv/config';
import { Sequelize } from 'sequelize-typescript';
import {
	Client,
	Collection,
	Events,
	GatewayIntentBits,
	REST,
	Routes,
} from 'discord.js';
import type {
	ChatInputCommandInteraction,
	SlashCommandBuilder,
	SlashCommandSubcommandsOnlyBuilder,
} from 'discord.js';

import ping from './commands/ping.js';
import help from './commands/help.js';
import getrblxuser from './commands/getRblxUser.js';
import verify from './commands/verify.js';
const { token, client_id } = process.env;
const commands = [];
const cmds = new Collection<string, { data: Omit<SlashCommandBuilder, 'addSubcommand' | 'addSubcommandGroup'> | SlashCommandBuilder | SlashCommandSubcommandsOnlyBuilder, execute: (interaction: ChatInputCommandInteraction) => Promise<void> }>();

commands.push(ping.data.toJSON());
commands.push(help.data.toJSON());
commands.push(getrblxuser.data.toJSON());
commands.push(verify.data.toJSON());
cmds.set('ping', ping);
cmds.set('help', help);
cmds.set('getrblxuser', getrblxuser);
cmds.set('verify', verify);

const rest = new REST({ version: '10' }).setToken(token as string);
// Create a new client instance
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

const sequelize = new Sequelize('database', 'user', 'password', {
	host: 'localhost',
	dialect: 'sqlite',
	logging: false,
	storage: 'database.sqlite',
});
export { sequelize };

(async () => {
	try {
		console.log(`Started refreshing ${commands.length} application (/) commands.`);

		// The put method is used to fully refresh all commands in the guild with the current set
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		const data = await rest.put(
			Routes.applicationCommands(client_id as string),
			{ body: commands },
		);

		console.log(`Successfully reloaded ${commands.length} application (/) commands.`);
	}
	catch (error) {
		// And of course, make sure you catch and log any errors!
		console.error(error);
	}
})();

// When the client is ready, run this code (only once)
// We use 'c' for the event parameter to keep it separate from the already defined 'client'
client.once(Events.ClientReady, c => {
	console.log(`Ready! Logged in as ${c.user.tag}`);
	if (client.user) {
		client.user.setActivity('with TypeScript');
	}
});

client.on(Events.InteractionCreate, async interaction => {
	if (!interaction.isChatInputCommand()) return;

	const command = cmds.get(interaction.commandName);

	if (!command) return;

	try {
		await command.execute(interaction);
	}
	catch (error) {
		console.error(error);
		if (interaction.replied || interaction.deferred) {
			await interaction.followUp({ content: 'There was an error while executing this command!', ephemeral: true });
		}
		else {
			await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
		}
	}
});

// Log in to Discord with your client's token

client.login(token);