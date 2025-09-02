// Lazy import to avoid ESM cycles in some environments
import isAuthenticated from "@adaptiveSrc/operations/policies/isAuthenticated/index.ts"
import hasRole from "@adaptiveSrc/operations/policies/hasRole/index.ts"
import { registerPolicy } from "@adaptiveSrc/operations/registries/policies.ts"

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
