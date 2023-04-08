import { SlashCommandBuilder, EmbedBuilder } from 'discord.js';

const embed = new EmbedBuilder()
	.setColor(0x0099FF)
	.setTitle('Help')
	.setDescription('ReinOS was created by Reinin#9955')
	.addFields(
		{ name: '/help', value: 'This command you just ran!' },
		{ name: '/ping', value: 'Returns the roundtrip latency and Websocket heartbeat.' },
	);
const help = {
	data: new SlashCommandBuilder()
		.setName('help')
		.setDescription('Shows all commands and their descriptions.'),
	async execute(interaction: any) {
		await interaction.reply({ embeds: [embed] });
	},
};

export default help;