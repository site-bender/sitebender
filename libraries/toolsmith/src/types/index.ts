/**
 * Core type definitions for the toolsmith library
 *
 * This file contains fundamental types used throughout the library,
 * focusing on value types and data representations.
 */

// ============================================================================
// Base Value Types
// ============================================================================

/**
 * Primitive value types that can be used in operations
 * Note: undefined is intentionally excluded - use optional parameters (value?: ...)
 */
export type PrimitiveValue = string | number | boolean | null | bigint | symbol

/**
 * Serializable data types that can be transmitted, stored, or converted
 * Includes JSON-compatible types plus binary data and Temporal types
 *
 * Note: undefined is excluded - use optional parameters (value?: Serializable)
 */
export type Serializable =
	| PrimitiveValue
	| Array<Serializable>
	| { [key: string]: Serializable }
	| Date
	| RegExp
	| Error
	| Map<string, Serializable>
	| Set<Serializable>
	| ArrayBuffer
	| SharedArrayBuffer
	| DataView
	| Int8Array
	| Uint8Array
	| Uint8ClampedArray
	| Int16Array
	| Uint16Array
	| Int32Array
	| Uint32Array
	| Float32Array
	| Float64Array
	| BigInt64Array
	| BigUint64Array
	| Temporal.PlainDate
	| Temporal.PlainTime
	| Temporal.PlainDateTime
	| Temporal.PlainMonthDay
	| Temporal.PlainYearMonth
	| Temporal.ZonedDateTime
	| Temporal.Instant
	| Temporal.Duration
	| Temporal.Calendar
	| Temporal.TimeZone

/**
 * Complete Value type that includes ALL possible JavaScript values
 * Use this for predicates, validators, and functions that must handle any input
 *
 * Includes everything from Serializable plus non-serializable types
 * Note: undefined is still excluded - use optional parameters (value?: Value)
 */
export type Value =
	| Serializable
	| Function
	| WeakMap<object, Value>
	| WeakSet<object>
	| Promise<Value>

/**
 * Legacy alias for backward compatibility
 * @deprecated Use `Serializable` instead
 */
export type SerializableValue = Serializable

/**
 * Legacy alias for backward compatibility
 * @deprecated Use `Value` instead
 */
export type Unknown = Value

/**
 * Usage Guide:
 *
 * Use `Serializable` for:
 * - Data that needs to be transmitted or stored
 * - Function return types that produce data
 * - Configuration objects
 * - State management
 *
 * Use `Value` for:
 * - Predicate/validator parameters: (value?: Value) => boolean
 * - Type guards: (value?: Value): value is SomeType
 * - Functions that must handle ANY input
 * - Error handling functions
 *
 * Examples:
 * - isString(value?: Value): value is string
 * - toString(value?: Serializable): string
 * - safeParse<T>(parser: (value?: Value) => T): (value?: Value) => T | null
 */

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
