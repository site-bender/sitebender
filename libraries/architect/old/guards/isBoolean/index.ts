import type { Value } from "@sitebender/architect-types/index.ts"

export default function isBoolean(value: Value): value is boolean {
	return typeof value === "boolean"
}
