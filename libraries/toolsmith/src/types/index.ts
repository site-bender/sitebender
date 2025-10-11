// ============================================================================
// Base Value Types
// ============================================================================

export type PrimitiveValue = string | number | boolean | null | bigint | symbol

export type Serializable =
	| PrimitiveValue
	| Array<Serializable>
	| ReadonlyArray<Serializable>
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

export type Value =
	| Serializable
	| Function
	| WeakMap<object, Value>
	| WeakSet<object>
	| Promise<Value>

export type SerializableValue = Serializable

export type Unknown = Value

//++ Array type that guarantees at least one element
export type NonEmptyArray<T> = readonly [T, ...Array<T>]
