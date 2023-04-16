import { AxiosResponse } from "axios";
import { KnockOptions, PostAndPutOptions, SignUserTokenOptions, MethodOptions } from "./common/interfaces";
import { Users } from "./resources/users";
import { Preferences } from "./resources/preferences";
import { Workflows } from "./resources/workflows";
import { TriggerWorkflowProperties } from "./resources/workflows/interfaces";
import { BulkOperations } from "./resources/bulk_operations";
import { Objects } from "./resources/objects";
import { Messages } from "./resources/messages";
import { Tenants } from "./resources/tenants";
declare class Knock {
    readonly key?: string | undefined;
    readonly options: KnockOptions;
    readonly host: string;
    private readonly client;
    readonly users: Users;
    readonly preferences: Preferences;
    readonly workflows: Workflows;
    readonly bulkOperations: BulkOperations;
    readonly objects: Objects;
    readonly messages: Messages;
    readonly tenants: Tenants;
    constructor(key?: string | undefined, options?: KnockOptions);
    notify(workflowKey: string, properties: TriggerWorkflowProperties, options?: MethodOptions): Promise<import("./resources/workflows/interfaces").WorkflowRun>;
    /**
     * Generate JWT for authenticating client-side requests (e.g. in-app feeds)
     * For more information, visit https://docs.knock.app/in-app-ui/security-and-authentication#authentication-with-enhanced-security-enabled
     *
     * @param userId {string} The ID of the user that needs a token, e.g. the user viewing an in-app feed.
     * @param options Optionally specify the signing key to use (in PEM or base-64 encoded format), and how long the token should be valid for in seconds
     * @returns {string} A JWT token that can be used to authenticate requests to the Knock API (e.g. by passing into the <KnockFeedProvider /> component)
     */
    static signUserToken(userId: string, options: SignUserTokenOptions): string;
    post(path: string, entity: any, options?: PostAndPutOptions): Promise<AxiosResponse>;
    put(path: string, entity: any, options?: PostAndPutOptions): Promise<AxiosResponse>;
    delete(path: string, entity?: any): Promise<AxiosResponse>;
    get(path: string, query?: any): Promise<AxiosResponse>;
    handleErrorResponse(path: string, error: any): void;
    emitWarning(warning: string): void;
}
export { Knock };
