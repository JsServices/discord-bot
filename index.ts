import {
	Client,
	token,
	GatewayIntents,
	SlashCommandOption,
	SlashCommandHandlerCallback,
} from './deps.ts';

const bot = new Client();

bot.on('ready', async () => {
    console.log("Started bot");
    (await (await bot.slash.commands.all()).array()).forEach(cmd=>{
        bot.slash.commands.delete(cmd.id)
    })
	for await (const file of Deno.readDir('./commands')) {
		if (!file.isFile || !file.name.endsWith('.ts')) continue;
		const command: CommandData = (await import('./commands/' + file.name))
			.data;
		bot.slash.commands.create({
			name: command.name,
			options: command.options,
			description: command.description,
		}, '849844854884007966');
		bot.slash.handle(command.name, command.execute);
        if(command.aliases?.length == null) return;
		for (const alias of command.aliases) {
			bot.slash.commands.create({
				name: alias,
				options: command.options,
				description: command.description,
			}, '849844854884007966');
			bot.slash.handle(alias, command.execute);
		}
	}
});

bot.connect(token || Deno.env.get('token'), [GatewayIntents.GUILDS, GatewayIntents.GUILD_MESSAGES]);

interface CommandData {
	name: string;
	description: string;
	aliases?: string;
	options?: SlashCommandOption[];
	execute: SlashCommandHandlerCallback;
}
