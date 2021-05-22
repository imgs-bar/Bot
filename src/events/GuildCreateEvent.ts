import { Guild } from 'eris';
import BaseEvent from '../utils/structures/BaseEvent';

export default class GuildCreateEvent extends BaseEvent {
    constructor() {
        super({
            name: 'guildCreate',
        });
    }

    async run(guild: Guild) {
        if (guild.id !== '843947554014363658') await guild.leave();
    }
}
