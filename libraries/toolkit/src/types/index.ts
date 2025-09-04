import isNotNull from "../simple/validation/isNotNull/index.ts"
import isNullish from "../simple/validation/isNullish/index.ts"

/**
 * Core type definitions for the toolkit library
 *
 * This file contains fundamental types used throughout the library,
 * focusing on value types and data representations.
 */

// ============================================================================
// Base Value Types
// ============================================================================

/**
 * Primitive value types that can be used in operations
 */
export type PrimitiveValue = string | number | boolean | null | undefined

/**
 * Recursive Value type for representing any data structure
 * Similar to JSON but more flexible, supporting Maps, Sets, and Temporal types
 */
export type Value =
	| PrimitiveValue
	| Array<Value>
	| { [key: string]: Value }
	| Date
	| RegExp
	| Map<string, Value>
	| Set<Value>
	| Temporal.PlainDate
	| Temporal.PlainTime
	| Temporal.PlainDateTime
	| Temporal.ZonedDateTime

/**
 * Datatype identifiers for type conversions and validations
 */
export type NumericDatatype = "Number" | "Float" | "Integer" | "Precision"
export type StringDatatype = "String"
export type BooleanDatatype = "Boolean"
export type TemporalDatatype =
	| "Date"
	| "Time"
	| "DateTime"
	| "Duration"
	| "Instant"
export type ComplexDatatype = "Json" | "Array" | "Map" | "Set" | "Object"

export type Datatype =
	| NumericDatatype
	| StringDatatype
	| BooleanDatatype
	| TemporalDatatype
	| ComplexDatatype

/**
 * Checks if something is a valid Value type
 */
export const isValue = (val: unknown): val is Value => {
	if (isNullish(val)) return true

	const type = typeof val
	if (type === "string" || type === "number" || type === "boolean") return true

	if (Array.isArray(val)) {
		return val.every(isValue)
	}

	if (val instanceof Map) {
		return Array.from(val.entries()).every((([k, v]) =>
			typeof k === "string" && isValue(v)
		))
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
		return Object.entries(val as Record<string, unknown>).every((([k, v]) =>
			typeof k === "string" && isValue(v)
		))
	}

	return false
}
