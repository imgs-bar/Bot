import {Guild, Member, Message, TextChannel} from 'eris';
import {Embed, Error} from '../utils/Embeds';
import BaseCommand from '../utils/structures/BaseCommand';
import BaseEvent from '../utils/structures/BaseEvent';


export default class GuildMemberAddEvent extends BaseEvent {
    constructor() {
        super({
            name: 'guildMemberUpdate',
        });
    }


    async run(_guild: Guild, newMember: Member, oldMember: Member ) {
        if (newMember.roles.includes(process.env.BOOSTER_ROLE) && !oldMember.roles.includes(process.env.BOOSTER_ROLE)) {
            try {
                const { link, code } = await this.client.api.generateInvite('1');

                await (await newMember.user.getDMChannel()).createMessage({
                    embed: new Embed()
                        .setTitle('Thank you for boosting!')
                        .setDescription(`Hello, ${newMember.user.username}.\n\nThank you for boosting imgs.bar, here is your invite.`).
                        addFields([
                            {
                                name: 'Direct Link',
                                value: `[Click Here](${link})`,
                            },
                            {
                                name: 'Code',
                                value: `\`\`\`${code}\`\`\``,
                            },
                        ]).embed,
                });
                await (await this.client.getChannel('823953075139903498') as TextChannel).createMessage({
                    embed: new Embed()
                        .setTitle(newMember.username + ' just boosted imgs.bar!')
                        .setDescription(`<@${newMember.id}> just boosted the server! \nThey have received an invite in dms..`).embed,
                });
            } catch (err) {
                await (await this.client.getChannel('823953075139903498') as TextChannel).createMessage({
                    embed: Error('Couldn\'t DM you an invite. Please make a ticket in <#846078745927352340>, in order to get an invite.'),
                });
            }
        }
    }
}
