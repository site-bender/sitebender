import type { ActionExecutor } from "../../../types/operations/registries/actions/index.ts"

const actions = new Map<string, ActionExecutor>()

function register(tag: string, exec: ActionExecutor) {
	actions.set(tag, exec)
}

function get(tag: string): ActionExecutor | undefined {
	return actions.get(tag)
}

function list(): string[] {
	return Array.from(actions.keys())
}

const registry = { register, get, list } as const
export default registry
