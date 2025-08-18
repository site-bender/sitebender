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
 * isRegExp(/[a-z]/gi)                  // true
 * 
 * // RegExp constructor
 * isRegExp(new RegExp("pattern"))      // true
 * isRegExp(new RegExp("^test$", "i"))  // true
 * isRegExp(new RegExp(/\d+/, "g"))     // true
 * isRegExp(RegExp("[a-z]", "gi"))      // true (without new)
 * 
 * // Dynamic regex creation
 * const pattern = "test"
 * const flags = "gi"
 * isRegExp(new RegExp(pattern, flags)) // true
 * 
 * // Not RegExp
 * isRegExp("pattern")                  // false (string)
 * isRegExp("/pattern/gi")              // false (string)
 * isRegExp("^test$")                   // false (string)
 * isRegExp(null)                       // false
 * isRegExp(undefined)                  // false
 * isRegExp({})                         // false
 * isRegExp([])                         // false
 * isRegExp(42)                         // false
 * 
 * // RegExp-like objects are not RegExp
 * isRegExp({
 *   test: (str: string) => true,
 *   exec: (str: string) => null,
 *   source: "pattern",
 *   flags: "gi"
 * })                                   // false
 * 
 * // Type narrowing in TypeScript
 * function extractPattern(value: unknown): string {
 *   if (isRegExp(value)) {
 *     // TypeScript knows value is RegExp here
 *     return value.source
 *   }
 *   return ""
 * }
 * 
 * extractPattern(/hello/gi)            // "hello"
 * extractPattern(new RegExp("\\d+"))   // "\\d+"
 * extractPattern("pattern")            // ""
 * 
 * // Filtering RegExp from mixed array
 * const mixed = [
 *   /pattern/,
 *   "string",
 *   new RegExp("test"),
 *   "/not-a-regex/",
 *   null,
 *   { source: "fake" },
 *   /\w+/gi
 * ]
 * 
 * const regexes = mixed.filter(isRegExp)
 * // [/pattern/, RegExp("test"), /\w+/gi]
 * 
 * // Pattern validation
 * function isValidPattern(value: unknown): boolean {
 *   if (typeof value === "string") {
 *     try {
 *       new RegExp(value)
 *       return true
 *     } catch {
 *       return false
 *     }
 *   }
 *   return isRegExp(value)
 * }
 * 
 * isValidPattern(/valid/)              // true
 * isValidPattern("valid")              // true
 * isValidPattern("[invalid")           // false (unclosed bracket)
 * isValidPattern(null)                 // false
 * 
 * // Safe regex testing
 * function safeTest(
 *   pattern: unknown,
 *   str: string
 * ): boolean {
 *   if (!isRegExp(pattern)) return false
 *   
 *   try {
 *     return pattern.test(str)
 *   } catch {
 *     return false
 *   }
 * }
 * 
 * safeTest(/hello/, "hello world")     // true
 * safeTest(/^test/, "testing")         // true
 * safeTest("not a regex", "test")      // false
 * 
 * // Regex cloning
 * function cloneRegExp(value: unknown): RegExp | null {
 *   if (!isRegExp(value)) return null
 *   
 *   return new RegExp(value.source, value.flags)
 * }
 * 
 * const original = /test/gi
 * const cloned = cloneRegExp(original)
 * // New RegExp with same pattern and flags
 * 
 * // Pattern extraction
 * function getFlags(value: unknown): string {
 *   if (isRegExp(value)) {
 *     return value.flags
 *   }
 *   return ""
 * }
 * 
 * getFlags(/test/gi)                   // "gi"
 * getFlags(/pattern/)                  // ""
 * getFlags(new RegExp("", "gimus"))    // "gimus"
 * getFlags("not a regex")              // ""
 * 
 * // Multiple pattern matching
 * function matchesAny(
 *   str: string,
 *   patterns: Array<unknown>
 * ): boolean {
 *   return patterns.some(pattern => 
 *     isRegExp(pattern) && pattern.test(str)
 *   )
 * }
 * 
 * matchesAny("hello@example.com", [
 *   /^\d+$/,                           // numbers only
 *   /^[a-z]+$/i,                       // letters only
 *   /@/                                // contains @
 * ])                                   // true (contains @)
 * 
 * // Regex replacement safety
 * function safeReplace(
 *   str: string,
 *   pattern: unknown,
 *   replacement: string
 * ): string {
 *   if (!isRegExp(pattern)) return str
 *   
 *   return str.replace(pattern, replacement)
 * }
 * 
 * safeReplace("hello world", /world/, "universe")  // "hello universe"
 * safeReplace("test123", /\d+/, "XXX")            // "testXXX"
 * safeReplace("text", "not regex", "X")           // "text"
 * 
 * // Pattern caching system
 * class PatternCache {
 *   private cache = new Map<string, RegExp>()
 *   
 *   get(pattern: unknown): RegExp | null {
 *     if (isRegExp(pattern)) {
 *       return pattern
 *     }
 *     
 *     if (typeof pattern === "string") {
 *       if (!this.cache.has(pattern)) {
 *         try {
 *           this.cache.set(pattern, new RegExp(pattern))
 *         } catch {
 *           return null
 *         }
 *       }
 *       return this.cache.get(pattern)!
 *     }
 *     
 *     return null
 *   }
 * }
 * 
 * // Validation rules
 * interface ValidationRule {
 *   pattern: unknown
 *   message: string
 * }
 * 
 * function validate(
 *   value: string,
 *   rules: Array<ValidationRule>
 * ): Array<string> {
 *   const errors: Array<string> = []
 *   
 *   for (const rule of rules) {
 *     if (isRegExp(rule.pattern)) {
 *       if (!rule.pattern.test(value)) {
 *         errors.push(rule.message)
 *       }
 *     }
 *   }
 *   
 *   return errors
 * }
 * 
 * validate("hello", [
 *   { pattern: /^[A-Z]/, message: "Must start with uppercase" },
 *   { pattern: /\d/, message: "Must contain a number" }
 * ])
 * // ["Must start with uppercase", "Must contain a number"]
 * 
 * // Regex serialization
 * function serializeRegExp(value: unknown): string | null {
 *   if (!isRegExp(value)) return null
 *   
 *   return `/${value.source}/${value.flags}`
 * }
 * 
 * serializeRegExp(/test/gi)            // "/test/gi"
 * serializeRegExp(new RegExp("\\d+"))  // "/\\d+/"
 * serializeRegExp("not regex")         // null
 * 
 * // Pattern complexity check
 * function isComplexPattern(value: unknown): boolean {
 *   if (!isRegExp(value)) return false
 *   
 *   const source = value.source
 *   // Check for complex regex features
 *   return /[*+?{]|\\[bBdDsSwW]|\(.+\)/.test(source)
 * }
 * 
 * isComplexPattern(/simple/)           // false
 * isComplexPattern(/\d+/)              // true (has \d and +)
 * isComplexPattern(/a{2,5}/)           // true (has quantifier)
 * isComplexPattern(/(group)+/)         // true (has group)
 * 
 * // React input validation
 * interface InputProps {
 *   pattern?: unknown
 *   value: string
 *   onChange: (value: string) => void
 * }
 * 
 * function ValidatedInput({ pattern, value, onChange }: InputProps) {
 *   const isValid = !pattern || 
 *                   (isRegExp(pattern) && pattern.test(value))
 *   
 *   return (
 *     <input
 *       value={value}
 *       onChange={e => onChange(e.target.value)}
 *       className={isValid ? "" : "error"}
 *     />
 *   )
 * }
 * 
 * // Global flag warning
 * function hasGlobalFlag(value: unknown): boolean {
 *   return isRegExp(value) && value.global
 * }
 * 
 * function warnIfGlobal(pattern: unknown): void {
 *   if (hasGlobalFlag(pattern)) {
 *     console.warn("Pattern has global flag - be careful with test()")
 *   }
 * }
 * 
 * // Escape string for regex
 * function escapeForRegex(str: string): RegExp {
 *   const escaped = str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
 *   return new RegExp(escaped)
 * }
 * 
 * const userInput = "user.name[0]"
 * const pattern = escapeForRegex(userInput)
 * isRegExp(pattern)                    // true
 * // Pattern matches literal "user.name[0]"
 * ```
 * @property Pure - Always returns the same result for the same input
 * @property TypeGuard - Narrows TypeScript types to RegExp
 * @property Instanceof - Uses instanceof RegExp internally
 * @property Specific - Only returns true for RegExp, not regex-like objects
 */
const isRegExp = (value: unknown): value is RegExp => 
	value instanceof RegExp

export default isRegExp