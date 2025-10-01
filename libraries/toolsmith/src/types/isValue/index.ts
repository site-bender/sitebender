import type { Value } from "../index.ts"

import isNotNull from "../../vanilla/validation/isNotNull/index.ts"
import isNullish from "../../vanilla/validation/isNullish/index.ts"

//++ Checks if a value conforms to the Value type (recursive validation)
export function isValue(val: unknown): val is Value {
	if (isNullish(val)) return true

	const type = typeof val
	if (type === "string" || type === "number" || type === "boolean") {
		return true
	}

	if (Array.isArray(val)) {
		return val.every(isValue)
	}

	if (val instanceof Map) {
		return Array.from(val.entries()).every(
			([k, v]) => typeof k === "string" && isValue(v),
		)
	}

	if (val instanceof Set) {
		return Array.from(val.values()).every(isValue)
	}

	// Check for Temporal types
	if (
		val instanceof Temporal.PlainDate ||
		val instanceof Temporal.PlainTime ||
		val instanceof Temporal.PlainDateTime ||
		val instanceof Temporal.ZonedDateTime
	) {
		return true
	}

	if (type === "object" && isNotNull(val)) {
		// Plain object with string keys only
		return Object.entries(val as Record<string, unknown>).every(
			([k, v]) => typeof k === "string" && isValue(v),
		)
	}

	return false
}

// const validValue = { name: "John", age: 30, tags: ["user", "admin"] }
// isValue(validValue) // true

// const complexValue = new Map([
//   ["users", [{ id: 1, name: "Alice" }, { id: 2, name: "Bob" }]],
//   ["config", { enabled: true, timeout: 5000 }]
// ])
// isValue(complexValue) // true
