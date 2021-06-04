import {
	SlashCommandInteraction,
	InteractionResponseFlags,
	Embed,
} from '../deps.ts';

export const data = {
	name: 'links',
	description: 'Links to JSServices software',
	aliases: ['github', 'software', 'urls'],
	async execute(i: SlashCommandInteraction) {
		i.respond({
			flags: InteractionResponseFlags.EPHEMERAL,
			embeds: [
				new Embed({
					author: {
						name: 'JSServices Bot',
						icon_url: i.guild?.icon,
					},
					fields: [
						{
							name: 'Links',
							value: await Deno.readTextFile('./data/links.md'),
						},
					],
				}).setColor('random'),
			],
		});
	},
};
