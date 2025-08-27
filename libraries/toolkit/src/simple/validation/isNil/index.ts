/**
 * Checks if a value is null or undefined (nil)
 *
 * Determines whether a value is nullish, meaning either null or undefined.
 * This is equivalent to checking value == null (with double equals), which is
 * the idiomatic JavaScript way to check for both null and undefined. Useful for
 * optional value handling, default assignments, and nullish coalescing operations.
 *
 * Nil detection:
 * - null: Returns true
 * - undefined: Returns true
 * - Everything else: Returns false
 * - Equivalent to: value == null
 * - More concise than: value === null || value === undefined
 *
 * @param value - The value to check for nil
 * @returns True if the value is null or undefined, false otherwise
 * @example
 * ```typescript
 * // Nil values
 * isNil(null)                          // true
 * isNil(undefined)                     // true
 * isNil(void 0)                        // true (void 0 is undefined)
 *
 * // Not nil (everything else)
 * isNil(0)                             // false
 * isNil(false)                         // false
 * isNil("")                            // false
 * isNil(NaN)                           // false
 * isNil([])                            // false
 * isNil({})                            // false
 * isNil(() => {})                      // false
 *
 * // Common confusion points
 * isNil("null")                        // false (string)
 * isNil("undefined")                   // false (string)
 * isNil(Number.NaN)                    // false (NaN is not nil)
 *
 * // Optional parameter handling
 * function greet(name?: string): string {
 *   if (isNil(name)) {
 *     return "Hello, stranger!"
 *   }
 *   return `Hello, ${name}!`
 * }
 *
 * greet()                              // "Hello, stranger!"
 * greet(undefined)                     // "Hello, stranger!"
 * greet(null as any)                   // "Hello, stranger!"
 * greet("Alice")                       // "Hello, Alice!"
 * greet("")                            // "Hello, !" (empty string not nil)
 *
 * // Default value assignment
 * function getConfig<T>(value: T | null | undefined, defaultValue: T): T {
 *   return isNil(value) ? defaultValue : value
 * }
 *
 * getConfig(null, "default")           // "default"
 * getConfig(undefined, "default")      // "default"
 * getConfig("custom", "default")       // "custom"
 * getConfig("", "default")             // "" (empty string not nil)
 * getConfig(0, 100)                    // 0 (zero not nil)
 * getConfig(false, true)               // false (false not nil)
 *
 * // Object property access
 * interface User {
 *   name?: string | null
 *   age?: number | null
 *   email?: string | null
 * }
 *
 * function getDisplayName(user: User): string {
 *   if (isNil(user.name)) {
 *     return isNil(user.email) ? "Anonymous" : user.email
 *   }
 *   return user.name
 * }
 *
 * getDisplayName({})                   // "Anonymous"
 * getDisplayName({ name: null })       // "Anonymous"
 * getDisplayName({ name: "Alice" })    // "Alice"
 * getDisplayName({ email: "a@b.c" })   // "a@b.c"
 *
 * // Filtering out nil values
 * const mixed = [1, null, 2, undefined, 3, 0, false, ""]
 * const nonNil = mixed.filter(v => !isNil(v))
 * // [1, 2, 3, 0, false, ""]
 *
 * const onlyNil = mixed.filter(isNil)
 * // [null, undefined]
 *
 * // API response handling
 * interface ApiResponse<T> {
 *   data?: T | null
 *   error?: string | null
 * }
 *
 * function handleResponse<T>(response: ApiResponse<T>): T {
 *   if (isNil(response.data)) {
 *     throw new Error(response.error || "No data received")
 *   }
 *   return response.data
 * }
 *
 * handleResponse({ data: { id: 1 } })  // { id: 1 }
 * handleResponse({ data: null })       // throws "No data received"
 * handleResponse({})                   // throws "No data received"
 *
 * // React props with nil checking
 * interface Props {
 *   title?: string | null
 *   subtitle?: string | null
 *   icon?: React.ReactNode | null
 * }
 *
 * function Header({ title, subtitle, icon }: Props) {
 *   return (
 *     <header>
 *       {!isNil(icon) && <div>{icon}</div>}
 *       {!isNil(title) && <h1>{title}</h1>}
 *       {!isNil(subtitle) && <h2>{subtitle}</h2>}
 *     </header>
 *   )
 * }
 *
 * // Database query results
 * type QueryResult = string | number | null | undefined
 *
 * function formatQueryResult(result: QueryResult): string {
 *   if (isNil(result)) {
 *     return "N/A"
 *   }
 *   return String(result)
 * }
 *
 * formatQueryResult(null)              // "N/A"
 * formatQueryResult(undefined)         // "N/A"
 * formatQueryResult(0)                 // "0"
 * formatQueryResult("")                // ""
 *
 * // Comparison with nullish coalescing
 * function getValue<T>(value: T | null | undefined, fallback: T): T {
 *   // Using isNil
 *   if (isNil(value)) return fallback
 *   return value
 *
 *   // Equivalent to:
 *   // return value ?? fallback
 * }
 *
 * // Method chaining safety
 * class ChainableValue<T> {
 *   constructor(private value: T | null | undefined) {}
 *
 *   map<U>(fn: (value: T) => U): ChainableValue<U> {
 *     if (isNil(this.value)) {
 *       return new ChainableValue<U>(null)
 *     }
 *     return new ChainableValue(fn(this.value))
 *   }
 *
 *   getOrElse(defaultValue: T): T {
 *     return isNil(this.value) ? defaultValue : this.value
 *   }
 * }
 *
 * new ChainableValue(5)
 *   .map(x => x * 2)
 *   .getOrElse(0)                     // 10
 *
 * new ChainableValue(null)
 *   .map(x => x * 2)
 *   .getOrElse(0)                     // 0
 *
 * // Form validation
 * interface FormField {
 *   value: unknown
 *   required: boolean
 * }
 *
 * function validateField(field: FormField): string | null {
 *   if (field.required && isNil(field.value)) {
 *     return "This field is required"
 *   }
 *   return null
 * }
 *
 * validateField({ value: null, required: true })      // "This field is required"
 * validateField({ value: undefined, required: true })  // "This field is required"
 * validateField({ value: "", required: true })         // null (empty string not nil)
 * validateField({ value: 0, required: true })          // null
 *
 * // Environment variable handling
 * function getEnvVar(name: string, defaultValue?: string): string {
 *   const value = process.env[name]
 *   if (isNil(value)) {
 *     if (isNil(defaultValue)) {
 *       throw new Error(`Environment variable ${name} is required`)
 *     }
 *     return defaultValue
 *   }
 *   return value
 * }
 *
 * // Type narrowing
 * function processValue(value: string | null | undefined): string {
 *   if (isNil(value)) {
 *     // TypeScript knows value is null | undefined here
 *     return "default"
 *   }
 *   // TypeScript knows value is string here
 *   return value.toUpperCase()
 * }
 *
 * // Nil vs falsy comparison
 * function compareChecks(value: unknown): string {
 *   const nilCheck = isNil(value)
 *   const falsyCheck = !value
 *
 *   if (nilCheck && falsyCheck) return "nil and falsy"
 *   if (nilCheck) return "nil but truthy (impossible)"
 *   if (falsyCheck) return "falsy but not nil"
 *   return "truthy and not nil"
 * }
 *
 * compareChecks(null)                  // "nil and falsy"
 * compareChecks(undefined)             // "nil and falsy"
 * compareChecks(0)                     // "falsy but not nil"
 * compareChecks("")                    // "falsy but not nil"
 * compareChecks(false)                 // "falsy but not nil"
 * compareChecks([])                    // "truthy and not nil"
 * ```
 * @pure
 * @predicate
 */
const isNil = (value: unknown): value is null | undefined => value == null

export default isNil
