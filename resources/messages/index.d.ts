import { PaginatedItemsResponse, PaginationOptions } from "../../common/interfaces";
import { Message, MessageContent, MessageEvent, ListMessageActivitiesOptions, ListMessagesOptions, MessageEngagementStatus } from "./interfaces";
import { Activity } from "../activities/interfaces";
import { Knock } from "../../knock";
export declare class Messages {
    readonly knock: Knock;
    constructor(knock: Knock);
    list(filteringOptions?: ListMessagesOptions): Promise<PaginatedItemsResponse<Message>>;
    get(messageId: string): Promise<Message>;
    getContent(messageId: string): Promise<MessageContent>;
    getEvents(messageId: string, paginationOptions?: PaginationOptions): Promise<PaginatedItemsResponse<MessageEvent>>;
    getActivities(messageId: string, filteringOptions?: ListMessageActivitiesOptions): Promise<PaginatedItemsResponse<Activity>>;
    setStatus(messageId: string, status: MessageEngagementStatus): Promise<Message>;
    deleteStatus(messageId: string, status: MessageEngagementStatus): Promise<Message>;
    batchSetStatus(messageIds: string[], status: MessageEngagementStatus | "unseen" | "unread" | "unarchived"): Promise<Message[]>;
}
