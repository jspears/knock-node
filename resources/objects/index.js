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
exports.Objects = void 0;
const helpers_1 = require("../preferences/helpers");
class Objects {
    constructor(knock) {
        this.knock = knock;
    }
    get(collection, id) {
        return __awaiter(this, void 0, void 0, function* () {
            const { data } = yield this.knock.get(`/v1/objects/${collection}/${id}`);
            return data;
        });
    }
    set(collection, id, properties) {
        return __awaiter(this, void 0, void 0, function* () {
            const { data } = yield this.knock.put(`/v1/objects/${collection}/${id}`, properties);
            return data;
        });
    }
    list(collection, filteringOptions = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            const { data } = yield this.knock.get(`/v1/objects/${collection}`, filteringOptions);
            return data;
        });
    }
    bulkSet(collection, objects) {
        return __awaiter(this, void 0, void 0, function* () {
            const attrs = { objects };
            const { data } = yield this.knock.post(`/v1/objects/${collection}/bulk/set`, attrs);
            return data;
        });
    }
    delete(collection, id) {
        return __awaiter(this, void 0, void 0, function* () {
            const { data } = yield this.knock.delete(`/v1/objects/${collection}/${id}`);
            return data;
        });
    }
    bulkDelete(collection, objectIds) {
        return __awaiter(this, void 0, void 0, function* () {
            const attrs = {
                object_ids: objectIds,
            };
            const { data } = yield this.knock.post(`/v1/objects/${collection}/bulk/delete`, attrs);
            return data;
        });
    }
    // Channel data
    getChannelData(collection, id, channelId) {
        return __awaiter(this, void 0, void 0, function* () {
            const { data } = yield this.knock.get(`/v1/objects/${collection}/${id}/channel_data/${channelId}`);
            return data;
        });
    }
    setChannelData(collection, id, channelId, channelData) {
        return __awaiter(this, void 0, void 0, function* () {
            const attrs = { data: channelData };
            const { data } = yield this.knock.put(`/v1/objects/${collection}/${id}/channel_data/${channelId}`, attrs);
            return data;
        });
    }
    unsetChannelData(collection, id, channelId) {
        return __awaiter(this, void 0, void 0, function* () {
            const { data } = yield this.knock.delete(`/v1/objects/${collection}/${id}/channel_data/${channelId}`);
            return data;
        });
    }
    //
    // Messages
    //
    getMessages(collection, objectId, filteringOptions = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!collection || !objectId) {
                throw new Error(`Incomplete arguments. You must provide a 'collection' and 'objectId'`);
            }
            const { data } = yield this.knock.get(`/v1/objects/${collection}/${objectId}/messages`, filteringOptions);
            return data;
        });
    }
    //
    // Preferences
    //
    getAllPreferences(collection, objectId) {
        return __awaiter(this, void 0, void 0, function* () {
            const { data } = yield this.knock.get(`/v1/objects/${collection}/${objectId}/preferences`);
            return data;
        });
    }
    /**
     * @deprecated Use `objects.getPreferences` instead
     */
    getPrefences(collection, objectId, options = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.getPreferences(collection, objectId, options);
        });
    }
    getPreferences(collection, objectId, options = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            const preferenceSetId = options.preferenceSet || helpers_1.DEFAULT_PREFERENCE_SET_ID;
            const { data } = yield this.knock.get(`/v1/objects/${collection}/${objectId}/preferences/${preferenceSetId}`);
            return data;
        });
    }
    setPreferences(collection, objectId, preferenceSet, options = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            const preferenceSetId = options.preferenceSet || helpers_1.DEFAULT_PREFERENCE_SET_ID;
            const { data } = yield this.knock.put(`/v1/objects/${collection}/${objectId}/preferences/${preferenceSetId}`, preferenceSet);
            return data;
        });
    }
    setChannelTypesPreferences(collection, objectId, channelTypePreferences, options = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            const preferenceSetId = options.preferenceSet || helpers_1.DEFAULT_PREFERENCE_SET_ID;
            const { data } = yield this.knock.put(`/v1/objects/${collection}/${objectId}/preferences/${preferenceSetId}/channel_types`, channelTypePreferences);
            return data;
        });
    }
    setChannelTypePreferences(collection, objectId, channelType, setting, options = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            const preferenceSetId = options.preferenceSet || helpers_1.DEFAULT_PREFERENCE_SET_ID;
            const { data, } = yield this.knock.put(`/v1/objects/${collection}/${objectId}/preferences/${preferenceSetId}/channel_types/${channelType}`, { subscribed: setting });
            return data;
        });
    }
    setWorkflowsPreferences(collection, objectId, workflowPreferences, options = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            const preferenceSetId = options.preferenceSet || helpers_1.DEFAULT_PREFERENCE_SET_ID;
            const { data } = yield this.knock.put(`/v1/objects/${collection}/${objectId}/preferences/${preferenceSetId}/workflows`, workflowPreferences);
            return data;
        });
    }
    setWorkflowPreferences(collection, objectId, workflowKey, setting, options = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            const preferenceSetId = options.preferenceSet || helpers_1.DEFAULT_PREFERENCE_SET_ID;
            const { data } = yield this.knock.put(`/v1/objects/${collection}/${objectId}/preferences/${preferenceSetId}/workflows/${workflowKey}`, helpers_1.buildUpdateParam(setting));
            return data;
        });
    }
    setCategoriesPreferences(collection, objectId, categoryPreferences, options = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            const preferenceSetId = options.preferenceSet || helpers_1.DEFAULT_PREFERENCE_SET_ID;
            const { data } = yield this.knock.put(`/v1/objects/${collection}/${objectId}/preferences/${preferenceSetId}/categories`, categoryPreferences);
            return data;
        });
    }
    setCategoryPreferences(collection, objectId, categoryKey, setting, options = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            const preferenceSetId = options.preferenceSet || helpers_1.DEFAULT_PREFERENCE_SET_ID;
            const { data } = yield this.knock.put(`/v1/objects/${collection}/${objectId}/preferences/${preferenceSetId}/categories/${categoryKey}`, helpers_1.buildUpdateParam(setting));
            return data;
        });
    }
    //
    // Subscriptions
    //
    listSubscriptions(collection, objectId, options = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            const { data } = yield this.knock.get(`/v1/objects/${collection}/${objectId}/subscriptions`, options);
            return data;
        });
    }
    addSubscriptions(collection, objectId, properties = { recipients: [] }) {
        return __awaiter(this, void 0, void 0, function* () {
            const { data } = yield this.knock.post(`/v1/objects/${collection}/${objectId}/subscriptions`, properties);
            return data;
        });
    }
    deleteSubscriptions(collection, objectId, properties = { recipients: [] }) {
        return __awaiter(this, void 0, void 0, function* () {
            const { data } = yield this.knock.delete(`/v1/objects/${collection}/${objectId}/subscriptions`, properties);
            return data;
        });
    }
    //
    // Schedules
    //
    getSchedules(collection, objectId, filteringOptions = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!collection || !objectId) {
                throw new Error(`Incomplete arguments. You must provide a 'collection' and 'objectId'`);
            }
            const { data } = yield this.knock.get(`/v1/objects/${collection}/${objectId}/schedules`, filteringOptions);
            return data;
        });
    }
}
exports.Objects = Objects;
