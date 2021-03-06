import { Message, TextChannel } from 'eris';
import { Embed, Error } from '../../utils/Embeds';
import BaseCommand from '../../utils/structures/BaseCommand';

export default class LookupCommand extends BaseCommand {
    constructor() {
        super({
            name: 'oldlookup',
            description: 'Lookup a user.',
            usage: 'oldlookup <uuid/uid/discord>)',
            permissions: ['sendMessages'],
        });
    }

    async run(message: Message<TextChannel>, args: Array<string>) {
        if (!args[0]) return message.channel.createMessage({
            embed: Error('Provide a identifier.'),
        });
        try {
            const { users } = await this.client.api.getUsers(message.mentions[0] ? message.mentions[0] .id : args[0]);
            for (const user of users) {
                const embed = new Embed()
                    .setDescription(`UID ${user.uid} | [${user.username}](https://imgs.bar/u/${user.uid}) (${user.blacklisted.status ? "Blacklisted" : ( this.client.owners.includes(user.discord.id) ? "Owner" :  (user.admin ? 'Admin' : (user.premium ? 'Premium' : 'Whitelisted')))})`)
                    .setThumbnail({url: user.avatar})
                    .setFooter({
                        text: `UUID ${user._id} | Invited by ${user.invitedBy}`,
                    })
                    .addFields([
                        {
                            name: 'Statistics',
                            value: `Uploaded ${user.uploads} images\n Last login was ${new Date(user.lastLogin).toLocaleString()}, registered at ${new Date(user.registrationDate).toLocaleString()}`,
                            inline: true,
                        },
                        {
                            name: 'Discord',
                            value: user.discord.id ? `<@${user.discord.id}>` : 'Not Linked',
                            inline: true,
                        },
                        {
                            name: 'Invited users:',
                            value: user.invitedUsers[0] ? `\`\`\`${user.invitedUsers.join(', ')}\`\`\`` : 'None',
                            inline: false,
                        },
                    ]);
                await message.channel.createMessage({
                    embed: embed.embed,
                });
            }
        } catch (err) {
            await message.channel.createMessage({
                embed: Error(err.message),
            });
        }
    }
}
