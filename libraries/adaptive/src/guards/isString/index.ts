import type { Value } from "@adaptiveTypes/index.ts"

export default function isString(value: Value): value is string {
	return typeof value === "string"
}
