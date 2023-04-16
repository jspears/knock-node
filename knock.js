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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Knock = void 0;
const axios_1 = __importDefault(require("axios"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const package_1 = require("./package");
const exceptions_1 = require("./common/exceptions");
const users_1 = require("./resources/users");
const preferences_1 = require("./resources/preferences");
const workflows_1 = require("./resources/workflows");
const bulk_operations_1 = require("./resources/bulk_operations");
const objects_1 = require("./resources/objects");
const messages_1 = require("./resources/messages");
const tenants_1 = require("./resources/tenants");
const DEFAULT_HOSTNAME = "https://api.knock.app";
const version = package_1.getPackage().version;
class Knock {
    constructor(key, options = {}) {
        this.key = key;
        this.options = options;
        // Service accessors
        this.users = new users_1.Users(this);
        this.preferences = new preferences_1.Preferences(this);
        this.workflows = new workflows_1.Workflows(this);
        this.bulkOperations = new bulk_operations_1.BulkOperations(this);
        this.objects = new objects_1.Objects(this);
        this.messages = new messages_1.Messages(this);
        this.tenants = new tenants_1.Tenants(this);
        if (!key) {
            this.key = process.env.KNOCK_API_KEY;
            if (!this.key) {
                throw new exceptions_1.NoApiKeyProvidedException();
            }
        }
        this.host = options.host || DEFAULT_HOSTNAME;
        this.client = axios_1.default.create({
            baseURL: this.host,
            headers: {
                Authorization: `Bearer ${this.key}`,
                "User-Agent": `knocklabs/node@${version}`,
            },
        });
    }
    // Delegate the notify function to the workflows trigger
    notify(workflowKey, properties, options) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.workflows.trigger(workflowKey, properties, options);
        });
    }
    /**
     * Generate JWT for authenticating client-side requests (e.g. in-app feeds)
     * For more information, visit https://docs.knock.app/in-app-ui/security-and-authentication#authentication-with-enhanced-security-enabled
     *
     * @param userId {string} The ID of the user that needs a token, e.g. the user viewing an in-app feed.
     * @param options Optionally specify the signing key to use (in PEM or base-64 encoded format), and how long the token should be valid for in seconds
     * @returns {string} A JWT token that can be used to authenticate requests to the Knock API (e.g. by passing into the <KnockFeedProvider /> component)
     */
    static signUserToken(userId, options) {
        var _a;
        const signingKey = prepareSigningKey(options.signingKey);
        // JWT NumericDates specified in seconds:
        const currentTime = Math.floor(Date.now() / 1000);
        // Default to 1 hour from now
        const expireInSeconds = (_a = options.expiresInSeconds) !== null && _a !== void 0 ? _a : 60 * 60;
        return jsonwebtoken_1.default.sign({
            sub: userId,
            iat: currentTime,
            exp: currentTime + expireInSeconds,
        }, signingKey, {
            algorithm: "RS256",
        });
    }
    post(path, entity, options = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.client.post(path, entity, {
                    params: options.query,
                    headers: options.headers,
                });
            }
            catch (error) {
                this.handleErrorResponse(path, error);
                throw error;
            }
        });
    }
    put(path, entity, options = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.client.put(path, entity, {
                    params: options.query,
                });
            }
            catch (error) {
                this.handleErrorResponse(path, error);
                throw error;
            }
        });
    }
    delete(path, entity = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.client.delete(path, {
                    params: entity,
                });
            }
            catch (error) {
                this.handleErrorResponse(path, error);
                throw error;
            }
        });
    }
    get(path, query) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.client.get(path, {
                    params: query,
                });
            }
            catch (error) {
                this.handleErrorResponse(path, error);
                throw error;
            }
        });
    }
    handleErrorResponse(path, error) {
        if (axios_1.default.isAxiosError(error) && error.response) {
            const { status, data, headers } = error.response;
            const requestID = headers["X-Request-ID"];
            switch (status) {
                case 401: {
                    const { message, code } = data;
                    throw new exceptions_1.UnauthorizedException(code, message, requestID);
                }
                case 400: {
                    const { message, code } = data;
                    throw new exceptions_1.BadRequestException(code, message, requestID);
                }
                case 422: {
                    const { errors } = data;
                    throw new exceptions_1.UnprocessableEntityException(errors, requestID);
                }
                case 404: {
                    throw new exceptions_1.NotFoundException(path, requestID);
                }
                default: {
                    throw new exceptions_1.GenericServerException(status, data.message, requestID);
                }
            }
        }
    }
    emitWarning(warning) {
        if (typeof process.emitWarning !== "function") {
            //  tslint:disable:no-console
            return console.warn(`Knock: ${warning}`);
        }
        return process.emitWarning(warning, "Knock");
    }
}
exports.Knock = Knock;
function prepareSigningKey(key) {
    const maybeSigningKey = key !== null && key !== void 0 ? key : process.env.KNOCK_SIGNING_KEY;
    if (!maybeSigningKey)
        throw new exceptions_1.NoSigningKeyProvidedException();
    if (maybeSigningKey.startsWith("-----BEGIN"))
        return maybeSigningKey;
    // LS0tLS1CRUdJTi is the base64 encoded version of "-----BEGIN"
    if (maybeSigningKey.startsWith("LS0tLS1CRUdJTi"))
        return Buffer.from(maybeSigningKey, "base64").toString("utf-8");
    throw new exceptions_1.NoSigningKeyProvidedException();
}
