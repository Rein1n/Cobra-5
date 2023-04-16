import { SlashCommandBuilder } from 'discord.js';
import noblox from 'noblox.js';
const getRblxUser = {
	data: new SlashCommandBuilder()
		.setName('Get Roblox user')
		.setDescription('Returns the info of a Roblox user.')
		.addIntegerOption(option =>
			option.setName('ID')
				.setDescription('The Roblox ID.')),
	async execute(interaction: any) {
		const rblxId = interaction.option.getInt('ID');
		await interaction.reply({ content: rblxId });
	},
};

export default getRblxUser;