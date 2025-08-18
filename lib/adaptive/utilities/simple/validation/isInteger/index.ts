/**
 * Checks if a value is an integer
 * 
 * Determines whether a value is a whole number with no fractional component.
 * Uses Number.isInteger() internally, which checks if the value is a finite
 * number without a decimal part. This includes positive integers, negative
 * integers, and zero, but excludes Infinity, -Infinity, NaN, and non-numeric types.
 * 
 * Integer criteria:
 * - Must be of type "number"
 * - Must be finite (not Infinity, -Infinity, or NaN)
 * - Must have no fractional component
 * - Includes positive, negative, and zero
 * - Safe and unsafe integers both return true
 * 
 * @param value - The value to check
 * @returns True if the value is an integer, false otherwise
 * @example
 * ```typescript
 * // Positive integers
 * isInteger(0)                         // true
 * isInteger(1)                         // true
 * isInteger(42)                        // true
 * isInteger(999999)                    // true
 * 
 * // Negative integers
 * isInteger(-1)                        // true
 * isInteger(-42)                       // true
 * isInteger(-999999)                   // true
 * 
 * // Large integers
 * isInteger(Number.MAX_SAFE_INTEGER)   // true (9007199254740991)
 * isInteger(Number.MIN_SAFE_INTEGER)   // true (-9007199254740991)
 * isInteger(Number.MAX_SAFE_INTEGER + 1) // true (still an integer)
 * isInteger(Number.MAX_SAFE_INTEGER + 2) // true (precision lost but still integer)
 * 
 * // Not integers: decimals
 * isInteger(1.5)                       // false
 * isInteger(3.14159)                   // false
 * isInteger(0.1)                       // false
 * isInteger(-2.5)                      // false
 * 
 * // Deceptive cases
 * isInteger(1.0)                       // true (no fractional part)
 * isInteger(5.0)                       // true (mathematically an integer)
 * isInteger(1e10)                      // true (10000000000)
 * isInteger(3e-1)                      // false (0.3)
 * 
 * // Special numeric values
 * isInteger(NaN)                       // false
 * isInteger(Infinity)                  // false
 * isInteger(-Infinity)                 // false
 * 
 * // Non-numeric types (no coercion)
 * isInteger("5")                       // false (string)
 * isInteger("5.0")                     // false (string)
 * isInteger(null)                      // false
 * isInteger(undefined)                 // false
 * isInteger(true)                      // false
 * isInteger(false)                     // false
 * isInteger([5])                       // false
 * isInteger({})                        // false
 * 
 * // Array index validation
 * function isValidArrayIndex(value: unknown, array: Array<unknown>): boolean {
 *   return isInteger(value) && 
 *          value >= 0 && 
 *          value < array.length
 * }
 * 
 * const arr = ["a", "b", "c"]
 * isValidArrayIndex(1, arr)            // true
 * isValidArrayIndex(1.5, arr)          // false (not integer)
 * isValidArrayIndex(-1, arr)           // false (negative)
 * isValidArrayIndex(5, arr)            // false (out of bounds)
 * 
 * // Filtering integers
 * const numbers = [1, 1.5, 2, 2.7, 3, Math.PI, 4, NaN, 5]
 * const integers = numbers.filter(isInteger)
 * // [1, 2, 3, 4, 5]
 * 
 * // Pagination validation
 * interface PaginationParams {
 *   page: unknown
 *   limit: unknown
 * }
 * 
 * function validatePagination(params: PaginationParams): boolean {
 *   return isInteger(params.page) && 
 *          params.page > 0 &&
 *          isInteger(params.limit) && 
 *          params.limit > 0 && 
 *          params.limit <= 100
 * }
 * 
 * validatePagination({ page: 1, limit: 20 })     // true
 * validatePagination({ page: 1.5, limit: 20 })   // false
 * validatePagination({ page: 1, limit: "20" })   // false
 * validatePagination({ page: 0, limit: 20 })     // false
 * 
 * // Safe array access
 * function safeArrayAccess<T>(
 *   array: Array<T>,
 *   index: unknown
 * ): T | undefined {
 *   if (isInteger(index) && index >= 0 && index < array.length) {
 *     return array[index as number]
 *   }
 *   return undefined
 * }
 * 
 * safeArrayAccess([10, 20, 30], 1)     // 20
 * safeArrayAccess([10, 20, 30], 1.5)   // undefined
 * safeArrayAccess([10, 20, 30], "1")   // undefined
 * 
 * // Loop counter validation
 * function repeatAction(times: unknown, action: () => void): void {
 *   if (!isInteger(times) || times <= 0) {
 *     throw new Error("Times must be a positive integer")
 *   }
 *   
 *   for (let i = 0; i < times; i++) {
 *     action()
 *   }
 * }
 * 
 * // Bit operations safety
 * function safeBitwiseAnd(a: unknown, b: unknown): number | null {
 *   if (isInteger(a) && isInteger(b)) {
 *     return (a as number) & (b as number)
 *   }
 *   return null
 * }
 * 
 * safeBitwiseAnd(5, 3)                 // 1 (101 & 011 = 001)
 * safeBitwiseAnd(5.5, 3)               // null (5.5 not integer)
 * safeBitwiseAnd(5, "3")               // null (string)
 * 
 * // ID validation
 * function isValidId(id: unknown): boolean {
 *   return isInteger(id) && id > 0
 * }
 * 
 * isValidId(123)                       // true
 * isValidId(0)                         // false
 * isValidId(-5)                        // false
 * isValidId(12.3)                      // false
 * isValidId("123")                     // false
 * 
 * // Score validation with range
 * function validateScore(score: unknown): string | null {
 *   if (!isInteger(score)) {
 *     return "Score must be an integer"
 *   }
 *   if (score < 0 || score > 100) {
 *     return "Score must be between 0 and 100"
 *   }
 *   return null
 * }
 * 
 * validateScore(85)                    // null (valid)
 * validateScore(85.5)                  // "Score must be an integer"
 * validateScore(101)                   // "Score must be between 0 and 100"
 * validateScore("85")                  // "Score must be an integer"
 * 
 * // Factorial calculation
 * function factorial(n: unknown): number | null {
 *   if (!isInteger(n) || n < 0) {
 *     return null
 *   }
 *   
 *   let result = 1
 *   for (let i = 2; i <= n; i++) {
 *     result *= i
 *   }
 *   return result
 * }
 * 
 * factorial(5)                         // 120
 * factorial(0)                         // 1
 * factorial(5.5)                       // null
 * factorial(-5)                        // null
 * 
 * // Port number validation
 * function isValidPort(port: unknown): boolean {
 *   return isInteger(port) && 
 *          port >= 0 && 
 *          port <= 65535
 * }
 * 
 * isValidPort(3000)                    // true
 * isValidPort(80)                      // true
 * isValidPort(70000)                   // false
 * isValidPort(3000.5)                  // false
 * isValidPort("3000")                  // false
 * 
 * // Discrete value enforcement
 * const discreteValues = [0, 25, 50, 75, 100]
 * 
 * function validateDiscreteValue(value: unknown): boolean {
 *   return isInteger(value) && 
 *          discreteValues.includes(value as number)
 * }
 * 
 * validateDiscreteValue(50)            // true
 * validateDiscreteValue(50.0)          // true
 * validateDiscreteValue(50.5)          // false
 * validateDiscreteValue(60)            // false
 * 
 * // Safe integer vs any integer
 * function isSafeInteger(value: unknown): boolean {
 *   return isInteger(value) && 
 *          Number.isSafeInteger(value)
 * }
 * 
 * isInteger(Number.MAX_SAFE_INTEGER + 2)     // true
 * isSafeInteger(Number.MAX_SAFE_INTEGER + 2) // false
 * ```
 * @property Pure - Always returns the same result for the same input
 * @property Type-safe - Only returns true for number type, no coercion
 * @property Exact - Uses Number.isInteger for precise integer detection
 * @property Inclusive - Accepts all integers including large unsafe ones
 */
const isInteger = (value: unknown): value is number => 
	Number.isInteger(value)

export default isInteger