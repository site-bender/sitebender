import hasRole from "@sitebender/architect/operations/policies/hasRole/index.ts"
// Lazy import to avoid ESM cycles in some environments
import isAuthenticated from "@sitebender/architect/operations/policies/isAuthenticated/index.ts"
import policies from "@sitebender/architect/operations/registries/policies.ts"

export default function registerPolicies() {
	policies.register(
		"IsAuthenticated",
		isAuthenticated as unknown as (op: unknown) => unknown,
	)
	policies.register(
		"HasRole",
		hasRole as unknown as (op: unknown) => unknown,
	)
}
