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
exports.Workflows = void 0;
class Workflows {
    constructor(knock) {
        this.knock = knock;
    }
    trigger(workflowKey, { actor, recipients, cancellationKey, tenant, data: notifyData, }, { idempotencyKey } = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!workflowKey && !recipients) {
                throw new Error(`Incomplete arguments. At a minimum you need to specify 'workflowKey' and 'recipients'.`);
            }
            const options = idempotencyKey ? { headers: { 'Idempotency-Key': idempotencyKey } } : {};
            const { data } = yield this.knock.post(`/v1/workflows/${workflowKey}/trigger`, {
                actor,
                recipients,
                cancellation_key: cancellationKey,
                tenant,
                data: notifyData,
            }, options);
            return data;
        });
    }
    cancel(workflowKey, cancellationKey, { recipients } = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!workflowKey && !cancellationKey) {
                throw new Error(`Incomplete arguments. At a minimum you need to specify 'workflowKey' and 'cancellationKey'.`);
            }
            const { data } = yield this.knock.post(`/v1/workflows/${workflowKey}/cancel`, {
                cancellation_key: cancellationKey,
                recipients,
            });
            return data;
        });
    }
    createSchedules(workflowKey, params) {
        return __awaiter(this, void 0, void 0, function* () {
            const { data } = yield this.knock.post("/v1/schedules", Object.assign(Object.assign({}, params), { workflow: workflowKey }));
            return data;
        });
    }
    updateSchedules(params) {
        return __awaiter(this, void 0, void 0, function* () {
            const { data } = yield this.knock.put("/v1/schedules", params);
            return data;
        });
    }
    listSchedules(workflowKey, params = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            const { data } = yield this.knock.get("/v1/schedules", Object.assign(Object.assign({}, params), { workflow: workflowKey }));
            return data;
        });
    }
    deleteSchedules(params) {
        return __awaiter(this, void 0, void 0, function* () {
            const { data } = yield this.knock.delete("/v1/schedules", params);
            return data;
        });
    }
}
exports.Workflows = Workflows;
