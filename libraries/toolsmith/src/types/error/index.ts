import type { Datatype, Value } from "../index.ts"

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
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

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
export type ErrorSeverity = "warning" | "error" | "critical"

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
export interface ArchitectError<
	TOp extends string = string,
	TArgs extends ReadonlyArray<Value> = ReadonlyArray<Value>,
> {
	//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
	readonly name: `${TOp}Error`

	//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
	readonly operation: TOp

	//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
	readonly args: TArgs

	//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
	readonly message: string

	//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
	readonly code: ErrorCode

	//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
	readonly severity: ErrorSeverity

	//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
	readonly failedIndex?: number

	//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
	readonly failedArg?: Value

	//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
	readonly types?: {
		readonly expected: Datatype | ReadonlyArray<Datatype>
		readonly actual: Datatype
	}

	//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
	readonly suggestion?: string

	//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
	readonly cause?: Error | ArchitectError | unknown

	//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
	readonly stack?: string

	//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
	readonly context?: Record<string, Value>
}
