import hasRole from "@engineSrc/operations/policies/hasRole/index.ts"
// Lazy import to avoid ESM cycles in some environments
import isAuthenticated from "@engineSrc/operations/policies/isAuthenticated/index.ts"
import { registerPolicy } from "@engineSrc/operations/registries/policies.ts"

export default function registerPolicies() {
	registerPolicy(
		"IsAuthenticated",
		isAuthenticated as unknown as (op: unknown) => unknown,
	)
	registerPolicy(
		"HasRole",
		hasRole as unknown as (op: unknown) => unknown,
	)
}
