import { Message, TextChannel } from 'eris';
import { Embed, Error } from '../../utils/Embeds';
import BaseCommand from '../../utils/structures/BaseCommand';

export default class StatsCommand extends BaseCommand {
    constructor() {
        super({
            name: 'stats',
            description: 'Get imgs.bar\'s statistics.',
            usage: 'stats',
            permissions: ['sendMessages'],
        });
    }

    async run(message: Message<TextChannel>, _args: Array<string>) {
        try {
            const { totalFiles, users, blacklists, premium, storageUsed, domains } = await this.client.api.getTotalStats();
            const embed = new Embed()
                .setTitle('imgs.bar statistics.')
                .addFields([
                    {
                        name: 'Users:',
                        value: `\`${users}\``,
                        inline: true,
                    },
                    {
                        name: 'Files:',
                        value: `\`${totalFiles}\``,
                        inline: true,
                    },
                    {
                        name: 'Blacklisted users:',
                        value: `\`${blacklists}\``,
                        inline: true,
                    },
                    {
                        name: 'Premium Users',
                        value: `\`${premium}\``,
                        inline: true,
                    },
                    {
                        name: 'Storage Used:',
                        value: `\`${storageUsed}\``,
                        inline: true,
                    },
                    {
                        name: 'Domains:',
                        value: `\`${domains}\``,
                        inline: true,
                    },
                ]);

            await message.channel.createMessage({
                embed: embed.embed,
            });
        } catch (err) {
            await message.channel.createMessage({
                embed: Error(err.message),
            });
        }
    }
}
