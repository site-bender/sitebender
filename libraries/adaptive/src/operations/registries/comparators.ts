export type ComparatorExecutor = (...args: unknown[]) => Promise<boolean | unknown> | boolean | unknown

const comparators = new Map<string, ComparatorExecutor>()

export function registerComparator(tag: string, exec: ComparatorExecutor) {
  comparators.set(tag, exec)
}

export function getComparator(tag: string): ComparatorExecutor | undefined {
  return comparators.get(tag)
}

export function listComparators(): string[] { return Array.from(comparators.keys()) }
