/**
 * Multi-way conditional expression (like switch/case or if/else-if chains)
 * 
 * Evaluates a list of [predicate, result] pairs in order, returning the
 * result of the first predicate that evaluates to truthy. If no predicates
 * match, returns undefined. This provides a functional alternative to
 * imperative switch statements or if/else-if chains.
 * 
 * Each pair consists of:
 * - A predicate function that receives the input value
 * - A result function that produces the output if the predicate matches
 * 
 * @curried (pairs) => (value) => result
 * @param pairs - Array of [predicate, result] tuples
 * @param value - The value to test against predicates
 * @returns Result of first matching predicate, or undefined if no match
 * @example
 * ```typescript
 * // Basic number classification
 * const classifyNumber = cond<number, string>([
 *   [n => n < 0, () => "negative"],
 *   [n => n === 0, () => "zero"],
 *   [n => n > 0, () => "positive"]
 * ])
 * 
 * classifyNumber(-5)                   // "negative"
 * classifyNumber(0)                    // "zero"
 * classifyNumber(10)                   // "positive"
 * 
 * // Grade calculation
 * const getGrade = cond<number, string>([
 *   [n => n >= 90, () => "A"],
 *   [n => n >= 80, () => "B"],
 *   [n => n >= 70, () => "C"],
 *   [n => n >= 60, () => "D"],
 *   [() => true, () => "F"]  // Default case
 * ])
 * 
 * getGrade(95)                         // "A"
 * getGrade(85)                         // "B"
 * getGrade(75)                         // "C"
 * getGrade(65)                         // "D"
 * getGrade(55)                         // "F"
 * 
 * // Type checking with different returns
 * const processValue = cond<unknown, string>([
 *   [v => v === null, () => "null value"],
 *   [v => v === undefined, () => "undefined value"],
 *   [v => typeof v === "number", v => `number: ${v}`],
 *   [v => typeof v === "string", v => `string: "${v}"`],
 *   [v => Array.isArray(v), v => `array of ${v.length} items`],
 *   [v => typeof v === "object", () => "object"],
 *   [() => true, v => `unknown: ${v}`]
 * ])
 * 
 * processValue(null)                   // "null value"
 * processValue(42)                     // "number: 42"
 * processValue("hello")                // "string: "hello""
 * processValue([1, 2, 3])              // "array of 3 items"
 * processValue({ a: 1 })               // "object"
 * 
 * // FizzBuzz implementation
 * const fizzBuzz = cond<number, string>([
 *   [n => n % 15 === 0, () => "FizzBuzz"],
 *   [n => n % 3 === 0, () => "Fizz"],
 *   [n => n % 5 === 0, () => "Buzz"],
 *   [() => true, n => String(n)]
 * ])
 * 
 * fizzBuzz(3)                          // "Fizz"
 * fizzBuzz(5)                          // "Buzz"
 * fizzBuzz(15)                         // "FizzBuzz"
 * fizzBuzz(7)                          // "7"
 * 
 * // Day of week logic
 * const getDayType = cond<Date, string>([
 *   [d => d.getDay() === 0, () => "Sunday"],
 *   [d => d.getDay() === 6, () => "Saturday"],
 *   [d => [1, 2, 3, 4, 5].includes(d.getDay()), () => "Weekday"]
 * ])
 * 
 * getDayType(new Date("2024-01-01"))   // "Weekday" (Monday)
 * getDayType(new Date("2024-01-06"))   // "Saturday"
 * getDayType(new Date("2024-01-07"))   // "Sunday"
 * 
 * // State machine transitions
 * type State = "idle" | "loading" | "success" | "error"
 * type Action = { type: string; payload?: unknown }
 * 
 * const transition = cond<Action, State>([
 *   [a => a.type === "FETCH_START", () => "loading"],
 *   [a => a.type === "FETCH_SUCCESS", () => "success"],
 *   [a => a.type === "FETCH_ERROR", () => "error"],
 *   [a => a.type === "RESET", () => "idle"],
 *   [() => true, () => "idle"]  // Default to idle
 * ])
 * 
 * transition({ type: "FETCH_START" })   // "loading"
 * transition({ type: "FETCH_SUCCESS" }) // "success"
 * transition({ type: "UNKNOWN" })       // "idle"
 * 
 * // Validation with error messages
 * const validate = cond<string, { valid: boolean; message: string }>([
 *   [s => s.length === 0, () => ({ valid: false, message: "Required field" })],
 *   [s => s.length < 3, () => ({ valid: false, message: "Too short" })],
 *   [s => s.length > 100, () => ({ valid: false, message: "Too long" })],
 *   [s => !/^[a-zA-Z]+$/.test(s), () => ({ valid: false, message: "Letters only" })],
 *   [() => true, () => ({ valid: true, message: "Valid" })]
 * ])
 * 
 * validate("")                         // { valid: false, message: "Required field" }
 * validate("ab")                       // { valid: false, message: "Too short" }
 * validate("hello123")                 // { valid: false, message: "Letters only" }
 * validate("hello")                    // { valid: true, message: "Valid" }
 * 
 * // Pricing tiers
 * const calculatePrice = cond<number, number>([
 *   [qty => qty >= 100, qty => qty * 0.70],  // 30% discount
 *   [qty => qty >= 50, qty => qty * 0.80],   // 20% discount
 *   [qty => qty >= 20, qty => qty * 0.90],   // 10% discount
 *   [qty => qty >= 10, qty => qty * 0.95],   // 5% discount
 *   [() => true, qty => qty * 1.00]          // Full price
 * ])
 * 
 * calculatePrice(5)                    // 5.00 (no discount)
 * calculatePrice(15)                   // 14.25 (5% off)
 * calculatePrice(75)                   // 60.00 (20% off)
 * calculatePrice(150)                  // 105.00 (30% off)
 * 
 * // Complex routing logic
 * interface Request {
 *   method: string
 *   path: string
 *   auth?: boolean
 * }
 * 
 * const route = cond<Request, string>([
 *   [r => r.path === "/" && r.method === "GET", () => "homepage"],
 *   [r => r.path === "/api" && !r.auth, () => "unauthorized"],
 *   [r => r.path.startsWith("/api"), () => "api-handler"],
 *   [r => r.path.startsWith("/admin") && r.auth, () => "admin-panel"],
 *   [r => r.path.startsWith("/admin"), () => "login-required"],
 *   [() => true, () => "404-not-found"]
 * ])
 * 
 * route({ method: "GET", path: "/" })  // "homepage"
 * route({ method: "GET", path: "/api", auth: false }) // "unauthorized"
 * route({ method: "GET", path: "/admin", auth: true }) // "admin-panel"
 * route({ method: "GET", path: "/unknown" }) // "404-not-found"
 * 
 * // Dynamic result computation
 * const compute = cond<number, number>([
 *   [n => n < 0, n => Math.abs(n)],      // Make positive
 *   [n => n === 0, () => 1],             // Replace zero with 1
 *   [n => n < 10, n => n * n],           // Square small numbers
 *   [n => n < 100, n => n * 2],          // Double medium numbers
 *   [() => true, n => n]                 // Keep large numbers as-is
 * ])
 * 
 * compute(-5)                          // 5 (absolute value)
 * compute(0)                           // 1 (replacement)
 * compute(5)                           // 25 (squared)
 * compute(50)                          // 100 (doubled)
 * compute(200)                         // 200 (unchanged)
 * 
 * // No default case - returns undefined
 * const partial = cond<number, string>([
 *   [n => n > 0, () => "positive"],
 *   [n => n < 0, () => "negative"]
 *   // No case for zero
 * ])
 * 
 * partial(5)                           // "positive"
 * partial(-5)                          // "negative"
 * partial(0)                           // undefined
 * ```
 * @property Pure - Always returns same result for same input
 * @property Curried - Allows partial application with predefined conditions
 * @property Lazy - Only evaluates predicates until first match
 */
const cond = <T, R>(
	pairs: Array<[(value: T) => unknown, (value: T) => R]>
) => (
	value: T
): R | undefined => {
	for (const [predicate, result] of pairs) {
		if (predicate(value)) {
			return result(value)
		}
	}
	return undefined
}

export default cond