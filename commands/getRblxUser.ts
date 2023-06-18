import { SlashCommandBuilder, EmbedBuilder } from 'discord.js';
import noblox from 'noblox.js';
const getrblxuser = {
	data: new SlashCommandBuilder()
		.setName('getrblxuser')
		.setDescription('Gets info about a user')
		.addSubcommand(subcmd =>
			subcmd.setName('id')
				.setDescription('Uses an ID')
				.addStringOption(option =>
					option.setName('id')
						.setDescription('Uses an ID')
						.setRequired(true)))
		.addSubcommand(subcmd =>
			subcmd.setName('username')
				.setDescription('Uses a username')
				.addStringOption(option =>
					option.setName('username')
						.setDescription('Uses a username')
						.setRequired(true))),
	async execute(interaction: any) {
		try {
			let embed;
			if (interaction.options.getSubcommand() === 'id') {
				const id = interaction.options.getString('id');
				const info = await noblox.getPlayerInfo(id);
				const thumbnail = await noblox.getPlayerThumbnail(id, 720, 'png', false, 'headshot');
				embed = new EmbedBuilder()
					.setTitle(`${info.username} (aka ${info.displayName})`)
					.setURL(`https://www.roblox.com/users/${id}`)
					.setDescription(`${info.blurb}`)
					.setThumbnail(`${thumbnail.at(0)?.imageUrl}`)
					.addFields(
						{ name: 'ID', value: `${id}` },
						{ name: 'Friends', value: `${info.friendCount}` },
						{ name: 'Following', value: `${info.followingCount}` },
						{ name: 'Followers', value: `${info.followerCount}` },
						{ name: 'Join Date', value: `${info.joinDate.toDateString()}` },
					);
			}
			else if (interaction.options.getSubcommand() === 'username') {
				const id = await noblox.getIdFromUsername(interaction.options.getString('username'));
				const info = await noblox.getPlayerInfo(Number(id));
				const thumbnail = await noblox.getPlayerThumbnail(id, 720, 'png', false, 'headshot');
				embed = new EmbedBuilder()
					.setTitle(`${info.username} (aka ${info.displayName})`)
					.setURL(`https://www.roblox.com/users/${id}`)
					.setDescription(`${info.blurb}`)
					.setThumbnail(`${thumbnail.at(0)?.imageUrl}`)
					.addFields(
						{ name: 'ID', value: `${id}` },
						{ name: 'Friends', value: `${info.friendCount}` },
						{ name: 'Following', value: `${info.followingCount}` },
						{ name: 'Followers', value: `${info.followerCount}` },
						{ name: 'Join Date', value: `${info.joinDate.toDateString()}` },
					);
			}
			await interaction.reply({ embeds: [embed] });
		}
		catch (error) {
			await interaction.reply('User does not exist (Invalid ID/Username).');
		}
	},
};

export default getrblxuser;