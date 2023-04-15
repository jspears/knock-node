import { Knock } from "../../knock.ts";
import { BulkOperation } from "../bulk_operations/interfaces.ts";

export class BulkOperations {
  constructor(readonly knock: Knock) {}

  async get(id: string): Promise<BulkOperation> {
    const { data } = await this.knock.get(`/v1/bulk_operations/${id}`);
    return data;
  }
}
