/**
 * Conditional function application based on a predicate
 * 
 * Applies one of two functions to a value based on whether a predicate
 * returns truthy or falsy. This provides a functional alternative to
 * imperative if/else statements, allowing conditional logic to be
 * composed and chained in pipelines.
 * 
 * @curried (predicate) => (onTrue) => (onFalse) => (value) => result
 * @param predicate - Function that tests the value
 * @param onTrue - Function to apply if predicate is truthy
 * @param onFalse - Function to apply if predicate is falsy
 * @param value - The value to test and transform
 * @returns Result of onTrue or onFalse function
 * @example
 * ```typescript
 * // Basic conditional transformation
 * const processNumber = ifElse(
 *   (n: number) => n > 0,
 *   (n: number) => n * 2,    // If positive, double it
 *   (n: number) => n * -1     // If not positive, negate it
 * )
 * 
 * processNumber(5)                     // 10 (positive, doubled)
 * processNumber(-3)                    // 3 (negative, negated)
 * processNumber(0)                     // 0 (zero, negated to 0)
 * 
 * // String processing
 * const formatName = ifElse(
 *   (s: string) => s.length > 0,
 *   (s: string) => s.toUpperCase(),
 *   () => "ANONYMOUS"
 * )
 * 
 * formatName("john")                   // "JOHN"
 * formatName("")                       // "ANONYMOUS"
 * 
 * // Partial application for reusable conditions
 * const ifPositive = ifElse((n: number) => n > 0)
 * 
 * const absoluteValue = ifPositive(
 *   (n: number) => n,                  // Keep positive as-is
 *   (n: number) => -n                  // Negate negative
 * )
 * absoluteValue(5)                     // 5
 * absoluteValue(-5)                    // 5
 * 
 * const signLabel = ifPositive(
 *   () => "positive",
 *   (n: number) => n === 0 ? "zero" : "negative"
 * )
 * signLabel(5)                         // "positive"
 * signLabel(0)                         // "zero"
 * signLabel(-5)                        // "negative"
 * 
 * // Object property access with fallback
 * interface User {
 *   name?: string
 *   id: number
 * }
 * 
 * const getName = ifElse(
 *   (u: User) => u.name !== undefined,
 *   (u: User) => u.name!,
 *   (u: User) => `User${u.id}`
 * )
 * 
 * getName({ id: 1, name: "Alice" })    // "Alice"
 * getName({ id: 2 })                   // "User2"
 * 
 * // Validation with different error paths
 * const validateAge = ifElse(
 *   (age: number) => age >= 0 && age <= 120,
 *   (age: number) => ({ valid: true, value: age }),
 *   (age: number) => ({ 
 *     valid: false, 
 *     error: age < 0 ? "Age cannot be negative" : "Age too high" 
 *   })
 * )
 * 
 * validateAge(25)                      // { valid: true, value: 25 }
 * validateAge(-5)                      // { valid: false, error: "Age cannot be negative" }
 * validateAge(150)                     // { valid: false, error: "Age too high" }
 * 
 * // Array processing
 * const processArray = ifElse(
 *   (arr: unknown[]) => arr.length > 0,
 *   (arr: unknown[]) => arr[0],        // Get first element
 *   () => null                         // Return null for empty
 * )
 * 
 * processArray([1, 2, 3])              // 1
 * processArray([])                     // null
 * 
 * // Chaining conditional operations
 * const complexProcess = ifElse(
 *   (x: number) => x !== 0,
 *   ifElse(
 *     (x: number) => x > 0,
 *     (x: number) => Math.sqrt(x),     // Positive: square root
 *     (x: number) => x * x              // Negative: square
 *   ),
 *   () => NaN                          // Zero: return NaN
 * )
 * 
 * complexProcess(9)                    // 3 (sqrt of 9)
 * complexProcess(-3)                   // 9 (square of -3)
 * complexProcess(0)                    // NaN
 * 
 * // Authentication flow
 * const authenticate = ifElse(
 *   (user: { token?: string }) => Boolean(user.token),
 *   (user: { token?: string }) => ({ 
 *     authenticated: true, 
 *     token: user.token 
 *   }),
 *   () => ({ 
 *     authenticated: false, 
 *     redirect: "/login" 
 *   })
 * )
 * 
 * authenticate({ token: "abc123" })    
 * // { authenticated: true, token: "abc123" }
 * 
 * authenticate({})                     
 * // { authenticated: false, redirect: "/login" }
 * 
 * // File processing
 * const processFile = ifElse(
 *   (file: { size: number }) => file.size < 1000000,
 *   (file: { size: number, name: string }) => 
 *     `Uploading ${file.name}`,
 *   (file: { size: number }) => 
 *     `File too large: ${file.size} bytes`
 * )
 * 
 * processFile({ size: 50000, name: "doc.pdf" })  
 * // "Uploading doc.pdf"
 * 
 * processFile({ size: 2000000, name: "video.mp4" })  
 * // "File too large: 2000000 bytes"
 * 
 * // Type narrowing
 * const processValue = ifElse(
 *   (v: unknown): v is string => typeof v === "string",
 *   (v: string) => v.toUpperCase(),    // TypeScript knows v is string
 *   (v: unknown) => String(v)          // Convert non-strings
 * )
 * 
 * processValue("hello")                // "HELLO"
 * processValue(123)                    // "123"
 * processValue(true)                   // "true"
 * 
 * // Pipeline integration
 * const pipeline = [
 *   (x: number) => x * 2,
 *   ifElse(
 *     (x: number) => x > 10,
 *     (x: number) => x - 5,
 *     (x: number) => x + 5
 *   ),
 *   (x: number) => Math.round(x)
 * ]
 * 
 * const process = (value: number) =>
 *   pipeline.reduce((acc, fn) => fn(acc), value)
 * 
 * process(3)                           // 11 (3*2=6, 6<=10, 6+5=11)
 * process(8)                           // 11 (8*2=16, 16>10, 16-5=11)
 * 
 * // Error handling
 * const safeDivide = ifElse(
 *   (x: [number, number]) => x[1] !== 0,
 *   (x: [number, number]) => x[0] / x[1],
 *   () => Infinity
 * )
 * 
 * safeDivide([10, 2])                  // 5
 * safeDivide([10, 0])                  // Infinity
 * 
 * // State machine actions
 * type State = "idle" | "loading" | "error"
 * 
 * const handleAction = ifElse(
 *   (action: { type: string }) => action.type === "FETCH",
 *   (): State => "loading",
 *   (action: { type: string }): State => 
 *     action.type === "ERROR" ? "error" : "idle"
 * )
 * 
 * handleAction({ type: "FETCH" })      // "loading"
 * handleAction({ type: "ERROR" })      // "error"
 * handleAction({ type: "RESET" })      // "idle"
 * ```
 * @property Pure - Always returns same result for same input
 * @property Curried - Allows partial application for reusable conditions
 * @property Composable - Can be nested and chained for complex logic
 */
const ifElse = <T, R>(
	predicate: (value: T) => unknown
) => (
	onTrue: (value: T) => R
) => (
	onFalse: (value: T) => R
) => (
	value: T
): R => predicate(value) ? onTrue(value) : onFalse(value)

export default ifElse