import { Message, TextChannel } from 'eris';
import { Error, Success } from '../../utils/Embeds';
import BaseCommand from '../../utils/structures/BaseCommand';

export default class BlacklistCommand extends BaseCommand {
    constructor() {
        super({
            name: 'unblacklist',
            description: 'Unblacklist a user.',
            usage: 'unblacklist <uuid/username/email/invite/key/discord>',
            permissions: ['sendMessages', 'administrator'],
        });
    }

    async run(message: Message<TextChannel>, args: Array<string>) {
        if (!args[0]) return message.channel.createMessage({
            embed: Error('Provide someone to unblacklist'),
        });

        try {
            const reason = args.slice(1).join(' ');

            await this.client.api.unblacklist(message.mentions[0] ? message.mentions[0] .id : args[0], reason, message.author.id);

            await message.channel.createMessage({
                embed: Success('Unblacklisted user successfully.'),
            });
        } catch (err) {
            await message.channel.createMessage({
                embed: Error(err.message),
            });
        }
    }
}
