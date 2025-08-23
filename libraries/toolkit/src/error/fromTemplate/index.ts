import type { AdaptiveError, ErrorCode } from "../../types/error/index.ts"
import type { Value } from "../../types/index.ts"
import createError from "../createError/index.ts"
import * as templates from "../templates/index.ts"

/**
 * Creates an error from a predefined template
 * 
 * Uses standard message templates to ensure consistent error messaging.
 * The template name is converted to an error code automatically.
 * 
 * @curried (template) => (operation) => (args) => (...templateArgs) => error
 * @param template - Name of the template to use
 * @param operation - The operation that failed
 * @param args - Arguments passed to the operation
 * @param templateArgs - Arguments for the template function
 * @returns AdaptiveError with templated message
 * @example
 * ```typescript
 * // Type mismatch error
 * const error = fromTemplate("TYPE_MISMATCH")("parse")([input])(
 *   "parse", "Integer", "String"
 * )
 * // Message: "parse expected Integer but received String"
 * 
 * // Null input error
 * const nullError = fromTemplate("NULL_INPUT")("map")([fn, null])(
 *   "map", "array"
 * )
 * // Message: "map received null/undefined for required parameter 'array'"
 * 
 * // Out of range error
 * const rangeError = fromTemplate("OUT_OF_RANGE")("slice")([arr, 10])(
 *   "slice", "index", 0, 5, 10
 * )
 * // Message: "slice: index must be between 0 and 5, got 10"
 * 
 * // Partial application
 * const createNullError = fromTemplate("NULL_INPUT")
 * const mapNullError = createNullError("map")([fn, null])("map", "array")
 * ```
 */
const fromTemplate = <TTemplate extends keyof typeof templates>(template: TTemplate) =>
  <TOp extends string>(operation: TOp) =>
    <TArgs extends ReadonlyArray<Value>>(args: TArgs) =>
      (...templateArgs: ReadonlyArray<string | number>): AdaptiveError<TOp, TArgs> => {
        // Get the template function - we know it exists
        const templateFn = templates[template]
        
        // Build the message by applying arguments sequentially
        // Each template function is curried, so we apply args one by one
        // Using type assertion here is unavoidable due to dynamic curried function application
        let messageFn: ((arg: string | number) => string | ((arg: string | number) => string)) | string = templateFn as ((arg: string | number) => string | ((arg: string | number) => string))
        for (const arg of templateArgs) {
          if (typeof messageFn === "function") {
            messageFn = messageFn(arg) as string | ((arg: string | number) => string)
          }
        }
        
        // Convert template name to error code
        const code = template as ErrorCode
        
        // The final result should be a string
        const message = typeof messageFn === "string" ? messageFn : String(messageFn)
        
        return createError(operation)(args)(message)(code)
      }

export default fromTemplate