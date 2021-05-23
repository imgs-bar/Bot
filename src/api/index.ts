import {HTTPMethod} from '@helperdiscord/centra/dist/lib/CentraRequest';
import req from '@helperdiscord/centra';

/**
 * The API class, used to make requests to the backend.
 */
export default class API {
    /**
     * The api key, used to make requests to the backend.
     */
    apiKey: string;

    constructor(apiKey: string) {
        this.apiKey = apiKey;
    }

    /**
     * Send a request to the api.
     * @param {{ endpoint: string, method: HTTPMethod, body: any }} data The request data.
     */
    async request(data: { endpoint: string, method: HTTPMethod, body?: any }) {
        const res = await req(`${process.env.BACKEND_URL}${data.endpoint}`, data.method)
            .header('Authorization', this.apiKey)
            .body(data.body)
            .send();

        if (res.statusCode === 200) return res.json();

        throw new Error(
            `${res.json().error.replace(/\b\w/g, (c: string) => c.toUpperCase())}.`
        );
    }

    /**
     * Deletes a current domain
     * @param {string} name Name of the domain
     */
    async deleteDomain(name: string) {
        return await this.request({
            endpoint: `/domains/${name}`,
            method: 'DELETE',
        });
    }
    /**
     * Deletes a current domain
     * @param {string} invite The invite
     */
    async deleteInvite(invite: string) {
        return await this.request({
            endpoint: `/invites/${invite}`,
            method: 'DELETE',
        });
    }
    /**
     * Deletes a current image
     * @param {string} filename filename of the image
     */
    async deleteImage(filename: string) {
        return await this.request({
            endpoint: `/bot/files/${filename}`,
            method: 'DELETE',
        });
    }
    async addDomain(name: string, wildcard: boolean, donated: boolean, donatedBy: string, userOnly: boolean) {
        return await this.request({
            endpoint: '/domains/',
            method: 'POST',
            body: [{
                name: name,
                wildcard: wildcard || false,
                donated: donated || false,
                donatedBy: donatedBy || 'null',
                userOnly: userOnly || false,
            }],
        });
    }
    /**
     * Get the statistics on the uploaded files.
     */
    async getFileStats() {
        return await this.request({
            endpoint: '/files',
            method: 'GET',
        });
    }

    /**
     * Get all of the server's statistics.
     */
    async getTotalStats() {
        return (await this.request({
            endpoint: '/stats/',
            method: 'GET',
        }))
    }

    /**
     * Generate an invite code.
     * @param {string} executor The user responsible
     */
    async generateInvite(executor : string) {
        return await this.request({
            endpoint: '/bot/invites',
            method: 'POST',
            body: {
                executerId: executor,
            },
        });
    }



    /**
     *
     * @param {string} id The user's identifier.
     * @param {string} reason The reason for the blacklist.
     * @param {string} executor The user responsible
     */
    async blacklist(id: string, reason: string, executor: string) {
        return await this.request({
            endpoint: '/bot/blacklist',
            method: 'POST',
            body: {
                id,
                reason: reason ? reason : 'No reason provided',
                executerId: executor,
            },
        });
    }

    async premium(id: string) {
        return await this.request({
            endpoint: '/bot/premium',
            method: 'POST',
            body: {
                id,
            },
        });
    }

    async wipeuser(id: string) {
        return await this.request({
            endpoint: '/bot/wipeuser',
            method: 'POST',
            body: {
                id,
            },
        });
    }
    async wipeFiles(id: string) {
        return await this.request({
            endpoint: '/bot/wipefiles',
            method: 'POST',
            body: {
                id,
            },
        });
    }
    async setMotd(motd: string) {
        return await this.request({
            endpoint: '/bot/setmotd',
            method: 'POST',
            body: {
                motd,
            },
        });
    }

    async unblacklist(id: string, reason: string, executer : string) {
        return await this.request({
            endpoint: '/bot/unblacklist',
            method: 'POST',
            body: {
                id,
                reason: reason ? reason : 'No reason provided',
                executerId: executer,
            },
        });
    }

    async giveinv(id: string, amount: number) {
        return await this.request({
            endpoint: '/bot/inviteadd',
            method: 'POST',
            body: {
                id,
                amount: amount,
            },
        });
    }

    async setuid(id: string, newuid: number) {
        return await this.request({
            endpoint: '/bot/setuid',
            method: 'POST',
            body: {
                id,
                newuid: newuid,
            },
        });
    }

    async invWave(amount: number) {
        return await this.request({
            endpoint: '/bot/invitewave',
            method: 'POST',
            body: {
                amount: amount,
            },
        });
    }

    async addDomains(name: Object[]) {
        return await this.request({
            endpoint: '/domains/',
            method: 'POST',
            body: name,
        });
    }

    /**
     * Get a user.
     * @param {string} id The user's identifier.
     */
    async getUsers(id: string) {
		return await this.request({
            endpoint: `/bot/users/${id}`,
            method: 'GET',
        });
    }

    /**
     * tell api to readd user's roles.
     * @param {string} id The member's id.
     */
    async addRoles(id: string) {
        return await this.request({
            endpoint: `/bot/roles/${id}`,
            method: 'GET',
        });
    }
}
