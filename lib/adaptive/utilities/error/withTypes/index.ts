import type { AdaptiveError } from "../../types/error/index.ts"
import type { Value, Datatype } from "../../../types/index.ts"

/**
 * Adds type information to an error
 * 
 * Enriches an error object with expected and actual type information.
 * Useful for type mismatch errors. Returns a new immutable error object.
 * 
 * @curried (expected) => (actual) => (error) => error
 * @param expected - The expected Datatype
 * @param actual - The actual type received
 * @param error - The error to enrich
 * @returns New error with type information
 * @example
 * ```typescript
 * // Add type mismatch information
 * const expectNumber = withTypes("Number")("String")
 * const typedError = expectNumber(error)
 * 
 * // For null/undefined
 * const expectInteger = withTypes("Integer")("null")
 * const nullError = expectInteger(error)
 * 
 * // Pipeline usage
 * const errorWithTypes = pipe(
 *   createError("parse")([value])("Cannot parse value")(),
 *   withTypes("Float")("String")
 * )
 * ```
 */
const withTypes = <TDataType extends Datatype>(expected: TDataType) =>
  (actual: TDataType | "null" | "undefined" | "unknown") =>
    <TOp extends string, TArgs extends ReadonlyArray<Value>>(
      error: AdaptiveError<TOp, TArgs, TDataType>
    ): AdaptiveError<TOp, TArgs, TDataType> => ({
      ...error,
      expectedType: expected,
      actualType: actual
    })

export default withTypes