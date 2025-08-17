import type { Value, Datatype } from "../../../types/index.ts"

export type ErrorCode = 
  | "TYPE_MISMATCH"
  | "NULL_INPUT"
  | "INVALID_ARGUMENT"
  | "OPERATION_FAILED"
  | "EXCEPTION_THROWN"
  | "CALLBACK_THREW"
  | "VALIDATION_FAILED"
  | "OUT_OF_RANGE"
  | "DIVISION_BY_ZERO"
  | "PARSE_ERROR"
  | "NOT_FOUND"
  | "PERMISSION_DENIED"
  | "UNKNOWN_ERROR"

export type AdaptiveError<
  TOperation extends string = string,
  TArgs extends ReadonlyArray<Value> = ReadonlyArray<Value>,
  TDataType extends Datatype = Datatype
> = Readonly<{
  name: `${TOperation}Error`
  code: ErrorCode
  severity: "error" | "warning"
  operation: TOperation
  message: string
  args: TArgs
  failedArgIndex?: keyof TArgs & number
  failedArgName?: string
  expectedType?: TDataType
  actualType?: TDataType | "null" | "undefined" | "unknown"
  validationPath?: ReadonlyArray<string | number>
  validationErrors?: ReadonlyArray<AdaptiveError>
  stack?: string
  cause?: Error | AdaptiveError
  suggestion?: string
  documentationUrl?: string
}>

// Specific error types for common operations
// For specific error types, we need to be more flexible with args
// since functions aren't Values. We'll use a simpler approach:

export type MapError<T, U> = Readonly<{
  name: "mapError"
  code: ErrorCode
  severity: "error" | "warning"
  operation: "map"
  message: string
  args: [
    (item: T, index: number, array: ReadonlyArray<T>) => U,
    ReadonlyArray<T> | null | undefined
  ]
  failedArgIndex?: 0 | 1
  failedArgName?: string
  expectedType?: Datatype
  actualType?: Datatype | "null" | "undefined" | "unknown"
  validationPath?: ReadonlyArray<string | number>
  validationErrors?: ReadonlyArray<AdaptiveError>
  stack?: string
  cause?: Error | AdaptiveError
  suggestion?: string
  documentationUrl?: string
}>

export type FilterError<T> = Readonly<{
  name: "filterError"
  code: ErrorCode
  severity: "error" | "warning"
  operation: "filter"
  message: string
  args: [
    (item: T, index: number, array: ReadonlyArray<T>) => boolean,
    ReadonlyArray<T> | null | undefined
  ]
  failedArgIndex?: 0 | 1
  failedArgName?: string
  expectedType?: Datatype
  actualType?: Datatype | "null" | "undefined" | "unknown"
  validationPath?: ReadonlyArray<string | number>
  validationErrors?: ReadonlyArray<AdaptiveError>
  stack?: string
  cause?: Error | AdaptiveError
  suggestion?: string
  documentationUrl?: string
}>

export type ReduceError<T, R> = Readonly<{
  name: "reduceError"
  code: ErrorCode
  severity: "error" | "warning"
  operation: "reduce"
  message: string
  args: [
    (acc: R, item: T, index: number, array: ReadonlyArray<T>) => R,
    R,
    ReadonlyArray<T> | null | undefined
  ]
  failedArgIndex?: 0 | 1 | 2
  failedArgName?: string
  expectedType?: Datatype
  actualType?: Datatype | "null" | "undefined" | "unknown"
  validationPath?: ReadonlyArray<string | number>
  validationErrors?: ReadonlyArray<AdaptiveError>
  stack?: string
  cause?: Error | AdaptiveError
  suggestion?: string
  documentationUrl?: string
}>

export type PathError = AdaptiveError<
  "path",
  [
    string | ReadonlyArray<string | number>,
    Value
  ],
  Datatype
>

export type MergeError = AdaptiveError<
  "merge",
  [
    ReadonlyArray<Record<string | symbol, Value> | null | undefined>,
    Record<string | symbol, Value> | null | undefined
  ],
  Datatype
>

export type KeysError = AdaptiveError<
  "keys",
  [object | null | undefined],
  Datatype
>

export type ValuesError = AdaptiveError<
  "values",
  [Record<string, Value> | null | undefined],
  Datatype
>

export type EntriesError = AdaptiveError<
  "entries",
  [Record<string, Value> | null | undefined],
  Datatype
>

export type FromEntriesError = AdaptiveError<
  "fromEntries",
  [Iterable<readonly [string | number | symbol, Value]> | null | undefined],
  Datatype
>