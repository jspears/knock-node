import { ChannelData, ChannelType, CommonMetadata, PaginatedItemsResponse, PaginatedEntriesResponse } from "../../common/interfaces";
import { BulkOperation } from "../bulk_operations/interfaces";
import { ChannelTypePreferences, PreferenceOptions, PreferenceSet, SetPreferencesProperties, WorkflowPreferences, WorkflowPreferenceSetting } from "../preferences/interfaces";
import { ListMessagesOptions, Message } from "../messages/interfaces";
import { ListSchedulesProps, Schedule } from "../workflows/interfaces";
import { Knock } from "../../knock";
import { BulkIdentifyUser, IdentifyProperties, ListUserOptions, User, UserFeedOptions } from "./interfaces";
export declare class Users {
    readonly knock: Knock;
    constructor(knock: Knock);
    identify(userId: string, properties?: IdentifyProperties): Promise<User>;
    bulkIdentify(users: BulkIdentifyUser[]): Promise<BulkOperation>;
    get(userId: string): Promise<User>;
    list(filteringOptions?: ListUserOptions): Promise<PaginatedEntriesResponse<User>>;
    delete(userId: string): Promise<null>;
    bulkDelete(userIds: string[]): Promise<BulkOperation>;
    merge(toUserId: string, fromUserId: string): Promise<User>;
    getFeed(userId: string, channelId: string, feedOptions?: UserFeedOptions): Promise<PaginatedEntriesResponse<any>>;
    getAllPreferences(userId: string): Promise<any>;
    /**
     * @deprecated Use `users.getPreferences` instead
     */
    getPrefences(userId: string, options?: PreferenceOptions): Promise<PreferenceSet>;
    getPreferences(userId: string, options?: PreferenceOptions): Promise<PreferenceSet>;
    setPreferences(userId: string, preferenceSet: SetPreferencesProperties, options?: PreferenceOptions): Promise<PreferenceSet>;
    bulkSetPreferences(userIds: string[], preferenceSet: SetPreferencesProperties, options?: PreferenceOptions): Promise<BulkOperation>;
    setChannelTypesPreferences(userId: string, channelTypePreferences: ChannelTypePreferences, options?: PreferenceOptions): Promise<PreferenceSet>;
    setChannelTypePreferences(userId: string, channelType: ChannelType, setting: boolean, options?: PreferenceOptions): Promise<PreferenceSet>;
    setWorkflowsPreferences(userId: string, workflowPreferences: WorkflowPreferences, options?: PreferenceOptions): Promise<PreferenceSet>;
    setWorkflowPreferences(userId: string, workflowKey: string, setting: WorkflowPreferenceSetting, options?: PreferenceOptions): Promise<PreferenceSet>;
    setCategoriesPreferences(userId: string, categoryPreferences: WorkflowPreferences, options?: PreferenceOptions): Promise<PreferenceSet>;
    setCategoryPreferences(userId: string, categoryKey: string, setting: WorkflowPreferenceSetting, options?: PreferenceOptions): Promise<PreferenceSet>;
    getChannelData<T = CommonMetadata>(userId: string, channelId: string): Promise<ChannelData<T>>;
    setChannelData<T = CommonMetadata>(userId: string, channelId: string, channelData: Record<string, any>): Promise<ChannelData<T>>;
    unsetChannelData(userId: string, channelId: string): Promise<any>;
    getMessages(userId: string, filteringOptions?: ListMessagesOptions): Promise<PaginatedItemsResponse<Message>>;
    getSchedules(userId: string, filteringOptions?: ListSchedulesProps): Promise<PaginatedEntriesResponse<Schedule>>;
}
