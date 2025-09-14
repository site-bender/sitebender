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
