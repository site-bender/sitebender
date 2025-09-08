import type { LWWRegister } from "../../types/index.ts";

export default function createLWWRegister<T>(
  initialValue: T,
  nodeId: string,
  timestamp: number = Date.now(),
  version: number = 0,
): LWWRegister<T> {
  return {
    value: initialValue,
    timestamp,
    nodeId,
    version,

    set(newValue: T): LWWRegister<T> {
      return createLWWRegister(
        newValue,
        nodeId,
        Date.now(),
        version + 1,
      );
    },

    merge(other: LWWRegister<T>): LWWRegister<T> {
      // Last write wins based on timestamp
      if (other.timestamp > timestamp) {
        return other;
      }
      if (other.timestamp < timestamp) {
        return this;
      }
      // Same timestamp: use nodeId for deterministic tie-breaking
      if (other.nodeId > nodeId) {
        return other;
      }
      return this;
    },

    serialize(): string {
      return JSON.stringify({
        value: this.value,
        timestamp: this.timestamp,
        nodeId: this.nodeId,
        version: this.version,
      });
    },
  };
}
