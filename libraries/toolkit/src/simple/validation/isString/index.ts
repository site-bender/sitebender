/**
 * Type guard that checks if a value is a string primitive
 *
 * Determines whether a value is a string primitive using the typeof operator.
 * This includes string literals, template literals, and strings created with
 * String() function (without new). Does not include String objects created with
 * new String(). In TypeScript, this narrows the type to string, enabling safe
 * string operations without type assertions.
 *
 * String detection:
 * - String literals: "text", 'text', `text`
 * - Empty strings: ""
 * - String() conversions: String(value)
 * - Not included: String objects (new String())
 * - Not included: numbers, even if they look like strings
 * - Type narrowing: provides TypeScript type guard
 *
 * @param value - The value to check
 * @returns True if the value is a string primitive, false otherwise
 * @example
 * ```typescript
 * // String primitives
 * isString("hello")                    // true
 * isString("")                         // true
 * isString("123")                      // true
 * isString('single quotes')            // true
 * isString(`template literal`)         // true
 * isString(String(42))                 // true (String() returns primitive)
 *
 * // Multi-line strings
 * isString(`
 *   multi
 *   line
 * `)                                   // true
 *
 * // Not strings
 * isString(123)                        // false (number)
 * isString(true)                       // false (boolean)
 * isString(null)                       // false
 * isString(undefined)                  // false
 * isString([])                         // false (array)
 * isString({})                         // false (object)
 * isString(Symbol("str"))              // false (symbol)
 *
 * // String objects (not primitives)
 * isString(new String("hello"))        // false (String object)
 * isString(Object("hello"))            // false (boxed string)
 *
 * // Type narrowing in TypeScript
 * function processText(value: unknown): string {
 *   if (isString(value)) {
 *     // TypeScript knows value is string here
 *     return value.toUpperCase()
 *   }
 *   return ""
 * }
 *
 * processText("hello")                 // "HELLO"
 * processText(123)                     // ""
 * processText(null)                    // ""
 *
 * // String method safety
 * function getLength(value: unknown): number {
 *   if (isString(value)) {
 *     return value.length
 *   }
 *   return 0
 * }
 *
 * getLength("hello")                   // 5
 * getLength("")                        // 0
 * getLength(12345)                     // 0
 * getLength(["a", "b"])                // 0
 *
 * // Filtering strings from mixed array
 * const mixed = ["text", 123, true, "", null, "another", Symbol(), []]
 * const strings = mixed.filter(isString)
 * // ["text", "", "another"]
 *
 * // Safe string concatenation
 * function concat(...values: Array<unknown>): string {
 *   return values
 *     .filter(isString)
 *     .join("")
 * }
 *
 * concat("hello", " ", "world", 123, null)  // "hello world"
 * concat("a", undefined, "b", "c")          // "abc"
 *
 * // URL validation
 * function isValidUrl(value: unknown): boolean {
 *   if (!isString(value)) return false
 *
 *   try {
 *     new URL(value)
 *     return true
 *   } catch {
 *     return false
 *   }
 * }
 *
 * isValidUrl("https://example.com")    // true
 * isValidUrl("not a url")             // false
 * isValidUrl(123)                     // false
 * isValidUrl(null)                    // false
 *
 * // Email pattern checking
 * function isEmailLike(value: unknown): boolean {
 *   if (!isString(value)) return false
 *   return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
 * }
 *
 * isEmailLike("user@example.com")     // true
 * isEmailLike("not.an.email")         // false
 * isEmailLike(123)                    // false
 *
 * // Template literal processing
 * function interpolate(
 *   template: unknown,
 *   values: Record<string, unknown>
 * ): string {
 *   if (!isString(template)) return ""
 *
 *   return template.replace(/\${(\w+)}/g, (_, key) => {
 *     const value = values[key]
 *     return isString(value) ? value : String(value ?? "")
 *   })
 * }
 *
 * interpolate("Hello ${name}!", { name: "World" })  // "Hello World!"
 * interpolate(123, { name: "World" })              // ""
 *
 * // Case conversion safety
 * function toTitleCase(value: unknown): string {
 *   if (!isString(value)) return ""
 *
 *   return value.replace(/\b\w/g, char => char.toUpperCase())
 * }
 *
 * toTitleCase("hello world")          // "Hello World"
 * toTitleCase("THE QUICK BROWN")      // "THE QUICK BROWN"
 * toTitleCase(123)                    // ""
 *
 * // Trimming with validation
 * function safeTrim(value: unknown): string {
 *   if (isString(value)) {
 *     return value.trim()
 *   }
 *   return ""
 * }
 *
 * safeTrim("  hello  ")               // "hello"
 * safeTrim("\n\ttext\n")              // "text"
 * safeTrim(null)                      // ""
 * safeTrim(123)                       // ""
 *
 * // JSON parsing safety
 * function parseJsonSafely(value: unknown): unknown {
 *   if (!isString(value)) return null
 *
 *   try {
 *     return JSON.parse(value)
 *   } catch {
 *     return null
 *   }
 * }
 *
 * parseJsonSafely('{"a": 1}')         // { a: 1 }
 * parseJsonSafely("invalid json")     // null
 * parseJsonSafely(123)                // null
 *
 * // Path manipulation
 * function joinPath(...parts: Array<unknown>): string {
 *   return parts
 *     .filter(isString)
 *     .filter(part => part.length > 0)
 *     .join("/")
 * }
 *
 * joinPath("path", "to", "file.txt")  // "path/to/file.txt"
 * joinPath("path", null, "file")      // "path/file"
 * joinPath("", "path", 123, "file")   // "path/file"
 *
 * // Search highlighting
 * function highlight(
 *   text: unknown,
 *   search: unknown
 * ): string {
 *   if (!isString(text) || !isString(search)) {
 *     return String(text)
 *   }
 *
 *   if (search.length === 0) return text
 *
 *   const escaped = search.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
 *   const regex = new RegExp(`(${escaped})`, "gi")
 *   return text.replace(regex, "<mark>$1</mark>")
 * }
 *
 * highlight("Hello World", "world")    // "Hello <mark>World</mark>"
 * highlight(123, "world")              // "123"
 *
 * // Environment variable reading
 * function getEnvString(
 *   key: string,
 *   defaultValue = ""
 * ): string {
 *   const value = process.env[key]
 *   return isString(value) ? value : defaultValue
 * }
 *
 * // React children text extraction
 * function extractText(children: unknown): string {
 *   if (isString(children)) {
 *     return children
 *   }
 *   if (Array.isArray(children)) {
 *     return children
 *       .filter(isString)
 *       .join("")
 *   }
 *   return ""
 * }
 *
 * extractText("Hello")                // "Hello"
 * extractText(["Hello", " ", "World"]) // "Hello World"
 * extractText([<div>Hi</div>, "Text"]) // "Text"
 *
 * // Slug generation
 * function toSlug(value: unknown): string {
 *   if (!isString(value)) return ""
 *
 *   return value
 *     .toLowerCase()
 *     .trim()
 *     .replace(/[^\w\s-]/g, "")
 *     .replace(/[\s_-]+/g, "-")
 *     .replace(/^-+|-+$/g, "")
 * }
 *
 * toSlug("Hello World!")              // "hello-world"
 * toSlug("  Multiple   Spaces  ")     // "multiple-spaces"
 * toSlug(123)                         // ""
 *
 * // Encoding safety
 * function safeEncode(value: unknown): string {
 *   if (isString(value)) {
 *     return encodeURIComponent(value)
 *   }
 *   return ""
 * }
 *
 * safeEncode("hello world")           // "hello%20world"
 * safeEncode("user@example.com")      // "user%40example.com"
 * safeEncode(null)                    // ""
 *
 * // Line counting
 * function countLines(value: unknown): number {
 *   if (!isString(value)) return 0
 *   if (value.length === 0) return 0
 *   return value.split("\n").length
 * }
 *
 * countLines("line1\nline2\nline3")   // 3
 * countLines("")                      // 0
 * countLines(123)                     // 0
 *
 * // Word counting
 * function countWords(value: unknown): number {
 *   if (!isString(value)) return 0
 *
 *   const words = value.trim().split(/\s+/)
 *   return words[0] === "" ? 0 : words.length
 * }
 *
 * countWords("Hello world test")      // 3
 * countWords("   ")                   // 0
 * countWords(123)                     // 0
 * ```
 * @property Pure - Always returns the same result for the same input
 * @property TypeGuard - Narrows TypeScript types to string
 * @property Primitive - Only checks for string primitives, not objects
 * @property Exact - No type coercion or conversion
 */
const isString = (value: unknown): value is string => typeof value === "string"

export default isString
