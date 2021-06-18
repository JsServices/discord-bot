import {
	SlashCommandInteraction,
	InteractionResponseFlags,
	Embed,
} from '../deps.ts';

export const data = {
	name: 'postwelcomeembed',
	description: 'Staff command',
	aliases: [],
	async execute(i: SlashCommandInteraction) {
		if (
			typeof (await i.member?.roles.get('850506552732286976')) ===
			'undefined'
		) {
			await i.respond({
				flags: InteractionResponseFlags.EPHEMERAL,
				embeds: [
					new Embed({
						author: {
							name: 'JSServices Bot',
							icon_url: i.client.user?.avatarURL(),
						},
						fields: [
							{
								name: 'Missing permssion',
								value: 'You are missing the `ADMIN` permission',
							},
						],
					}).setColor('random'),
				],
			});
			return;
		}
        
		i.respond({
			flags: InteractionResponseFlags.EPHEMERAL,
			embeds: [
				new Embed({
					author: {
						name: 'JSServices Bot',
						icon_url: i.client.user?.avatarURL(),
					},
					description: 'Sent message!',
				}).setColor('random'),
			],
		});

		const rrmsg = await i.channel?.send(
			new Embed({
				author: {
					name: 'JSServices Bot',
					icon_url: i.client.user?.avatarURL(),
				},
				fields: [
					{
						name: 'Who are we',
						value: 'We are a group of people striving to create quality community first software',
					},
					{
						name: 'Commissions',
						value: 'Commissions are currently closed! Stay tuned for more information',
					},
					{
						name: 'Links',
						value: 'See all current links with `/links`',
					},
					{
						name: 'Rules',
						value: await Deno.readTextFile('./data/rules.md'),
					},
					{
						name: 'Reaction roles',
						value: await Deno.readTextFile('./data/rr.md'),
					},
				],
				footer: {
					text: 'Got any questions? Check out #faq',
				},
			}).setColor('#2563EB')
		);
		await rrmsg?.addReaction('🔔');
		await rrmsg?.addReaction('👀');
		await rrmsg?.addReaction('⚙️');
	},
};
