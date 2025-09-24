import type { Datatype, Value } from "../index.ts"

/**
 * Error codes for categorizing failures
 */
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

/**
 * Error severity levels
 */
export type ErrorSeverity = "warning" | "error" | "critical"

/**
 * Comprehensive error type for the toolsmith library
 *
 * @template TOp - The operation name as a string literal
 * @template TArgs - The arguments tuple type
 */
export interface ArchitectError<
	TOp extends string = string,
	TArgs extends ReadonlyArray<Value> = ReadonlyArray<Value>,
> {
	/**
	 * Error name, typically in the form "{operation}Error"
	 */
	readonly name: `${TOp}Error`

	/**
	 * The operation that failed
	 */
	readonly operation: TOp

	/**
	 * Arguments passed to the operation when it failed
	 */
	readonly args: TArgs

	/**
	 * Human-readable error message
	 */
	readonly message: string

	/**
	 * Machine-readable error code for categorization
	 */
	readonly code: ErrorCode

	/**
	 * Severity of the error
	 */
	readonly severity: ErrorSeverity

	/**
	 * Optional index where the error occurred (for array operations)
	 */
	readonly failedIndex?: number

	/**
	 * Optional argument that caused the failure
	 */
	readonly failedArg?: Value

	/**
	 * Optional expected and actual types for type errors
	 */
	readonly types?: {
		readonly expected: Datatype | ReadonlyArray<Datatype>
		readonly actual: Datatype
	}

	/**
	 * Optional suggestion for fixing the error
	 */
	readonly suggestion?: string

	/**
	 * Optional original error that caused this error
	 */
	readonly cause?: Error | ArchitectError | unknown

	/**
	 * Optional stack trace
	 */
	readonly stack?: string

	/**
	 * Optional additional context
	 */
	readonly context?: Record<string, Value>
}
