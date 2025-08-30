import { registerPolicy } from "@adaptiveSrc/operations/registries/policies.ts"

// Lazy import to avoid ESM cycles in some environments
import isAuthenticated from "@adaptiveSrc/operations/policies/isAuthenticated/index.ts"

export default function registerPolicies() {
  registerPolicy("IsAuthenticated", isAuthenticated as unknown as (op: unknown) => unknown)
}
