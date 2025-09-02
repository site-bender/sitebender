import type { Value } from "@engineTypes/index.ts"

export default function isBoolean(value: Value): value is boolean {
	return typeof value === "boolean"
}
