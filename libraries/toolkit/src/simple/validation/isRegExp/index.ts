/**
 * Type guard that checks if a value is a RegExp object
 *
 * Determines whether a value is a regular expression instance created with
 * RegExp constructor or regex literal syntax. Regular expressions are used
 * for pattern matching in strings and are a fundamental JavaScript feature.
 * This function uses instanceof checking and provides TypeScript type narrowing
 * to RegExp.
 *
 * RegExp detection:
 * - Regex literals: /pattern/flags
 * - RegExp constructor: new RegExp(pattern, flags)
 * - Cloned regexes: new RegExp(existingRegex)
 * - Cross-realm: may fail for RegExp from different contexts
 * - Not included: strings that look like patterns
 * - Not included: other pattern matching objects
 *
 * @param value - The value to check
 * @returns True if the value is a RegExp, false otherwise
 * @example
 * ```typescript
 * // Regex literals
 * isRegExp(/pattern/)                  // true
 * isRegExp(/^test$/i)                  // true
 * isRegExp(/\d+/g)                     // true
 *
 * // RegExp constructor
 * isRegExp(new RegExp("pattern"))      // true
 * isRegExp(new RegExp("^test$", "i"))  // true
 *
 * // Not RegExp
 * isRegExp("pattern")                  // false (string)
 * isRegExp("/pattern/gi")              // false (string)
 * isRegExp(null)                       // false
 * isRegExp({})                         // false
 *
 * // Type narrowing
 * const extractPattern = (value: unknown): string =>
 *   isRegExp(value) ? value.source : ""
 *
 * extractPattern(/hello/gi)            // "hello"
 * extractPattern("pattern")            // ""
 *
 * // Filtering RegExp from array
 * const mixed = [/pattern/, "string", new RegExp("test"), null]
 * const regexes = mixed.filter(isRegExp)  // [/pattern/, RegExp("test")]
 *
 * // Safe testing
 * const safeTest = (pattern: unknown, str: string): boolean =>
 *   isRegExp(pattern) ? pattern.test(str) : false
 *
 * safeTest(/hello/, "hello world")     // true
 * safeTest("not regex", "test")        // false
 * ```
 * @pure
 * @predicate
 */
const isRegExp = (value: unknown): value is RegExp => value instanceof RegExp

export default isRegExp
