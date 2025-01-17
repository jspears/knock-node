import {
  ChannelData,
  ChannelType,
  CommonMetadata,
  PaginatedItemsResponse,
  PaginatedEntriesResponse,
} from "../../common/interfaces.ts";
import { BulkOperation } from "../bulk_operations/interfaces.ts";
import {
  ChannelTypePreferences,
  PreferenceOptions,
  PreferenceSet,
  SetPreferencesProperties,
  WorkflowPreferences,
  WorkflowPreferenceSetting,
} from "../preferences/interfaces.ts";
import { ListMessagesOptions, Message } from "../messages/interfaces.ts";
import { ListSchedulesProps, Schedule } from "../workflows/interfaces.ts";
import {
  DEFAULT_PREFERENCE_SET_ID,
  buildUpdateParam,
} from "../preferences/helpers.ts";
import { Knock } from "../../knock.ts";
import {
  BulkIdentifyUser,
  IdentifyProperties,
  ListUserOptions,
  User,
  UserFeedOptions,
} from "./interfaces.ts";

export class Users {
  constructor(readonly knock: Knock) {}

  //
  // User management
  //

  async identify(
    userId: string,
    properties: IdentifyProperties = {},
  ): Promise<User> {
    if (!userId) {
      throw new Error(
        `Incomplete arguments. At a minimum you need to specify 'userId'.`,
      );
    }

    const { data } = await this.knock.put(`/v1/users/${userId}`, properties);
    return data;
  }

  async bulkIdentify(users: BulkIdentifyUser[]): Promise<BulkOperation> {
    const attrs = { users };
    const { data } = await this.knock.post(`/v1/users/bulk/identify`, attrs);
    return data;
  }

  async get(userId: string): Promise<User> {
    if (!userId) {
      throw new Error(`Incomplete arguments. You must provide a 'userId'`);
    }

    const { data } = await this.knock.get(`/v1/users/${userId}`);
    return data;
  }

  async list(
    filteringOptions: ListUserOptions = {},
  ): Promise<PaginatedEntriesResponse<User>> {
    const { data } = await this.knock.get(`/v1/users`, filteringOptions);
    return data;
  }

  async delete(userId: string): Promise<null> {
    if (!userId) {
      throw new Error(`Incomplete arguments. You must provide a 'userId'`);
    }

    const { data } = await this.knock.delete(`/v1/users/${userId}`);
    return data;
  }

  async bulkDelete(userIds: string[]): Promise<BulkOperation> {
    const attrs = { user_ids: userIds };
    const { data } = await this.knock.post(`/v1/users/bulk/delete`, attrs);
    return data;
  }

  async merge(toUserId: string, fromUserId: string): Promise<User> {
    if (!toUserId || !fromUserId) {
      throw new Error(
        `Incomplete arguments. You must provide both a 'toUserId' and a 'fromUserId'.`,
      );
    }
    const { data } = await this.knock.post(`/v1/users/${toUserId}/merge`, {
      from_user_id: fromUserId,
    });

    return data;
  }

  //
  // Feeds
  //

  async getFeed(
    userId: string,
    channelId: string,
    feedOptions: UserFeedOptions = {},
  ): Promise<PaginatedEntriesResponse<any>> {
    const { data } = await this.knock.get(
      `/v1/users/${userId}/feeds/${channelId}`,
      feedOptions,
    );

    return data;
  }

  //
  // Preferences
  //

  async getAllPreferences(userId: string) {
    const { data } = await this.knock.get(`/v1/users/${userId}/preferences`);
    return data;
  }

  /**
   * @deprecated Use `users.getPreferences` instead
   */
  async getPrefences(
    userId: string,
    options: PreferenceOptions = {},
  ): Promise<PreferenceSet> {
    return this.getPreferences(userId, options);
  }

  async getPreferences(
    userId: string,
    options: PreferenceOptions = {},
  ): Promise<PreferenceSet> {
    const preferenceSetId = options.preferenceSet || DEFAULT_PREFERENCE_SET_ID;

    const { data } = await this.knock.get(
      `/v1/users/${userId}/preferences/${preferenceSetId}`,
    );

    return data;
  }

  async setPreferences(
    userId: string,
    preferenceSet: SetPreferencesProperties,
    options: PreferenceOptions = {},
  ): Promise<PreferenceSet> {
    const preferenceSetId = options.preferenceSet || DEFAULT_PREFERENCE_SET_ID;

    const { data } = await this.knock.put(
      `/v1/users/${userId}/preferences/${preferenceSetId}`,
      preferenceSet,
    );

    return data;
  }

  async bulkSetPreferences(
    userIds: string[],
    preferenceSet: SetPreferencesProperties,
    options: PreferenceOptions = {},
  ): Promise<BulkOperation> {
    const preferenceSetId = options.preferenceSet || DEFAULT_PREFERENCE_SET_ID;

    const attrs = {
      user_ids: userIds,
      preferences: { ...preferenceSet, id: preferenceSetId },
    };

    const { data } = await this.knock.post(`/v1/users/bulk/preferences`, attrs);

    return data;
  }

