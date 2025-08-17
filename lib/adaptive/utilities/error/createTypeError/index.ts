import type { AdaptiveError } from "../../types/error/index.ts"
import type { Value, Datatype } from "../../../types/index.ts"
import createError from "../createError/index.ts"

/**
 * Creates a type mismatch error with full context
 * 
 * Specialized error creator for type-related failures. Automatically
 * adds failed argument info, type details, and a helpful suggestion.
 * 
 * @curried (operation) => (args) => (argIndex) => (expected) => (actual) => error
 * @param operation - The operation that failed
 * @param args - Arguments passed to the operation
 * @param argIndex - Index of the argument with wrong type
 * @param expected - Expected Datatype
 * @param actual - Actual type received
 * @returns Complete type error with all context
 * @example
 * ```typescript
 * // Simple type error
 * const error = createTypeError("map")([fn, array])(0)("Function")("String")
 * // Message: "map: Expected Function at argument 0, got String"
 * // Includes suggestion: "Ensure argument 0 is of type Function"
 * 
 * // For null/undefined
 * const nullError = createTypeError("filter")([pred, null])(1)("Array")("null")
 * 
 * // With custom types
 * const customError = createTypeError("divide")([10, 0])(1)("NonZeroNumber")("Integer")
 * 
 * // Partial application
 * const createMapTypeError = createTypeError("map")
 * const error = createMapTypeError([fn, data])(0)("Function")(typeof fn)
 * ```
 */
const createTypeError = <TOp extends string>(operation: TOp) =>
  <TArgs extends ReadonlyArray<Value>>(args: TArgs) =>
    (argIndex: number) =>
      <TDataType extends Datatype>(expected: TDataType) =>
        (actual: TDataType | "null" | "undefined" | "unknown"): AdaptiveError<TOp, TArgs, TDataType> => {
          // Build the error step by step to maintain type compatibility
          const baseError = createError(operation)(args)(
            `${operation}: Expected ${expected} at argument ${argIndex}, got ${actual}`
          )("TYPE_MISMATCH") as AdaptiveError<TOp, TArgs, TDataType>
          
          // Apply transformations directly
          return {
            ...baseError,
            failedArgIndex: argIndex as keyof TArgs & number,
            expectedType: expected,
            actualType: actual,
            suggestion: `Ensure argument ${argIndex} is of type ${expected}`
          }
        }

export default createTypeError