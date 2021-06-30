import { Message, TextChannel } from 'eris';
import { Embed, Error } from '../../utils/Embeds';
import BaseCommand from '../../utils/structures/BaseCommand';

export default class LookupCommand extends BaseCommand {
    constructor() {
        super({
            name: 'lookup',
            description: 'Lookup a user.',
            usage: 'lookup <uuid/uid/discord>)',
            permissions: ['sendMessages'],
        });
    }

    async run(message: Message<TextChannel>, args: Array<string>) {
        if (!args[0]) return message.channel.createMessage({
            embed: Error('Provide a identifier.'),
        });
        try {
            const { users } = await this.client.api.getUsers(message.mentions[0] ? message.mentions[0].id : args[0]);
            for (const user of users) {
                const embed = new Embed()
                    .setDescription(`UID ${user.uid} | [${user.username}](https://imgs.bar/u/${user.uid}) (${user.blacklisted.status ? "Blacklisted" : (this.client.owners.includes(user.discord.id) ? "Owner" : (user.admin ? 'Admin' : (user.premium ? 'Premium' : 'Whitelisted')))}) | <@${user.discord.id}>`)
                    .setThumbnail({ url: user.avatar })
                    .setFooter({
                        text: `UUID ${user._id} | Invited by ${user.invitedBy}`,
                    })
                    .addFields([
                        {
                            name: `Username:`,
                            value: `\`\`\`${user.username}\`\`\``,
                            inline: true,
                        },
                        {
                            name: 'UID:',
                            value: `\`\`\`${user.uid}\`\`\``,
                            inline: true,
                        },
                        {
                            name: 'Uploads:',
                            value: `\`\`\`${user.uploads}\`\`\``,
                            inline: false,
                        },
                        {
                            name: 'Last Login:',
                            value: `\`\`\`${new Date(user.lastLogin).toLocaleString()}\`\`\``,
                            inline: false,
                        },
                        {
                            name: 'Register Date:',
                            value: `\`\`\`${new Date(user.registrationDate).toLocaleString()}\`\`\``,
                            inline: false,
                        },
                        {
                            name: 'Invites:',
                            value: `\`\`\`${user.invites}\`\`\``,
                            inline: false,
                        },
                        {
                            name: `Admin:`,
                            value: `\`\`\`${user.admin}\`\`\``,
                            inline: true,
                        },
                        {
                            name: 'Blacklisted:',
                            value: `\`\`\`${user.blacklisted.status} | ${user.blacklisted.reason}\`\`\``,
                            inline: true,
                        },
                    ]);
                await message.channel.createMessage({
                    embed: embed.embed,
                });
            }
        } catch (err) {
            message.channel.createMessage({
                embed: Error(err.message),
            });
        }
    }
}