  async setChannelTypesPreferences(
    userId: string,
    channelTypePreferences: ChannelTypePreferences,
    options: PreferenceOptions = {},
  ): Promise<PreferenceSet> {
    const preferenceSetId = options.preferenceSet || DEFAULT_PREFERENCE_SET_ID;

    const { data } = await this.knock.put(
      `/v1/users/${userId}/preferences/${preferenceSetId}/channel_types`,
      channelTypePreferences,
    );

    return data;
  }

  async setChannelTypePreferences(
    userId: string,
    channelType: ChannelType,
    setting: boolean,
    options: PreferenceOptions = {},
  ): Promise<PreferenceSet> {
    const preferenceSetId = options.preferenceSet || DEFAULT_PREFERENCE_SET_ID;

    const {
      data,
    } = await this.knock.put(
      `/v1/users/${userId}/preferences/${preferenceSetId}/channel_types/${channelType}`,
      { subscribed: setting },
    );

    return data;
  }

  async setWorkflowsPreferences(
    userId: string,
    workflowPreferences: WorkflowPreferences,
    options: PreferenceOptions = {},
  ): Promise<PreferenceSet> {
    const preferenceSetId = options.preferenceSet || DEFAULT_PREFERENCE_SET_ID;

    const { data } = await this.knock.put(
      `/v1/users/${userId}/preferences/${preferenceSetId}/workflows`,
      workflowPreferences,
    );

    return data;
  }

  async setWorkflowPreferences(
    userId: string,
    workflowKey: string,
    setting: WorkflowPreferenceSetting,
    options: PreferenceOptions = {},
  ): Promise<PreferenceSet> {
    const preferenceSetId = options.preferenceSet || DEFAULT_PREFERENCE_SET_ID;

    const { data } = await this.knock.put(
      `/v1/users/${userId}/preferences/${preferenceSetId}/workflows/${workflowKey}`,
      buildUpdateParam(setting),
    );

    return data;
  }

  async setCategoriesPreferences(
    userId: string,
    categoryPreferences: WorkflowPreferences,
    options: PreferenceOptions = {},
  ): Promise<PreferenceSet> {
    const preferenceSetId = options.preferenceSet || DEFAULT_PREFERENCE_SET_ID;

    const { data } = await this.knock.put(
      `/v1/users/${userId}/preferences/${preferenceSetId}/categories`,
      categoryPreferences,
    );

    return data;
  }

  async setCategoryPreferences(
    userId: string,
    categoryKey: string,
    setting: WorkflowPreferenceSetting,
    options: PreferenceOptions = {},
  ): Promise<PreferenceSet> {
    const preferenceSetId = options.preferenceSet || DEFAULT_PREFERENCE_SET_ID;

    const { data } = await this.knock.put(
      `/v1/users/${userId}/preferences/${preferenceSetId}/categories/${categoryKey}`,
      buildUpdateParam(setting),
    );

    return data;
  }

  //
  // Channel data
  //

  async getChannelData<T = CommonMetadata>(
    userId: string,
    channelId: string,
  ): Promise<ChannelData<T>> {
    if (!userId || !channelId) {
      throw new Error(
        `Incomplete arguments. You must provide a 'userId' and a 'channelId'`,
      );
    }

    const { data } = await this.knock.get(
      `/v1/users/${userId}/channel_data/${channelId}`,
    );

    return data;
  }

  async setChannelData<T = CommonMetadata>(
    userId: string,
    channelId: string,
    channelData: Record<string, any>,
  ): Promise<ChannelData<T>> {
    if (!userId || !channelId) {
      throw new Error(
        `Incomplete arguments. You must provide a 'userId' and a 'channelId'`,
      );
    }

    const args = { data: channelData };

    const { data } = await this.knock.put(
      `/v1/users/${userId}/channel_data/${channelId}`,
      args,
    );

    return data;
  }

  async unsetChannelData(userId: string, channelId: string): Promise<any> {
    if (!userId || !channelId) {
      throw new Error(
        `Incomplete arguments. You must provide a 'userId' and a 'channelId'`,
      );
    }

    const { data } = await this.knock.delete(
      `/v1/users/${userId}/channel_data/${channelId}`,
    );

    return data;
  }

  //
  // Messages
  //

  async getMessages(
    userId: string,
    filteringOptions: ListMessagesOptions = {},
  ): Promise<PaginatedItemsResponse<Message>> {
    if (!userId) {
      throw new Error(`Incomplete arguments. You must provide a 'userId'`);
    }

    const { data } = await this.knock.get(
      `/v1/users/${userId}/messages`,
      filteringOptions,
    );

    return data;
  }

  //
  // Schedules
  //

  async getSchedules(
    userId: string,
    filteringOptions: ListSchedulesProps = {},
  ): Promise<PaginatedEntriesResponse<Schedule>> {
    if (!userId) {
      throw new Error(`Incomplete arguments. You must provide a 'userId'`);
    }

    const { data } = await this.knock.get(
      `/v1/users/${userId}/schedules`,
      filteringOptions,
    );

    return data;
  }
}
