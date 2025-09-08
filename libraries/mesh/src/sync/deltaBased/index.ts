import type { CRDT, Transport } from "../../types/index.ts";
import type { Delta, DeltaSyncProtocol } from "./types/index.ts";

export default function createDeltaSyncProtocol<T extends CRDT<unknown>>(
  crdt: T,
  transport: Transport,
): DeltaSyncProtocol<T> {
  let currentCRDT = crdt;
  let lastSyncVersion = 0;

  function computeDelta(fromVersion: number, toVersion: number): Delta {
    // In production, CRDTs would track changes between versions
    // This is a simplified implementation
    return {
      fromVersion,
      toVersion,
      changes: currentCRDT.serialize(),
      nodeId: currentCRDT.nodeId,
    };
  }

  function applyDelta(delta: Delta): T {
    // In production, we'd apply only the changes in the delta
    // For now, we'll treat it as a full state merge
    const deltaState = JSON.parse(delta.changes as string);
    const deltaCRDT = {
      ...deltaState,
      merge: currentCRDT.merge.bind(currentCRDT),
      serialize: () => delta.changes as string,
    } as T;

    return currentCRDT.merge(deltaCRDT) as T;
  }

  return {
    async sync(): Promise<T> {
      if (!transport.isConnected()) {
        throw new Error("Transport is not connected");
      }

      // Send our delta since last sync
      const ourDelta = computeDelta(lastSyncVersion, currentCRDT.version);

      await transport.send({
        type: "DELTA_SYNC",
        delta: ourDelta,
        requestFromVersion: lastSyncVersion,
      });

      // Receive remote delta
      const message = await transport.receive() as {
        type: string;
        delta?: Delta;
      };

      if (message.type !== "DELTA_SYNC") {
        throw new Error(
          `Expected DELTA_SYNC message, got ${message.type}`,
        );
      }

      // Apply remote delta
      if (message.delta) {
        currentCRDT = applyDelta(message.delta);
        lastSyncVersion = Math.max(
          lastSyncVersion,
          message.delta.toVersion,
        );
      }

      return currentCRDT;
    },

    async requestDelta(fromVersion: number): Promise<void> {
      if (!transport.isConnected()) {
        throw new Error("Transport is not connected");
      }

      await transport.send({
        type: "DELTA_REQUEST",
        fromVersion,
        nodeId: currentCRDT.nodeId,
      });
    },

    async receiveDelta(): Promise<T> {
      if (!transport.isConnected()) {
        throw new Error("Transport is not connected");
      }

      const message = await transport.receive() as {
        type: string;
        delta?: Delta;
      };

      if (message.type === "DELTA_RESPONSE" && message.delta) {
        currentCRDT = applyDelta(message.delta);
        lastSyncVersion = message.delta.toVersion;
      }

      return currentCRDT;
    },

    getLastSyncVersion(): number {
      return lastSyncVersion;
    },
  };
}
