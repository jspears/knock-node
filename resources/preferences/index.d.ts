import { ChannelType } from "../../common/interfaces";
import { Knock } from "../../knock";
import { ChannelTypePreferences, WorkflowPreferenceSetting, WorkflowPreferences, PreferenceOptions, SetPreferencesProperties, PreferenceSet } from "./interfaces";
export declare class Preferences {
    readonly knock: Knock;
    constructor(knock: Knock);
    /**
     * @deprecated Use `users.getAllPreferences` instead
     */
    getAll(userId: string): Promise<PreferenceSet[]>;
    /**
     * @deprecated Use `users.getPreferences` instead
     */
    get(userId: string, options?: PreferenceOptions): Promise<PreferenceSet>;
    /**
     * @deprecated Use `users.setPreferences` instead
     */
    set(userId: string, preferenceSet: SetPreferencesProperties, options?: PreferenceOptions): Promise<PreferenceSet>;
    /**
     * @deprecated Use `users.setChannelTypesPreferences` instead
     */
    setChannelTypes(userId: string, channelTypePreferences: ChannelTypePreferences, options?: PreferenceOptions): Promise<PreferenceSet>;
    /**
     * @deprecated Use `users.setChannelTypePreferences` instead
     */
    setChannelType(userId: string, channelType: ChannelType, setting: boolean, options?: PreferenceOptions): Promise<PreferenceSet>;
    /**
     * @deprecated Use `users.setWorkflowsPreferences` instead
     */
    setWorkflows(userId: string, workflowPreferences: WorkflowPreferences, options?: PreferenceOptions): Promise<PreferenceSet>;
    /**
     * @deprecated Use `users.setWorkflowPreferences` instead
     */
    setWorkflow(userId: string, workflowKey: string, setting: WorkflowPreferenceSetting, options?: PreferenceOptions): Promise<PreferenceSet>;
    /**
     * @deprecated Use `users.setCategoriesPreferences` instead
     */
    setCategories(userId: string, categoryPreferences: WorkflowPreferences, options?: PreferenceOptions): Promise<PreferenceSet>;
    /**
     * @deprecated Use `users.setCategoryPreferences` instead
     */
    setCategory(userId: string, categoryKey: string, setting: WorkflowPreferenceSetting, options?: PreferenceOptions): Promise<PreferenceSet>;
}
