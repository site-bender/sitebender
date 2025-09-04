import type { ComparatorExecutor } from "../../../types/operations/registries/comparators/index.ts"

const comparators = new Map<string, ComparatorExecutor>()

function register(tag: string, exec: ComparatorExecutor) {
	comparators.set(tag, exec)
}

function get(tag: string): ComparatorExecutor | undefined {
	return comparators.get(tag)
}

function list(): string[] {
	return Array.from(comparators.keys())
}

const registry = { register, get, list } as const
export default registry
