import { User } from "../users/interfaces.ts";
import { Object } from "../objects/interfaces.ts";

export interface Activity {
  id: string;
  data: Record<string, any>;
  actor: User | Object;
  recipient: User | Object;
  inserted_at: string;
  updated_at: string;

  // only when paginating
  __cursor?: string;
}
