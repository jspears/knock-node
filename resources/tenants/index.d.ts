import { CommonMetadata, PaginatedEntriesResponse } from "../../common/interfaces";
import { Knock } from "../../knock";
import { Tenant, SetTenant, ListTenantsOptions } from "./interfaces";
export declare class Tenants {
    readonly knock: Knock;
    constructor(knock: Knock);
    list(filteringOptions?: ListTenantsOptions): Promise<PaginatedEntriesResponse<Tenant>>;
    get<T = CommonMetadata>(id: string): Promise<Tenant<T>>;
    set<T = CommonMetadata>(id: string, tenantData: SetTenant): Promise<Tenant<T>>;
    delete(id: string): Promise<null>;
}
