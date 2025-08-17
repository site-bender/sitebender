/**
 * Removes all occurrences of a substring from a string
 * 
 * Deletes every occurrence of a specified substring from the input string.
 * This is equivalent to replacing all occurrences with an empty string.
 * Useful for cleaning text, removing unwanted characters, or filtering
 * content. The removal is case-sensitive and handles overlapping matches.
 * 
 * @curried (substring) => (str) => string
 * @param substring - The substring to remove
 * @param str - The string to remove from
 * @returns String with all occurrences removed
 * @example
 * ```typescript
 * // Basic removal
 * remove("l")("hello world")
 * // "heo word"
 * 
 * // Remove word
 * remove("the ")("the quick the brown the fox")
 * // "quick brown fox"
 * 
 * // Case sensitive
 * remove("The")("the The THE")
 * // "the  THE"
 * 
 * // Not found (unchanged)
 * remove("xyz")("hello world")
 * // "hello world"
 * 
 * // Empty substring (unchanged)
 * remove("")("hello")
 * // "hello"
 * 
 * // Empty string
 * remove("hello")("")
 * // ""
 * 
 * // Remove all of string
 * remove("hello")("hello")
 * // ""
 * 
 * // Multiple occurrences
 * remove("o")("foo boo zoo")
 * // "f b z"
 * 
 * // Remove spaces
 * remove(" ")("hello world test")
 * // "helloworldtest"
 * 
 * // Remove newlines
 * remove("\n")("line1\nline2\nline3")
 * // "line1line2line3"
 * 
 * // Remove tabs
 * remove("\t")("col1\tcol2\tcol3")
 * // "col1col2col3"
 * 
 * // Remove special characters
 * remove("$")("Price: $100, Cost: $50")
 * // "Price: 100, Cost: 50"
 * 
 * // Remove punctuation
 * remove(".")("End. Stop. Done.")
 * // "End Stop Done"
 * 
 * // Remove HTML tags (simple)
 * remove("<br>")("Hello<br>World<br>!")
 * // "HelloWorld!"
 * 
 * // Remove comments
 * remove("//")("code // comment")
 * // "code  comment"
 * 
 * // Partial application for cleaning
 * const removeSpaces = remove(" ")
 * const removeNewlines = remove("\n")
 * const removeTabs = remove("\t")
 * 
 * removeSpaces("a b c")     // "abc"
 * removeNewlines("a\nb\nc") // "abc"
 * removeTabs("a\tb\tc")     // "abc"
 * 
 * // Clean phone number
 * const cleanPhone = (phone: string) => {
 *   return remove("-")(remove(" ")(remove("(")(remove(")")(phone))))
 * }
 * cleanPhone("(555) 123-4567")  // "5551234567"
 * 
 * // Remove file extension
 * const removeExtension = (filename: string) => {
 *   const lastDot = filename.lastIndexOf(".")
 *   return lastDot === -1 ? filename : filename.slice(0, lastDot)
 * }
 * removeExtension("file.txt")  // "file"
 * 
 * // Strip protocol
 * const stripProtocol = remove("https://")
 * stripProtocol("https://example.com")  // "example.com"
 * 
 * // Remove duplicate spaces (consecutive)
 * const removeDuplicateSpaces = (str: string) => {
 *   while (str.includes("  ")) {
 *     str = str.replace(/  +/g, " ")
 *   }
 *   return str
 * }
 * removeDuplicateSpaces("hello    world")  // "hello world"
 * 
 * // Clean CSV field
 * const cleanCsvField = (field: string) => {
 *   return remove('"')(remove(",")(field))
 * }
 * cleanCsvField('"value, with, commas"')  // "value with commas"
 * 
 * // Remove emoji
 * remove("🎉")("Party 🎉 Time 🎉!")
 * // "Party  Time !"
 * 
 * // Remove Unicode
 * remove("世")("Hello 世界 World")
 * // "Hello 界 World"
 * 
 * // SQL sanitization (basic)
 * const sanitizeSql = (input: string) => {
 *   return remove("'")(remove('"')(remove(";")(input)))
 * }
 * sanitizeSql("'; DROP TABLE users; --")
 * // " DROP TABLE users --"
 * 
 * // Remove markdown formatting
 * const removeMarkdown = (text: string) => {
 *   let result = text
 *   result = remove("**")(result)  // Bold
 *   result = remove("*")(result)   // Italic
 *   result = remove("`")(result)   // Code
 *   return result
 * }
 * removeMarkdown("**bold** and *italic* and `code`")
 * // "bold and italic and code"
 * 
 * // Remove XML/HTML entities
 * remove("&amp;")("Tom &amp; Jerry")
 * // "Tom  Jerry"
 * 
 * // Chain removals
 * const pipeline = (str: string) => 
 *   remove("!")(remove("?")(remove(".")(str)))
 * pipeline("Really? Yes! Sure.")
 * // "Really Yes Sure"
 * 
 * // Remove prefix
 * const removePrefix = (prefix: string) => (str: string) => {
 *   return str.startsWith(prefix) 
 *     ? str.slice(prefix.length)
 *     : str
 * }
 * removePrefix("Mr. ")("Mr. Smith")  // "Smith"
 * 
 * // Remove suffix
 * const removeSuffix = (suffix: string) => (str: string) => {
 *   return str.endsWith(suffix)
 *     ? str.slice(0, -suffix.length)
 *     : str
 * }
 * removeSuffix(".txt")("file.txt")  // "file"
 * 
 * // Handle null/undefined gracefully
 * remove("test")(null)       // ""
 * remove("test")(undefined)  // ""
 * remove(null)("test")       // "test"
 * remove(undefined)("test")  // "test"
 * 
 * // Remove all vowels
 * const removeVowels = (str: string) => {
 *   return ["a","e","i","o","u","A","E","I","O","U"]
 *     .reduce((s, vowel) => remove(vowel)(s), str)
 * }
 * removeVowels("Hello World")  // "Hll Wrld"
 * 
 * // Remove control characters
 * const removeControl = (str: string) => {
 *   return str.replace(/[\x00-\x1F\x7F]/g, "")
 * }
 * 
 * // Remove zero-width characters
 * remove("\u200B")("text\u200Bwith\u200Bzero\u200Bwidth")
 * // "textwithzerowidth"
 * 
 * // URL slug cleaning
 * const cleanSlug = (slug: string) => {
 *   return remove("--")(remove("__")(slug))
 * }
 * cleanSlug("my--awesome__slug")  // "myawesomeslug"
 * 
 * // Remove BOM (Byte Order Mark)
 * remove("\uFEFF")("\uFEFFContent")
 * // "Content"
 * 
 * // Redact sensitive data
 * const redact = (sensitive: string) => (text: string) => {
 *   return remove(sensitive)(text)
 * }
 * const redactSSN = redact("123-45-6789")
 * redactSSN("SSN: 123-45-6789")  // "SSN: "
 * ```
 * @property Global - removes all occurrences, not just first
 * @property Case-sensitive - exact match required
 * @property Non-recursive - doesn't re-scan after removals
 */
const remove = (
	substring: string | null | undefined
) => (
	str: string | null | undefined
): string => {
	if (str == null || typeof str !== "string") {
		return ""
	}
	
	if (substring == null || typeof substring !== "string" || substring === "") {
		return str
	}
	
	// Use split and join for efficient removal of all occurrences
	// This handles overlapping matches naturally
	return str.split(substring).join("")
}

export default remove