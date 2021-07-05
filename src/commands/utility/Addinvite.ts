import { Message, TextChannel } from 'eris';
import { Error, Success } from '../../utils/Embeds';
import BaseCommand from '../../utils/structures/BaseCommand';

export default class AddinviteCommand extends BaseCommand {
    constructor() {
        super({
            name: 'giveinvites',
            description: 'Give a user an invite',
            usage: 'giveinvites (<uuid/uid/discord>) amount',
            permissions: ['sendMessages'],
        });
    }

    async run(message: Message<TextChannel>, args: Array<string>) {
        if (!message.member.roles.includes("850536478214717440")) return;

        if (!args[0] && !message.mentions[0]) return message.channel.createMessage({
            embed: Error('Provide who you want to give an invite (id / everyone)'),
        });
        try {
            if (args[0] === 'everyone') {
                if (!this.client.owners.includes(message.author.id)) return;
                await this.client.api.invWave(parseInt(args[1]));
                await message.channel.createMessage({
                    embed: Success(`Gave all users ${args[1]} invites.`),
                });
            } else {
                await this.client.api.giveinv(message.mentions[0] ? message.mentions[0] .id : args[0], parseInt(args[1]));

                await message.channel.createMessage({
                    embed: Success('Added invite(s) successfully.'),
                });
            }
        } catch (err) {
            await message.channel.createMessage({
                embed: Error(err.message),
            });
        }
    }
}
