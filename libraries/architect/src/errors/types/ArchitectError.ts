import type { Value } from "@sitebender/toolsmith/types/index.ts"

//++ Error code types for Architect operations
export type ErrorCode =
	| "OPERATION_FAILED"
	| "TYPE_MISMATCH"
	| "NULL_VALUE"
	| "INVALID_ARGUMENT"
	| "CALLBACK_THREW"
	| "EXCEPTION_THROWN"
	| "VALIDATION_FAILED"
	| "OUT_OF_BOUNDS"
	| "PARSE_ERROR"
	| "NETWORK_ERROR"
	| "TIMEOUT"
	| "PERMISSION_DENIED"
	| "NOT_FOUND"
	| "ALREADY_EXISTS"
	| "RESOURCE_EXHAUSTED"
	| "CANCELLED"
	| "DATA_LOSS"
	| "UNKNOWN"

//++ Error severity levels
export type ErrorSeverity = "warning" | "error" | "critical"

//++ Datatype identifiers for type checking
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

//++ Rich error type for Architect operations with full context
export interface ArchitectError<
	TOp extends string = string,
	TArgs extends ReadonlyArray<Value> = ReadonlyArray<Value>,
> {
	readonly name: `${TOp}Error`
	readonly operation: TOp
	readonly args: TArgs
	readonly message: string
	readonly code: ErrorCode
	readonly severity: ErrorSeverity
	readonly failedIndex?: number
	readonly failedArg?: Value
	readonly types?: {
		readonly expected: Datatype | ReadonlyArray<Datatype>
		readonly actual: Datatype
	}
	readonly suggestion?: string
	readonly cause?: Error | ArchitectError | unknown
	readonly stack?: string
	readonly context?: Record<string, Value>
}
