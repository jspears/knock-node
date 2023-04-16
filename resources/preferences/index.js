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
exports.Preferences = void 0;
// Deprecated all of the methods in this to be removed in `0.5.0`
class Preferences {
    constructor(knock) {
        this.knock = knock;
    }
    /**
     * @deprecated Use `users.getAllPreferences` instead
     */
    getAll(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.knock.users.getAllPreferences(userId);
        });
    }
    /**
     * @deprecated Use `users.getPreferences` instead
     */
    get(userId, options = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.knock.users.getPrefences(userId, options);
        });
    }
    /**
     * @deprecated Use `users.setPreferences` instead
     */
    set(userId, preferenceSet, options = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.knock.users.setPreferences(userId, preferenceSet, options);
        });
    }
    /**
     * @deprecated Use `users.setChannelTypesPreferences` instead
     */
    setChannelTypes(userId, channelTypePreferences, options = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.knock.users.setChannelTypesPreferences(userId, channelTypePreferences, options);
        });
    }
    /**
     * @deprecated Use `users.setChannelTypePreferences` instead
     */
    setChannelType(userId, channelType, setting, options = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.knock.users.setChannelTypePreferences(userId, channelType, setting, options);
        });
    }
    /**
     * @deprecated Use `users.setWorkflowsPreferences` instead
     */
    setWorkflows(userId, workflowPreferences, options = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.knock.users.setWorkflowsPreferences(userId, workflowPreferences, options);
        });
    }
    /**
     * @deprecated Use `users.setWorkflowPreferences` instead
     */
    setWorkflow(userId, workflowKey, setting, options = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.knock.users.setWorkflowPreferences(userId, workflowKey, setting, options);
        });
    }
    /**
     * @deprecated Use `users.setCategoriesPreferences` instead
     */
    setCategories(userId, categoryPreferences, options = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.knock.users.setCategoriesPreferences(userId, categoryPreferences, options);
        });
    }
    /**
     * @deprecated Use `users.setCategoryPreferences` instead
     */
    setCategory(userId, categoryKey, setting, options = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.knock.users.setCategoryPreferences(userId, categoryKey, setting, options);
        });
    }
}
exports.Preferences = Preferences;
