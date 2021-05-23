import BaseEvent from '../utils/structures/BaseEvent';
import { VoiceChannel } from 'eris';

export default class ReadyEvent extends BaseEvent {
    constructor() {
        super({
            name: 'ready',
        });
    }

    /**
     * Update the bots status.
     */
    async changeStatus() {
        try {
            const { totalFiles, users, storageUsed, domains } = await this.client.api.getTotalStats();
            const members = this.client.guilds.get('823952393808642088')?.memberCount;
            const random = this.randomInteger(1, 4);
            if (random == 1) {
                this.client.editStatus('dnd', {
                    name: `${users.toLocaleString()} users.`,
                    type: 2,
                });
            } else if (random == 2) {
                this.client.editStatus('dnd', {
                    name: `over ${totalFiles.toLocaleString()} files.`,
                    type: 3,
                });
            } else if (random == 3) {
                this.client.editStatus('dnd', {
                    name: `over ${storageUsed}.`,
                    type: 3,
                });
            } else {
                this.client.editStatus('dnd', {
                    name: `${domains.toLocaleString()} domains.`,
                    type: 2,
                });
            }
            if ((this.client.getChannel('843887915716050944') as VoiceChannel).name != 'Members: ' + members) {
                await this.client.editChannel('843887915716050944', {
                    name: 'Members: ' + members?.toLocaleString(),
                }).catch((e) => console.log(e));
            }
            if ((this.client.getChannel('843887918618509323') as VoiceChannel).name != 'Users: ' + users) {
                await this.client.editChannel('843887918618509323', {
                    name: 'Users: ' + users.toLocaleString(),
                }).catch((e) => console.log(e));
            }
            if ((this.client.getChannel('843887921873420309') as VoiceChannel).name != 'Files: ' + totalFiles) {
                await this.client.editChannel('843887921873420309', {
                    name: 'Files: ' + totalFiles.toLocaleString(),
                }).catch((e) => console.log(e));
            }
            if ((this.client.getChannel('845968466086985768') as VoiceChannel).name != 'Storage Used: ' + storageUsed) {
                await this.client.editChannel('845968466086985768', {
                    name: 'Storage Used: ' + storageUsed.toLocaleString(),
                }).catch((e) => console.log(e));
            }
            if ((this.client.getChannel('845968481568555030') as VoiceChannel).name != 'Domains: ' + domains) {
                await this.client.editChannel('845968481568555030', {
                    name: 'Domains: ' + domains.toLocaleString(),
                }).catch((e) => console.log(e));
            }
            if ((this.client.getChannel('845968503285612545') as VoiceChannel).name != 'Boosts: ' + this.client.guilds.get('823952393808642088')?.premiumSubscriptionCount?.toLocaleString()) {
                await this.client.editChannel('845968503285612545', {
                    name: 'Boosts: ' + this.client.guilds.get('823952393808642088')?.premiumSubscriptionCount?.toLocaleString(),
                }).catch((e) => console.log(e));
            }
            setTimeout(async () => {
                await this.changeStatus();
            }, 300000);
        } catch (err) {
            console.log(err)
        }
    }

    randomInteger(min: number, max: number) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    async run() {
        await this.changeStatus();
        console.log(`Logged in as ${this.client.user.username}#${this.client.user.discriminator}`);
    }
}
