import type { Value } from "@adaptiveTypes/index.ts"

export default function isBoolean(value: Value): value is boolean {
	return typeof value === "boolean"
}
