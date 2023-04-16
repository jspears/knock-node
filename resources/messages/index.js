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
exports.Messages = void 0;
class Messages {
    constructor(knock) {
        this.knock = knock;
    }
    list(filteringOptions = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            const { data } = yield this.knock.get("/v1/messages", filteringOptions);
            return data;
        });
    }
    get(messageId) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!messageId) {
                throw new Error(`Incomplete arguments. You must provide a 'messageId'`);
            }
            const { data } = yield this.knock.get(`/v1/messages/${messageId}`);
            return data;
        });
    }
    getContent(messageId) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!messageId) {
                throw new Error(`Incomplete arguments. You must provide a 'messageId'`);
            }
            const { data } = yield this.knock.get(`/v1/messages/${messageId}/content`);
            return data;
        });
    }
    getEvents(messageId, paginationOptions = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!messageId) {
                throw new Error(`Incomplete arguments. You must provide a 'messageId'`);
            }
            const { data } = yield this.knock.get(`/v1/messages/${messageId}/events`, paginationOptions);
            return data;
        });
    }
    getActivities(messageId, filteringOptions = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!messageId) {
                throw new Error(`Incomplete arguments. You must provide a 'messageId'`);
            }
            const { data } = yield this.knock.get(`/v1/messages/${messageId}/activities`, filteringOptions);
            return data;
        });
    }
    setStatus(messageId, status) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!messageId) {
                throw new Error(`Incomplete arguments. You must provide a 'messageId'`);
            }
            const { data } = yield this.knock.put(`/v1/messages/${messageId}/${status}`, {});
            return data;
        });
    }
    deleteStatus(messageId, status) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!messageId) {
                throw new Error(`Incomplete arguments. You must provide a 'messageId'`);
            }
            const { data } = yield this.knock.delete(`/v1/messages/${messageId}/${status}`);
            return data;
        });
    }
    batchSetStatus(messageIds, status) {
        return __awaiter(this, void 0, void 0, function* () {
            const { data } = yield this.knock.post(`/v1/messages/batch/${status}`, {
                message_ids: messageIds,
            });
            return data;
        });
    }
}
exports.Messages = Messages;
