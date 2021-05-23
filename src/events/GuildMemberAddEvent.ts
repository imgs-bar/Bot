import {Guild, Member, Message} from 'eris';
import { Error } from '../utils/Embeds';
import BaseCommand from '../utils/structures/BaseCommand';
import BaseEvent from '../utils/structures/BaseEvent';


export default class GuildMemberAddEvent extends BaseEvent {
    constructor() {
        super({
            name: 'guildMemberAdd',
        });
    }


    async run(guild: Guild, member: Member) {
        if (member.bot) return;
        await this.client.api.addRoles(member.id)
    }
}
