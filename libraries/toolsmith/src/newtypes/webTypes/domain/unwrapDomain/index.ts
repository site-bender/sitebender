import type { Domain } from "@sitebender/toolsmith/types/branded/index.ts"

//++ Unwraps a Domain branded type back to its underlying string value
export default function unwrapDomain(domain: Domain): string {
	return domain
}
