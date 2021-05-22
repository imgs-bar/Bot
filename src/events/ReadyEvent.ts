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
            const { totalFiles, totalUsers, storageUsed, count } = await this.client.api.getTotalStats();
            const members = this.client.guilds.get('843947554014363658')?.memberCount;
            const random = this.randomInteger(1, 4);
            if (random == 1) {
                this.client.editStatus('dnd', {
                    name: `${totalUsers.toLocaleString()} users.`,
                    type: 2,
                });
            } else if (random == 2) {
                this.client.editStatus('dnd', {
                    name: `over ${totalFiles.toLocaleString()} files.`,
                    type: 3,
                });
            } else if (random == 3) {
                this.client.editStatus('dnd', {
                    name: `over ${totalFiles.toLocaleString()} files.`,
                    type: 3,
                });
            } else {
                this.client.editStatus('dnd', {
                    name: `${count.toLocaleString()} domains.`,
                    type: 2,
                });
            }
            if ((this.client.getChannel('845705756934144010') as VoiceChannel).name != 'Members: ' + members) {
                await this.client.editChannel('845705756934144010', {
                    name: 'Members: ' + members?.toLocaleString(),
                }).catch((e) => console.log(e));
            }
            if ((this.client.getChannel('845705878392012800') as VoiceChannel).name != 'Users: ' + totalUsers) {
                await this.client.editChannel('845705878392012800', {
                    name: 'Users: ' + totalUsers.toLocaleString(),
                }).catch((e) => console.log(e));
            }
            if ((this.client.getChannel('845705893173788672') as VoiceChannel).name != 'Files: ' + totalFiles) {
                await this.client.editChannel('845705893173788672', {
                    name: 'Files: ' + totalFiles.toLocaleString(),
                }).catch((e) => console.log(e));
            }
            if ((this.client.getChannel('845705947644035073') as VoiceChannel).name != 'Storage Used: ' + storageUsed) {
                await this.client.editChannel('845705947644035073', {
                    name: 'Storage Used: ' + storageUsed.toLocaleString(),
                }).catch((e) => console.log(e));
            }
            if ((this.client.getChannel('845705968809803818') as VoiceChannel).name != 'Domains: ' + count) {
                await this.client.editChannel('845705968809803818', {
                    name: 'Domains: ' + count.toLocaleString(),
                }).catch((e) => console.log(e));
            }
            if ((this.client.getChannel('845705986383020065') as VoiceChannel).name != 'Boosts: ' + this.client.guilds.get('843947554014363658')?.premiumSubscriptionCount?.toLocaleString()) {
                await this.client.editChannel('845705986383020065', {
                    name: 'Boosts: ' + this.client.guilds.get('843947554014363658')?.premiumSubscriptionCount?.toLocaleString(),
                }).catch((e) => console.log(e));
            }
            setTimeout(async () => {
                await this.changeStatus();
            }, 300000);
        } catch (err) {}
    }

    randomInteger(min: number, max: number) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    async run() {
        await this.changeStatus();
        console.log(`Logged in as ${this.client.user.username}#${this.client.user.discriminator}`);
    }
}
