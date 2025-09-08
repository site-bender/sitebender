import type { GSet } from "../../types/index.ts";

export default function createGSet<T>(
  items: Set<T> = new Set(),
  nodeId: string,
  version: number = 0,
): GSet<T> {
  return {
    value: items,
    nodeId,
    version,

    add(item: T): GSet<T> {
      const newItems = new Set(items);
      newItems.add(item);
      return createGSet(
        newItems,
        nodeId,
        version + 1,
      );
    },

    merge(other: GSet<T>): GSet<T> {
      // Union of both sets
      const merged = new Set([...items, ...other.value]);
      return createGSet(
        merged,
        nodeId,
        Math.max(version, other.version) + 1,
      );
    },

    has(item: T): boolean {
      return items.has(item);
    },

    toArray(): Array<T> {
      return Array.from(items);
    },

    serialize(): string {
      return JSON.stringify({
        items: Array.from(items),
        nodeId: nodeId,
        version: version,
      });
    },
  };
}
