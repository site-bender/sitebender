import type { Value } from "@sitebender/engine-types/index.ts"

export default function isBoolean(value: Value): value is boolean {
	return typeof value === "boolean"
}
