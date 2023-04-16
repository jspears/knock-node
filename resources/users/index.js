"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Users = void 0;
const helpers_1 = require("../preferences/helpers");
class Users {
    constructor(knock) {
        this.knock = knock;
    }
    //
    // User management
    //
    identify(userId, properties = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!userId) {
                throw new Error(`Incomplete arguments. At a minimum you need to specify 'userId'.`);
            }
            const { data } = yield this.knock.put(`/v1/users/${userId}`, properties);
            return data;
        });
    }
    bulkIdentify(users) {
        return __awaiter(this, void 0, void 0, function* () {
            const attrs = { users };
            const { data } = yield this.knock.post(`/v1/users/bulk/identify`, attrs);
            return data;
        });
    }
    get(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!userId) {
                throw new Error(`Incomplete arguments. You must provide a 'userId'`);
            }
            const { data } = yield this.knock.get(`/v1/users/${userId}`);
            return data;
        });
    }
    list(filteringOptions = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            const { data } = yield this.knock.get(`/v1/users`, filteringOptions);
            return data;
        });
    }
    delete(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!userId) {
                throw new Error(`Incomplete arguments. You must provide a 'userId'`);
            }
            const { data } = yield this.knock.delete(`/v1/users/${userId}`);
            return data;
        });
    }
    bulkDelete(userIds) {
        return __awaiter(this, void 0, void 0, function* () {
            const attrs = { user_ids: userIds };
            const { data } = yield this.knock.post(`/v1/users/bulk/delete`, attrs);
            return data;
        });
    }
    merge(toUserId, fromUserId) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!toUserId || !fromUserId) {
                throw new Error(`Incomplete arguments. You must provide both a 'toUserId' and a 'fromUserId'.`);
            }
            const { data } = yield this.knock.post(`/v1/users/${toUserId}/merge`, {
                from_user_id: fromUserId,
            });
            return data;
        });
    }
    //
    // Feeds
    //
    getFeed(userId, channelId, feedOptions = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            const { data } = yield this.knock.get(`/v1/users/${userId}/feeds/${channelId}`, feedOptions);
            return data;
        });
    }
    //
    // Preferences
    //
    getAllPreferences(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const { data } = yield this.knock.get(`/v1/users/${userId}/preferences`);
            return data;
        });
    }
    /**
     * @deprecated Use `users.getPreferences` instead
     */
    getPrefences(userId, options = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.getPreferences(userId, options);
        });
    }
    getPreferences(userId, options = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            const preferenceSetId = options.preferenceSet || helpers_1.DEFAULT_PREFERENCE_SET_ID;
            const { data } = yield this.knock.get(`/v1/users/${userId}/preferences/${preferenceSetId}`);
            return data;
        });
    }
    setPreferences(userId, preferenceSet, options = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            const preferenceSetId = options.preferenceSet || helpers_1.DEFAULT_PREFERENCE_SET_ID;
            const { data } = yield this.knock.put(`/v1/users/${userId}/preferences/${preferenceSetId}`, preferenceSet);
            return data;
        });
    }
    bulkSetPreferences(userIds, preferenceSet, options = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            const preferenceSetId = options.preferenceSet || helpers_1.DEFAULT_PREFERENCE_SET_ID;
            const attrs = {
                user_ids: userIds,
                preferences: Object.assign(Object.assign({}, preferenceSet), { id: preferenceSetId }),
            };
            const { data } = yield this.knock.post(`/v1/users/bulk/preferences`, attrs);
            return data;
        });
    }
    setChannelTypesPreferences(userId, channelTypePreferences, options = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            const preferenceSetId = options.preferenceSet || helpers_1.DEFAULT_PREFERENCE_SET_ID;
            const { data } = yield this.knock.put(`/v1/users/${userId}/preferences/${preferenceSetId}/channel_types`, channelTypePreferences);
            return data;
        });
    }
    setChannelTypePreferences(userId, channelType, setting, options = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            const preferenceSetId = options.preferenceSet || helpers_1.DEFAULT_PREFERENCE_SET_ID;
            const { data, } = yield this.knock.put(`/v1/users/${userId}/preferences/${preferenceSetId}/channel_types/${channelType}`, { subscribed: setting });
            return data;
        });
    }
    setWorkflowsPreferences(userId, workflowPreferences, options = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            const preferenceSetId = options.preferenceSet || helpers_1.DEFAULT_PREFERENCE_SET_ID;
            const { data } = yield this.knock.put(`/v1/users/${userId}/preferences/${preferenceSetId}/workflows`, workflowPreferences);
            return data;
        });
    }
    setWorkflowPreferences(userId, workflowKey, setting, options = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            const preferenceSetId = options.preferenceSet || helpers_1.DEFAULT_PREFERENCE_SET_ID;
            const { data } = yield this.knock.put(`/v1/users/${userId}/preferences/${preferenceSetId}/workflows/${workflowKey}`, helpers_1.buildUpdateParam(setting));
            return data;
        });
    }
    setCategoriesPreferences(userId, categoryPreferences, options = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            const preferenceSetId = options.preferenceSet || helpers_1.DEFAULT_PREFERENCE_SET_ID;
            const { data } = yield this.knock.put(`/v1/users/${userId}/preferences/${preferenceSetId}/categories`, categoryPreferences);
            return data;
        });
    }
    setCategoryPreferences(userId, categoryKey, setting, options = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            const preferenceSetId = options.preferenceSet || helpers_1.DEFAULT_PREFERENCE_SET_ID;
            const { data } = yield this.knock.put(`/v1/users/${userId}/preferences/${preferenceSetId}/categories/${categoryKey}`, helpers_1.buildUpdateParam(setting));
            return data;
        });
    }
    //
    // Channel data
    //
    getChannelData(userId, channelId) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!userId || !channelId) {
                throw new Error(`Incomplete arguments. You must provide a 'userId' and a 'channelId'`);
            }
            const { data } = yield this.knock.get(`/v1/users/${userId}/channel_data/${channelId}`);
            return data;
        });
    }
    setChannelData(userId, channelId, channelData) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!userId || !channelId) {
                throw new Error(`Incomplete arguments. You must provide a 'userId' and a 'channelId'`);
            }
            const args = { data: channelData };
            const { data } = yield this.knock.put(`/v1/users/${userId}/channel_data/${channelId}`, args);
            return data;
        });
    }
    unsetChannelData(userId, channelId) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!userId || !channelId) {
                throw new Error(`Incomplete arguments. You must provide a 'userId' and a 'channelId'`);
            }
            const { data } = yield this.knock.delete(`/v1/users/${userId}/channel_data/${channelId}`);
            return data;
        });
    }
    //
    // Messages
    //
    getMessages(userId, filteringOptions = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!userId) {
                throw new Error(`Incomplete arguments. You must provide a 'userId'`);
            }
            const { data } = yield this.knock.get(`/v1/users/${userId}/messages`, filteringOptions);
            return data;
        });
    }
    //
    // Schedules
    //
    getSchedules(userId, filteringOptions = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!userId) {
                throw new Error(`Incomplete arguments. You must provide a 'userId'`);
            }
            const { data } = yield this.knock.get(`/v1/users/${userId}/schedules`, filteringOptions);
            return data;
        });
    }
}
exports.Users = Users;
