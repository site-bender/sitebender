import type { AdaptiveError } from "../../types/error/index.ts"
import type { Value } from "../../../types/index.ts"

/**
 * Adds a suggestion for fixing the error
 * 
 * Enriches an error object with a helpful suggestion for how to resolve
 * the issue. Returns a new immutable error object.
 * 
 * @curried (suggestion) => (error) => error
 * @param suggestion - Helpful advice for fixing the error
 * @param error - The error to enrich
 * @returns New error with suggestion
 * @example
 * ```typescript
 * // Add a simple suggestion
 * const suggest = withSuggestion("Check that the array is not null")
 * const helpfulError = suggest(error)
 * 
 * // Pipeline usage
 * const errorWithHelp = pipe(
 *   createError("divide")([10, 0])("Division by zero")(),
 *   withSuggestion("Ensure divisor is not zero before dividing")
 * )
 * 
 * // Conditional suggestion
 * const addSuggestion = error.code === "NULL_INPUT"
 *   ? withSuggestion("Initialize the value before use")
 *   : withSuggestion("Check the input type")
 * const improved = addSuggestion(error)
 * ```
 */
const withSuggestion = (suggestion: string) =>
  <TOp extends string, TArgs extends ReadonlyArray<Value>>(
    error: AdaptiveError<TOp, TArgs>
  ): AdaptiveError<TOp, TArgs> => ({
    ...error,
    suggestion
  })

export default withSuggestion