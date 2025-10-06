//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style

// ============================================================================
// Base Value Types
// ============================================================================

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
export type PrimitiveValue = string | number | boolean | null | bigint | symbol

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
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

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
export type Value =
	| Serializable
	| Function
	| WeakMap<object, Value>
	| WeakSet<object>
	| Promise<Value>

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
export type SerializableValue = Serializable

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
export type Unknown = Value

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
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
