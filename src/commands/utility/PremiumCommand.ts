import { Message, TextChannel } from 'eris';
import { Error, Success } from '../../utils/Embeds';
import BaseCommand from '../../utils/structures/BaseCommand';

export default class LookupCommand extends BaseCommand {
    constructor() {
        super({
            name: 'premium',
            description: 'Make a user premium',
            usage: 'premium <uuid/username/email/invite/key/discord>',
            permissions: ['sendMessages', 'administrator'],
        });
    }

    async run(message: Message<TextChannel>, args: Array<string>) {
        if (!args[0] && !message.mentions[0]) return message.channel.createMessage({
            embed: Error('Provide a identifier.'),
        });
        try {
            const { users } = await this.client.api.getUsers(message.mentions[0] ? message.mentions[0].id : args[0]);

            if(users.length > 0){
                await this.client.api.premium(message.mentions[0] ? message.mentions[0] .id : args[0]);

                await message.channel.createMessage({
                    embed: Success(`${users[0].premium ? 'Gave user' : 'Removed user'} premium.`),
                });
            }
            else{
                await message.channel.createMessage({
                    embed: Error('User not found'),
                });
            }

        } catch (err) {
            await message.channel.createMessage({
                embed: Error(err.message),
            });
        }
    }
}
