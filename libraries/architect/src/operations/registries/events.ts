import type { EventBinder } from "../../../types/operations/registries/events/index.ts"

const events = new Map<string, EventBinder>()

function register(tag: string, binder: EventBinder) {
	events.set(tag, binder)
}

function get(tag: string): EventBinder | undefined {
	return events.get(tag)
}

function list(): string[] {
	return Array.from(events.keys())
}

const registry = { register, get, list } as const
export default registry
