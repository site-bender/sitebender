export type PolicyExecutor = (op: unknown) => unknown

const policies = new Map<string, PolicyExecutor>()

function register(tag: string, exec: PolicyExecutor) {
	policies.set(tag, exec)
}

function get(tag: string): PolicyExecutor | undefined {
	return policies.get(tag)
}

function list(): string[] {
	return Array.from(policies.keys())
}

const registry = { register, get, list } as const
export default registry
