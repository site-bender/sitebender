import type { CRDT } from "../../../types/index.ts";

export type Operation = {
  type: string;
  payload: unknown;
  timestamp: number;
  nodeId: string;
};

export type OpSyncProtocol<T extends CRDT<unknown>> = {
  recordOp(op: Operation): void;
  flush(): Promise<void>;
  receive(): Promise<T>;
  startSync(): void;
  stopSync(): void;
};
