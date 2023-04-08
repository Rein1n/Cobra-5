import { SlashCommandBuilder } from 'discord.js';

const ping = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Replies with Pong!'),
	async execute(interaction: any) {
		const sent = await interaction.reply({ content: 'Pinging...', fetchReply: true });
		interaction.editReply(`Roundtrip latency: ${sent.createdTimestamp - interaction.createdTimestamp}ms \nWebsocket heartbeat: ${interaction.client.ws.ping}ms.`);
	},
};

export default ping;