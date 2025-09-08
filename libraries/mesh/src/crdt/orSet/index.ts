import type { ORSet, ORSetItem } from "../../types/index.ts";

export default function createORSet<T>(
  items: Array<ORSetItem<T>> = [],
  nodeId: string,
  version: number = 0,
): ORSet<T> {
  return {
    value: items,
    nodeId,
    version,

    add(value: T): ORSet<T> {
      const id = `${nodeId}-${Date.now()}-${
        Math.random().toString(36).substr(2, 9)
      }`;
      const newItem: ORSetItem<T> = { value, id };
      return createORSet(
        [...items, newItem],
        nodeId,
        version + 1,
      );
    },

    remove(value: T): ORSet<T> {
      const updatedItems = items.map((item) =>
        item.value === value && !item.tombstone
          ? { ...item, tombstone: true }
          : item
      );
      return createORSet(
        updatedItems,
        nodeId,
        version + 1,
      );
    },

    merge(other: ORSet<T>): ORSet<T> {
      // Union all items from both sets
      const allItems = [...items, ...other.value];

      // Deduplicate by id, keeping tombstoned versions
      const uniqueItems = new Map<string, ORSetItem<T>>();
      for (const item of allItems) {
        const existing = uniqueItems.get(item.id);
        if (!existing || (item.tombstone && !existing.tombstone)) {
          uniqueItems.set(item.id, item);
        }
      }

      return createORSet(
        Array.from(uniqueItems.values()),
        nodeId,
        Math.max(version, other.version) + 1,
      );
    },

    has(value: T): boolean {
      return items.some((item) => item.value === value && !item.tombstone);
    },

    values(): Array<T> {
      return items
        .filter((item) => !item.tombstone)
        .map((item) => item.value);
    },

    serialize(): string {
      return JSON.stringify({
        items: items,
        nodeId: nodeId,
        version: version,
      });
    },
  };
}
