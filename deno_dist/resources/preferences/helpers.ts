import { WorkflowPreferenceSetting } from "./interfaces.ts";

export function buildUpdateParam(param: WorkflowPreferenceSetting) {
  if (typeof param === "object") {
    return param;
  }

  return { subscribed: param };
}

export const DEFAULT_PREFERENCE_SET_ID = "default";
