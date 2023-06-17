import { SlashCommandBuilder, EmbedBuilder } from 'discord.js';
import noblox from 'noblox.js';
const getrblxuser = {
	data: new SlashCommandBuilder()
		.setName('getrblxuser')
		.setDescription('Gets info about a user')
		.addIntegerOption(Option =>
			Option.setName('id')
				.setDescription('Uses an ID')
				.setRequired(true)),
	async execute(interaction: any) {
		const id = interaction.options.getInteger('id');
		const info = await noblox.getPlayerInfo(id);
		const thumbnail = await noblox.getPlayerThumbnail(id, 720, 'png', false, 'headshot');
		console.log(thumbnail.at(0)?.imageUrl);
		const embed = new EmbedBuilder()
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
		console.log(info);
		await interaction.reply({ embeds: [embed] });
	},
};

export default getrblxuser;