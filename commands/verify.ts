import { SlashCommandBuilder, EmbedBuilder } from 'discord.js';
import axios from 'axios';
import noblox from 'noblox.js';
const verify = {
	data: new SlashCommandBuilder()
		.setName('verify')
		.setDescription('Links a roblox user to a discord user.')
		.addUserOption(option =>
			option.setName('user')
				.setDescription('selects a user')
				.setRequired(false)),
	async execute(interaction: any) {
		const guild = interaction.guild;
		const user = interaction.options.getUser('user') ?? interaction.user;
		const api = axios.create({
			baseURL: 'https://api.rowifi.xyz/v2',
			headers: {
				'Authorization': 'Bot 8fjwAqOiQnMKUk58',
			},
		});

		api.get(`/guilds/${guild.id}/members/${user.id}`)
			.then(async (response) => {
				const rblxID = await response.data.roblox_id;
				const info = noblox.getPlayerInfo(rblxID);
				const thumbnail = await noblox.getPlayerThumbnail(rblxID, 720, 'png', false, 'headshot');
				const embed = new EmbedBuilder()
					.setTitle(`Welcome, ${(await info).username}`)
					.setColor('#09c82a')
					.setURL(`https://www.roblox.com/users/${rblxID}`)
					.setDescription('You have been successfully verified.')
					.setThumbnail(`${thumbnail.at(0)?.imageUrl}`);
				await interaction.reply({ embeds: [embed] });
			})
			.catch(async (error) => {
				console.log(api);
				console.log(error.response.status);
				if (error.response.status == 404) {
					const embed = new EmbedBuilder()
						.setTitle('Learn how to verify')
						.setColor('#c70a0a')
						.setURL('https://rowifi.xyz/docs/verification/')
						.setDescription(`${user} was not found.\nOur backend utilizes RoWifi for verification, after you verify with them, run the \`/verify\` command again. `);
					await interaction.reply({ embeds: [embed] });
				}
			});
	},
};

export default verify;