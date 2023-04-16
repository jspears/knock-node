import { ChannelData, CommonMetadata, SetChannelDataProperties, PaginatedEntriesResponse, ChannelType, PaginatedItemsResponse } from "../../common/interfaces";
import { Knock } from "../../knock";
import { AddObjectSubscriptionProperties, BulkSetObjectOption, DeleteObjectSubscriptionProperties, ListObjectOptions, ListObjectSubscriptionsOptions, Object, ObjectSubscription, SetObjectProperties } from "./interfaces";
import { BulkOperation } from "../bulk_operations/interfaces";
import { ListMessagesOptions, Message } from "../messages/interfaces";
import { ListSchedulesProps, Schedule } from "../workflows/interfaces";
import { ChannelTypePreferences, PreferenceOptions, PreferenceSet, SetPreferencesProperties, WorkflowPreferences, WorkflowPreferenceSetting } from "../preferences/interfaces";
export declare class Objects {
    readonly knock: Knock;
    constructor(knock: Knock);
    get<T = CommonMetadata>(collection: string, id: string): Promise<Object<T>>;
    set<T = CommonMetadata>(collection: string, id: string, properties: SetObjectProperties): Promise<Object<T>>;
    list<T = CommonMetadata>(collection: string, filteringOptions?: ListObjectOptions): Promise<PaginatedEntriesResponse<Object<T>>>;
    bulkSet(collection: string, objects: BulkSetObjectOption[]): Promise<BulkOperation>;
    delete(collection: string, id: string): Promise<null>;
    bulkDelete(collection: string, objectIds: string[]): Promise<BulkOperation>;
    getChannelData<T = CommonMetadata>(collection: string, id: string, channelId: string): Promise<ChannelData<T>>;
    setChannelData<T = CommonMetadata>(collection: string, id: string, channelId: string, channelData: SetChannelDataProperties): Promise<ChannelData<T>>;
    unsetChannelData(collection: string, id: string, channelId: string): Promise<any>;
    getMessages(collection: string, objectId: string, filteringOptions?: ListMessagesOptions): Promise<PaginatedItemsResponse<Message>>;
    getAllPreferences(collection: string, objectId: string): Promise<PreferenceSet[]>;
    /**
     * @deprecated Use `objects.getPreferences` instead
     */
    getPrefences(collection: string, objectId: string, options?: PreferenceOptions): Promise<PreferenceSet>;
    getPreferences(collection: string, objectId: string, options?: PreferenceOptions): Promise<PreferenceSet>;
    setPreferences(collection: string, objectId: string, preferenceSet: SetPreferencesProperties, options?: PreferenceOptions): Promise<PreferenceSet>;
    setChannelTypesPreferences(collection: string, objectId: string, channelTypePreferences: ChannelTypePreferences, options?: PreferenceOptions): Promise<PreferenceSet>;
    setChannelTypePreferences(collection: string, objectId: string, channelType: ChannelType, setting: boolean, options?: PreferenceOptions): Promise<PreferenceSet>;
    setWorkflowsPreferences(collection: string, objectId: string, workflowPreferences: WorkflowPreferences, options?: PreferenceOptions): Promise<PreferenceSet>;
    setWorkflowPreferences(collection: string, objectId: string, workflowKey: string, setting: WorkflowPreferenceSetting, options?: PreferenceOptions): Promise<PreferenceSet>;
    setCategoriesPreferences(collection: string, objectId: string, categoryPreferences: WorkflowPreferences, options?: PreferenceOptions): Promise<PreferenceSet>;
    setCategoryPreferences(collection: string, objectId: string, categoryKey: string, setting: WorkflowPreferenceSetting, options?: PreferenceOptions): Promise<PreferenceSet>;
    listSubscriptions(collection: string, objectId: string, options?: ListObjectSubscriptionsOptions): Promise<PaginatedEntriesResponse<ObjectSubscription>>;
    addSubscriptions(collection: string, objectId: string, properties?: AddObjectSubscriptionProperties): Promise<ObjectSubscription[]>;
    deleteSubscriptions(collection: string, objectId: string, properties?: DeleteObjectSubscriptionProperties): Promise<ObjectSubscription[]>;
    getSchedules(collection: string, objectId: string, filteringOptions?: ListSchedulesProps): Promise<PaginatedEntriesResponse<Schedule>>;
}
