export type PolicyExecutor = (op: unknown) => unknown

const policies = new Map<string, PolicyExecutor>()

export function registerPolicy(tag: string, exec: PolicyExecutor) {
	policies.set(tag, exec)
}

export function getPolicy(tag: string): PolicyExecutor | undefined {
	return policies.get(tag)
}

export function listPolicies(): string[] {
	return Array.from(policies.keys())
}
