import type { Value } from "@sitebender/architect-types/index.ts"

export default function isString(value: Value): value is string {
	return typeof value === "string"
}
