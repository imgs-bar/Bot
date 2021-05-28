import { Message, TextChannel } from 'eris';
import { Error, Success } from '../../utils/Embeds';
import BaseCommand from '../../utils/structures/BaseCommand';

export default class SetMotdCommand extends BaseCommand {
    constructor() {
        super({
            name: 'setmotd',
            description: 'Set a MOTD. ( need motd role )',
            usage: 'setmotd newmotd',
            permissions: ['sendMessages', 'administrator'],
        });
    }

    async run(message: Message<TextChannel>, args: Array<string>) {
        if (!message.member.roles.includes("847801835842043925")) return;

        if (!args[0]) return message.channel.createMessage({
            embed: Error('Provide a new MOTD.'),
        });

        try {
            const motd = args.join(' ');
            await this.client.api.setMotd(motd);
            message.channel.createMessage({
                embed: Success('Set MOTD successfully.'),
            });
        } catch (err) {
            message.channel.createMessage({
                embed: Error(err.message),
            });
        }
    }
}
